import Link from 'next/link';
import { deck as introTalk } from '@/decks/intro-talk/deck.config';

const decks = [introTalk];

export default function HomePage() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-zinc-950 p-12">
      <div className="max-w-xl">
        <h1 className="text-3xl font-semibold">deck-swap</h1>
        <p className="mt-2 text-zinc-400">Decks on this instance:</p>
        <ul className="mt-6 space-y-3">
          {decks.map((d) => (
            <li key={d.id} className="rounded-xl border border-zinc-800 p-4">
              <p className="font-medium">{d.title}</p>
              <p className="mt-1 text-sm text-zinc-500">
                Viewer:&nbsp;
                <Link className="underline" href={`/v/${d.id}`}>/v/{d.id}</Link>
              </p>
              <p className="text-sm text-zinc-500">
                Presenter URL: derive token with `pnpm token {d.id}` (see README).
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
