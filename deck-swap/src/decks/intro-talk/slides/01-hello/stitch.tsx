import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-hello', variant: 'stitch', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-zinc-900 p-16">
      <div className="max-w-3xl rounded-3xl border border-zinc-200 bg-white/70 p-12 shadow-xl backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Google Stitch</p>
        <h1 className="mt-3 text-6xl font-bold">👋 Hello</h1>
        <p className="mt-4 text-lg text-zinc-600">A talk about shipping with agents.</p>
      </div>
    </div>
  );
}
