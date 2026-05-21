import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { FLEX_MIN, weightForProgress } from '../lib/flexAnim';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function FlexText({ as: Tag = 'span', children, className, style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.style.fontVariationSettings = `"wght" ${weightForProgress(1)}`;
      return;
    }

    const obj = { p: 0 };
    el.style.fontVariationSettings = `"wght" ${FLEX_MIN}`;

    const tween = gsap.to(obj, {
      p: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 35%',
        scrub: true,
      },
      onUpdate: () => {
        el.style.fontVariationSettings = `"wght" ${Math.round(weightForProgress(obj.p))}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <Tag ref={ref as React.Ref<any>} className={className} style={style}>
      {children}
    </Tag>
  );
}
