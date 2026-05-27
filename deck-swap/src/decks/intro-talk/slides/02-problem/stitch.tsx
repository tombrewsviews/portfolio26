import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-problem', variant: 'stitch', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 text-zinc-900 p-16">
      <div className="max-w-4xl rounded-3xl border border-zinc-200 bg-white/70 p-12 shadow-xl backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-wider text-blue-600">Problem</p>
        <h2 className="mt-3 text-4xl font-bold">One deck, three audiences. 🎨🧑‍💻💰</h2>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-pink-100 p-4 text-sm">Designers want craft</div>
          <div className="rounded-xl bg-blue-100 p-4 text-sm">Engineers want clarity</div>
          <div className="rounded-xl bg-green-100 p-4 text-sm">Investors want signal</div>
        </div>
      </div>
    </div>
  );
}
