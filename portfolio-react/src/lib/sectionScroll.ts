/**
 * Lenis `scrollTo` offset for landing on an in-page section.
 *
 * Lenis applies `target = element.top + offset`, so a NEGATIVE offset stops the
 * scroll earlier — leaving the section sitting *below* the sticky nav instead of
 * tucked underneath it. We derive the amount from the rendered nav height plus a
 * breathing gap, so it stays correct across breakpoints (the nav padding is
 * fluid). Falls back to a sane default before the nav has measured.
 */
export function sectionScrollOffset(gap = 36): number {
  const nav = document.querySelector<HTMLElement>('.nav');
  const navHeight = nav?.offsetHeight ?? 64;
  return -(navHeight + gap);
}
