import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-cta', variant: 'design', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white text-zinc-900 p-16">
      <div className="max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">03 / Try it</p>
        <h2 className="mt-8 text-6xl font-light leading-tight">Pick a lens.</h2>
        <div className="mx-auto mt-8 h-px w-24 bg-zinc-900" />
        <p className="mt-8 text-lg text-zinc-600">Top right — try each one.</p>
      </div>
    </div>
  );
}
