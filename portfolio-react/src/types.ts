export type Metric = { value: string; label: string };
export type Challenge = { heading: string; body: string };

export type Project = {
  slug: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  year: string;
  disciplines: string[];
  thumb: string;
  videoSrc: string;
  overview: { date: string; categories: string[]; subtitle: string };
  about: string;
  metrics: Metric[];
  role: string;
  challenges: Challenge[];
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
