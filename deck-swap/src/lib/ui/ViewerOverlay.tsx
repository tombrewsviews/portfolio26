'use client';

import { VARIANT_LABELS, type Deck, type VariantKey } from '@/lib/types';

interface Props {
  deck: Deck;
  slideIndex: number;
  currentLive: number;
  maxReached: number;
  variant: VariantKey;
  onVariantChange: (v: VariantKey) => void;
  onJumpToLive: () => void;
}

const ALL: VariantKey[] = ['claude', 'design', 'stitch', 'hermes'];

export function ViewerOverlay({
  deck,
  slideIndex,
  currentLive,
  maxReached,
  variant,
  onVariantChange,
  onJumpToLive,
}: Props) {
  const entry = deck.slides[slideIndex];
  const behind = slideIndex !== currentLive;

  return (
    <>
      <div className="pointer-events-auto absolute right-6 top-6 rounded-2xl border border-white/15 bg-black/70 p-3 text-xs text-white backdrop-blur">
        <p className="px-2 pb-2 text-[10px] uppercase tracking-widest text-white/50">Design lens</p>
        <ul>
          {ALL.map((v) => {
            const available = entry ? Boolean(entry.variants[v]) : false;
            const selected = v === variant;
            return (
              <li key={v}>
                <button
                  disabled={!available}
                  onClick={() => onVariantChange(v)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition ${
                    selected ? 'bg-white/15' : 'hover:bg-white/10'
                  } ${available ? '' : 'opacity-30 cursor-not-allowed'}`}
                  title={available ? VARIANT_LABELS[v] : 'not designed in this lens yet'}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full border border-white/40 ${
                      selected ? 'bg-white' : ''
                    }`}
                  />
                  {VARIANT_LABELS[v]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {behind && (
        <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex justify-center p-6">
          <div className="flex items-center gap-4 rounded-full border border-white/15 bg-black/70 px-5 py-2 text-sm text-white backdrop-blur">
            <span className="font-mono tabular-nums">
              viewing {String(slideIndex + 1).padStart(2, '0')} / live{' '}
              {String(currentLive + 1).padStart(2, '0')} ({maxReached + 1} seen)
            </span>
            <button
              onClick={onJumpToLive}
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black"
            >
              Jump to live →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
