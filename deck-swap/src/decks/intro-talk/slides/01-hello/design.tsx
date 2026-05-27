import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-hello', variant: 'design', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white text-zinc-900 p-16">
      <div className="max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Claude Design</p>
        <h1 className="mt-8 text-8xl font-light tracking-tight">Hello</h1>
        <div className="mx-auto mt-8 h-px w-24 bg-zinc-900" />
        <p className="mt-8 text-lg text-zinc-600">A talk about shipping with agents.</p>
      </div>
    </div>
  );
}
