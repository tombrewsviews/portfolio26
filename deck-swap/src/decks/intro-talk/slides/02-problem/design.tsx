import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-problem', variant: 'design', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white text-zinc-900 p-16">
      <div className="grid max-w-5xl grid-cols-2 gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">02 / Problem</p>
          <h2 className="mt-6 text-5xl font-light leading-tight">One deck, many readers.</h2>
        </div>
        <div className="border-l border-zinc-200 pl-8">
          <p className="text-zinc-600">Designers want craft.</p>
          <p className="mt-3 text-zinc-600">Engineers want clarity.</p>
          <p className="mt-3 text-zinc-600">Investors want signal.</p>
        </div>
      </div>
    </div>
  );
}
