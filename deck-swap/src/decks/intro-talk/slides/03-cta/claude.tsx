import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-cta', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">03 · cta</p>
        <h2 className="mt-4 text-6xl font-semibold leading-tight">Pick a lens.</h2>
        <p className="mt-6 text-xl text-zinc-400">
          The picker is in the top right. Try each one before I move on.
        </p>
      </div>
    </div>
  );
}
