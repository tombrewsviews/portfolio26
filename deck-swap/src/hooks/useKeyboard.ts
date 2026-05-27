'use client';

import { useEffect } from 'react';

type Handler = (e: KeyboardEvent) => void;

export function useKeyboard(handler: Handler): void {
  useEffect(() => {
    const wrapped = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const t = e.target;
        if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
      }
      handler(e);
    };
    window.addEventListener('keydown', wrapped);
    return () => window.removeEventListener('keydown', wrapped);
  }, [handler]);
}
