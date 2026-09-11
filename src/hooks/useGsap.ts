import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  callback: (ctx: gsap.Context, scope: T) => void,
  deps: unknown[] = []
) {
  const scopeRef = useRef<T>(null);

  useEffect(() => {
    if (!scopeRef.current) return;
    const ctx = gsap.context((self) => {
      callback(self, scopeRef.current!);
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

export { gsap, ScrollTrigger };
