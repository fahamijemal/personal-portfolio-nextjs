/**
 * Utilities for blog posts: reading time, TOC extraction.
 */

export function getReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const wpm = 200;
  return Math.max(1, Math.ceil(words / wpm));
}

export type TocItem = {
  level: number; // 2 for ##, 3 for ###
  text: string;
  slug: string;
};

export function extractHeadings(content: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    items.push({ level, text, slug });
  }
  return items;
}
