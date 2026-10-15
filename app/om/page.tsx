import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Lightbulb,
} from "lucide-react";
import {
  publicPageMetadata,
  personalBrand,
  profilePageGraph,
  serializeStructuredData,
} from "@/lib/personal-seo";
import { ProfileLanguageLink } from "@/components/portfolio/profile-language-link";

export const metadata = publicPageMetadata({
  title: "Fahami Jemal Harun | Hundeessaa IFAA TECHNOLOGIES",
  description:
    "Fahami Jemal Harun, hundeessaa IFAA TECHNOLOGIES. Sooftiweerii, oomisha dijitaalaa fi yaada teeknooloojii Itoophiyaa fi Oromiyaa keessatti faayidaa uumu irratti hojjedha.",
  path: "/om",
  oromo: true,
  home: true,
});

export default function OromoProfilePage() {
  return (
    <div lang="om" className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(profilePageGraph("/om", "om")),
        }}
      />
      <a href="#main-content" className="skip-link">
        Gara qabiyyee ijoo darbi
      </a>
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <Link
            href="/om"
            aria-current="page"
            className="font-semibold tracking-tight"
          >
            Fahami Jemal Harun
          </Link>
          <nav
            aria-label="Filannoo afaanii"
            className="flex flex-wrap items-center gap-5 text-sm"
          >
            <ProfileLanguageLink
              language="en"
              className="text-muted-foreground hover:text-primary"
            >
              English
            </ProfileLanguageLink>
            <span className="font-semibold text-primary" aria-current="page">
              Afaan Oromo
            </span>
          </nav>
        </div>
      </header>
      <main id="main-content">
        <section className="border-b border-border bg-primary/5 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-xs font-semibold leading-6 tracking-widest text-primary">
              SOOFTIWEERII · OOMISHA DIJITAALAA · YAADA HAARAA
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Fahami Jemal Harun
            </h1>
            <p className="mt-5 text-xl font-medium text-primary sm:text-2xl">
              Hundeessaa IFAA TECHNOLOGIES.
            </p>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              Ani Fahami Jemal Harun, hojii sooftiweerii fi oomisha dijitaalaa
              irratti hojjedha. Yaada gaarii gara furmaata qabatamaatti
              jijjiiruun namootaa fi dhaabbilee akka gargaaru nan barbaada.
              Fuulli kun hojii koo, yaada koo fi kaayyoo koo Afaan Oromootiin
              ibsa.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={personalBrand.companyUrl}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
              >
                IFAA TECHNOLOGIES ilaali
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold hover:bg-secondary"
              >
                Na quunnami
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section className="px-6 py-20" aria-labelledby="purpose-title">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-xs font-semibold tracking-widest text-primary">
              WAA’EE HOJII KOO
            </p>
            <h2
              id="purpose-title"
              className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl"
            >
              Teeknooloojii namootaaf faayidaa qabu.
            </h2>
            <p className="mt-6 max-w-3xl leading-8 text-muted-foreground">
              Sooftiweeriin gaariin rakkoo hubachuu irraa jalqaba. Dizaayinii
              ifa ta’e, ijaarsa amanamaa fi fedhii namoota itti fayyadamanii
              walitti fiduun furmaata fooyya’aa uumuun ni danda’ama. Itoophiyaa
              fi Oromiyaa keessatti namootaa fi dhaabbilee waliin carraa
              teeknooloojii qorachuu irratti xiyyeeffadha.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Code2,
                  title: "Sooftiweerii hojii irra oolu",
                  copy: "Marsariitiiwwan, appilikeeshiniiwwanii fi sirna dijitaalaa hojii guyyaa guyyaa salphisuuf qophaa’an irratti hojjechuu.",
                },
                {
                  icon: Lightbulb,
                  title: "Yaada gara oomishaatti",
                  copy: "Rakkoo tokko hubachuun yaada dijitaalaa qorachuu, ijaaruu fi fooyyessuu. Teeknooloojii kaayyoo ifa qabuun qajeelfamuu.",
                },
                {
                  icon: BookOpen,
                  title: "Barachuu fi qooduu",
                  copy: "Waa’ee ijaarsa sooftiweerii, meeshaalee ammayyaa fi muuxannoo hojii barachuu; yaada kana barreeffamaan qooduu.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <article
                  key={title}
                  className="rounded-xl border border-border bg-card p-7"
                >
                  <Icon
                    size={26}
                    className="mb-6 text-primary"
                    aria-hidden="true"
                  />
                  <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          className="border-y border-border bg-secondary/40 px-6 py-20"
          aria-labelledby="company-title"
        >
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-widest text-primary">
                DHAABBATA ANI HUNDEESSE
              </p>
              <h2 id="company-title" className="text-3xl font-bold sm:text-4xl">
                IFAA TECHNOLOGIES
              </h2>
            </div>
            <div>
              <p className="leading-8 text-muted-foreground">
                IFAA TECHNOLOGIES dhaabbata sooftiweerii fi teeknooloojii
                Itoophiyaa keessatti ijaarame dha. Oomishaalee dijitaalaa ofii
                isaa ijaaruu fi dhaabbilee biroof furmaata sooftiweerii
                qopheessuu irratti xiyyeeffata. Kaayyoon isaa teeknooloojii
                barnoota deeggaru, hojii salphisu fi carraa haaraa uumu ijaaruu
                dha.
              </p>
              <a
                href={personalBrand.companyUrl}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4"
              >
                Waa’ee dhaabbatichaa dabalataan dubbisi
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section className="px-6 py-20" aria-labelledby="work-title">
          <div className="mx-auto max-w-6xl">
            <h2 id="work-title" className="text-3xl font-bold sm:text-4xl">
              Hojii fi yaada koo ilaali.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-muted-foreground">
              Pirojektoota, barreeffamootaa fi ragaalee koo fuulota armaan gadii
              irratti argachuu dandeessa. Fuulonni kun jalqaba Afaan
              Ingiliziitiin banamu; filannoon Afaan Oromoos marsariiticha
              keessatti ni jira.
            </p>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {[
                ["/projects", "Pirojektoota"],
                ["/blog", "Barreeffamoota"],
                ["/certificates", "Ragaalee"],
              ].map(([href, title]) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border p-6 font-semibold hover:border-primary"
                >
                  {title}
                  <ArrowRight
                    size={19}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Fahami Jemal Harun.</p>
          <nav
            aria-label="Hidhamtoota dabalataa"
            className="flex flex-wrap gap-5"
          >
            <ProfileLanguageLink language="en">
              English profile
            </ProfileLanguageLink>
            <a href={personalBrand.github}>GitHub</a>
            <a href={personalBrand.companyUrl}>IFAA TECHNOLOGIES</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
