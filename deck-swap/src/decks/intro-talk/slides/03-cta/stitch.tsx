import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-cta', variant: 'stitch', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-zinc-900 p-16">
      <div className="max-w-2xl rounded-3xl border border-zinc-200 bg-white/70 p-12 text-center shadow-xl backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Your turn</p>
        <h2 className="mt-3 text-5xl font-bold">Pick a lens ↗</h2>
        <p className="mt-4 text-lg text-zinc-600">The control is in the top right.</p>
      </div>
    </div>
  );
}
