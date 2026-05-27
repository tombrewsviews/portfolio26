import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '01-hello', variant: 'hermes', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F47B20] text-white p-16">
      <div className="max-w-3xl border border-white/30 p-16">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">Hermès</p>
        <h1 className="mt-6 font-serif text-8xl italic">Hello.</h1>
        <p className="mt-8 font-serif text-lg leading-relaxed text-white/90">
          Une conversation sur l&apos;art de livrer avec des agents.
        </p>
      </div>
    </div>
  );
}
