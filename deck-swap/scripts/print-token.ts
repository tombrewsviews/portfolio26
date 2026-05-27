import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnv(): void {
  const envPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

async function main(): Promise<void> {
  loadEnv();
  const deckId = process.argv[2];
  if (!deckId) {
    console.error('usage: pnpm presenter-url <deckId>');
    process.exit(1);
  }
  const secret = process.env.PRESENTER_SECRET;
  if (!secret) {
    console.error('PRESENTER_SECRET missing (set it in .env.local)');
    process.exit(1);
  }

  const { deriveToken } = await import('../src/lib/hmac');
  const token = await deriveToken(deckId, secret);
  console.log(`/p/${deckId}/${token}`);
}

void main();
