/**
 * Shared types for portfolio and admin.
 */

export type Project = {
  id: string;
  title_en: string;
  title_om: string | null;
  description_en: string;
  description_om: string | null;
  technologies: string[];
  github_url: string | null;
  live_url: string | null;
  image_url?: string | null;
  featured?: boolean;
  display_order?: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title_en: string;
  title_om: string | null;
  excerpt_en?: string | null;
  excerpt_om?: string | null;
  content_en?: string;
  content_om?: string | null;
  published?: boolean;
  published_at: string | null;
  created_at?: string;
};

export type Skill = {
  id: string;
  category: string;
  name: string;
  level: number;
  display_order: number;
};

export type Certificate = {
  id: string;
  title_en: string;
  title_om: string | null;
  issuer: string | null;
  credential_url: string;
  image_url: string | null;
  issued_at: string | null;
};
