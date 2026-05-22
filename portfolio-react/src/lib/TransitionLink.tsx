import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react';
import { useTransition } from './PageTransition';

/**
 * Drop-in replacement for react-router's <Link> that plays the full-page swipe
 * (see PageTransition) instead of navigating instantly. Renders a real <a> so
 * cmd/ctrl/middle-click still open a new tab and the URL is real for SEO/a11y;
 * only a plain left-click is intercepted to run the transition.
 */
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  ({ to, onClick, children, ...rest }, ref) => {
    const transitionTo = useTransition();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      // Let the browser handle modified clicks (new tab/window) and non-left clicks.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      e.preventDefault();
      transitionTo(to);
    };

    return (
      <a href={to} ref={ref} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  },
);

TransitionLink.displayName = 'TransitionLink';

export default TransitionLink;
