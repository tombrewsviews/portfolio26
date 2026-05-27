import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-problem', variant: 'claude', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white p-16">
      <div className="max-w-3xl">
        <p className="text-sm font-mono uppercase tracking-widest text-zinc-500">02 · problem</p>
        <h2 className="mt-4 text-5xl font-semibold leading-tight">
          The same deck looks different to different people.
        </h2>
        <ul className="mt-8 space-y-2 text-lg text-zinc-400">
          <li>— Designers want craft.</li>
          <li>— Engineers want clarity.</li>
          <li>— Investors want signal.</li>
        </ul>
      </div>
    </div>
  );
}
