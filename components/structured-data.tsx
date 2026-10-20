import { serializeStructuredData } from "@/lib/personal-seo";

export function StructuredData({ value }: { value: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeStructuredData(value) }}
    />
  );
}
