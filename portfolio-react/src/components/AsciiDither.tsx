import { useEffect, useRef } from 'react';

/**
 * Animated ASCII dithering field, drawn on a canvas.
 *
 * A slow-moving scalar field (layered sines + a soft radial pulse that tracks
 * the pointer) is quantised through an ordered 4×4 Bayer matrix into a ramp of
 * ASCII glyphs — sparse dots in the troughs, dense blocks at the peaks. The
 * result is a living, accent-tinted dither that reads as "rendered by a machine",
 * fitting a colophon of the tools that built the site.
 *
 * Cheap to run: one fillText per cell on a coarse grid, throttled, DPR-aware,
 * paused when off-screen, and disabled entirely under reduced-motion.
 */

// Density ramp, sparse → dense. Trailing space = empty cell (cheapest path).
const RAMP = ' .·:-=+*#%@';

export default function AsciiDither({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Pointer in 0..1 of the canvas; -1 means "no pointer", field stays centred.
  const pointer = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cell size in CSS px — coarse enough to stay light, fine enough to read.
    const CELL = 13;
    const FONT_PX = 13;

    // 4×4 ordered Bayer matrix, normalised to (0,1). Adds structured noise so the
    // quantisation reads as a dither rather than flat banding.
    const BAYER = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ].map((row) => row.map((v) => (v + 0.5) / 16));

    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let t = 0;

    // Resolved theme colours, read from CSS so the field tracks the palette.
    // Glyphs use the accent token so the dither carries the site highlight.
    const css = getComputedStyle(document.documentElement);
    const fg = css.getPropertyValue('--accent').trim() || 'oklch(0.58 0.08 190)';

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.ceil(rect.width * dpr);
      canvas!.height = Math.ceil(rect.height * dpr);
      cols = Math.ceil(rect.width / CELL);
      rows = Math.ceil(rect.height / CELL);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.font = `${FONT_PX}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx!.textBaseline = 'top';
      ctx!.fillStyle = fg;
      if (reduce) drawStatic();
    }

    // Scalar field at grid cell (cx, cy) and time tt, in roughly -1..1.
    function field(cx: number, cy: number, tt: number) {
      const nx = cx / cols;
      const ny = cy / rows;
      // Layered travelling waves at different angles + speeds.
      let v =
        Math.sin(nx * 7 + tt * 0.6) * 0.5 +
        Math.sin((nx + ny) * 5 - tt * 0.4) * 0.35 +
        Math.sin(ny * 9 - tt * 0.5) * 0.3 +
        Math.sin(Math.hypot(nx - 0.5, ny - 0.5) * 14 - tt) * 0.25;
      // Soft radial swell around the pointer, lifting local density.
      const p = pointer.current;
      const d = Math.hypot(nx - p.x, ny - p.y);
      const pull = p.active ? Math.max(0, 1 - d * 2.2) : 0;
      v += pull * 1.4;
      return v;
    }

    function cellGlyph(v: number, cx: number, cy: number) {
      // Map field (~ -1..1.4) into 0..1, add Bayer threshold, quantise to ramp.
      let n = (v + 1) / 2.4;
      n += (BAYER[cy & 3][cx & 3] - 0.5) * 0.18;
      n = Math.max(0, Math.min(0.999, n));
      return RAMP[(n * RAMP.length) | 0];
    }

    function paint(tt: number) {
      const rect = canvas!.getBoundingClientRect();
      ctx!.clearRect(0, 0, rect.width, rect.height);
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const g = cellGlyph(field(cx, cy, tt), cx, cy);
          if (g === ' ') continue;
          ctx!.fillText(g, cx * CELL, cy * CELL);
        }
      }
    }

    function drawStatic() {
      paint(2.3); // a single pleasing frozen frame for reduced-motion
    }

    let last = 0;
    function loop(now: number) {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / 30) return; // cap at ~30fps; it's a background
      last = now;
      t += 0.016;
      paint(t);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const onLeave = () => { pointer.current.active = false; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const parent = canvas.parentElement;
    parent?.addEventListener('pointermove', onPointer);
    parent?.addEventListener('pointerleave', onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      parent?.removeEventListener('pointermove', onPointer);
      parent?.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
