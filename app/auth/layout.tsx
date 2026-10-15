import { noIndexMetadata } from "@/lib/personal-seo";

export const metadata = noIndexMetadata;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
