export type Metric = { value: string; label: string };
export type Challenge = { heading: string; body: string };

/**
 * Screenshot placement variants. All snap to the same 12-column grid so that
 * placement looks unpredictable between sections but stays aligned — the
 * Marin Kurir "varied but on-grid" feel. `pair` carries two frames.
 */
export type ShotLayout =
  | 'bleed' // full viewport width, breaks the container
  | 'full' // full content width (cols 1–12)
  | 'wide-left' // cols 1–9, right margin open
  | 'wide-right' // cols 4–12, left margin open
  | 'narrow-left' // cols 1–5, hugs left
  | 'narrow-right' // cols 8–12, hugs right
  | 'pair'; // two frames, cols 1–6 and 7–12, vertically staggered

export type Shot = {
  layout: ShotLayout;
  /** Aspect ratio as "w / x" for the frame(s). */
  ratio: string;
  /** Directional caption marker like "[UP]" / "[LEFT]", Marin Kurir style. */
  marker?: string;
  /** Short label describing the screenshot. */
  caption?: string;
  /** Image src(s). One for most layouts, two for `pair`. Empty → placeholder. */
  src?: string;
  srcB?: string;
  /** Caption/marker for the second frame in a `pair`. */
  markerB?: string;
  captionB?: string;
  /** Show the "Under NDA" overlay + tint over the frame(s). Off by default. */
  nda?: boolean;
};

export type Project = {
  slug: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  year: string;
  disciplines: string[];
  thumb: string;
  /** Optional video intro. Omit to skip the VideoIntro section entirely. */
  videoSrc?: string;
  overview: { date: string; categories: string[] };
  about: string;
  metrics: Metric[];
  role: string;
  challenges: Challenge[];
  /**
   * Screenshots interleaved between case sections. Order matters: the page
   * distributes them across the gaps between Overview/Metrics/Role/Challenges
   * so placement varies per project.
   */
  shots?: Shot[];
};

export type Experiment = {
  title: string;
  description: string;
  links: { label: string; href: string }[];
};

export type ShapedGroup = {
  key: string;
  items: { name: string; note: string }[];
};

export type Social = { label: string; href: string };
export type Source = { name: string; href: string; note: string };
