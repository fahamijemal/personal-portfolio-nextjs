/**
 * Site content from site_settings (hero, about, social links).
 * Uses translation keys as fallback when DB values are empty.
 */

export type SocialLinks = {
  github_url: string | null;
  linkedin_url: string | null;
  telegram_url: string | null;
  email: string | null;
};

export type HeroContent = {
  greeting_en: string | null;
  greeting_om: string | null;
  name_en: string | null;
  name_om: string | null;
  role_en: string | null;
  role_om: string | null;
  subtitle_en: string | null;
  subtitle_om: string | null;
  description_en: string | null;
  description_om: string | null;
};

export type AboutContent = {
  title_en: string | null;
  title_om: string | null;
  description_en: string | null;
  description_om: string | null;
  education_en: string | null;
  education_om: string | null;
  education_text_en: string | null;
  education_text_om: string | null;
  experience_en: string | null;
  experience_om: string | null;
  experience_text_en: string | null;
  experience_text_om: string | null;
  interests_en: string | null;
  interests_om: string | null;
  interests_text_en: string | null;
  interests_text_om: string | null;
};

export function getSocialLinks(settings: Record<string, string>): SocialLinks {
  return {
    github_url: settings.github_url?.trim() || null,
    linkedin_url: settings.linkedin_url?.trim() || null,
    telegram_url: settings.telegram_url?.trim() || null,
    email: settings.email?.trim() || null,
  };
}

export function getHeroContent(settings: Record<string, string>): HeroContent {
  return {
    greeting_en: settings.hero_greeting_en?.trim() || null,
    greeting_om: settings.hero_greeting_om?.trim() || null,
    name_en: settings.hero_name_en?.trim() || null,
    name_om: settings.hero_name_om?.trim() || null,
    role_en: settings.hero_role_en?.trim() || null,
    role_om: settings.hero_role_om?.trim() || null,
    subtitle_en: settings.hero_subtitle_en?.trim() || null,
    subtitle_om: settings.hero_subtitle_om?.trim() || null,
    description_en: settings.hero_description_en?.trim() || null,
    description_om: settings.hero_description_om?.trim() || null,
  };
}

export function getAboutContent(settings: Record<string, string>): AboutContent {
  return {
    title_en: settings.about_title_en?.trim() || null,
    title_om: settings.about_title_om?.trim() || null,
    description_en: settings.about_description_en?.trim() || null,
    description_om: settings.about_description_om?.trim() || null,
    education_en: settings.about_education_en?.trim() || null,
    education_om: settings.about_education_om?.trim() || null,
    education_text_en: settings.about_education_text_en?.trim() || null,
    education_text_om: settings.about_education_text_om?.trim() || null,
    experience_en: settings.about_experience_en?.trim() || null,
    experience_om: settings.about_experience_om?.trim() || null,
    experience_text_en: settings.about_experience_text_en?.trim() || null,
    experience_text_om: settings.about_experience_text_om?.trim() || null,
    interests_en: settings.about_interests_en?.trim() || null,
    interests_om: settings.about_interests_om?.trim() || null,
    interests_text_en: settings.about_interests_text_en?.trim() || null,
    interests_text_om: settings.about_interests_text_om?.trim() || null,
  };
}
