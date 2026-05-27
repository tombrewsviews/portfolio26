import type { SlideMeta, SlideProps } from '@/lib/types';

export const meta: SlideMeta = { id: '03-cta', variant: 'hermes', transition: 'fade' };

export default function Slide(_: SlideProps) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F47B20] text-white p-16">
      <div className="max-w-2xl border border-white/30 p-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/70">III. À vous</p>
        <h2 className="mt-6 font-serif text-6xl italic">Choisissez.</h2>
        <p className="mt-8 font-serif text-base leading-relaxed text-white/90">
          Le sélecteur est en haut, à droite.
        </p>
      </div>
    </div>
  );
}
