import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-hello', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">claude · skills</p>
        <h1 className="mt-4 text-7xl font-semibold leading-tight">Hello.</h1>
        <p className="mt-6 text-xl text-zinc-400">A talk about shipping with agents.</p>
      </div>
    </div>
  );
}
