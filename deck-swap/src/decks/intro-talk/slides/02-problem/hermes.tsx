import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '02-problem', variant: 'hermes', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F47B20] text-white p-16">
      <div className="max-w-3xl border border-white/30 p-16">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">II. Le problème</p>
        <h2 className="mt-6 font-serif text-5xl italic leading-tight">
          Un seul récit, trois publics.
        </h2>
        <p className="mt-8 font-serif text-base leading-relaxed text-white/90">
          Le designer cherche le geste. L&apos;ingénieur cherche la clarté.
          L&apos;investisseur cherche le signal.
        </p>
      </div>
    </div>
  );
}
