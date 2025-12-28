import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Shield,
  Sparkles,
  Handshake,
  Crown,
  Film,
  ArrowRight,
  Mail,
  Phone,
  Lock,
  ExternalLink,
  Quote,
} from "lucide-react";

// ---------------------------------------------
// THE STANDARD — Single-file website (React)
// - Tailwind CSS assumed available
// - Hash-based routing (no deps)
// - YouTube integration via playlist + individual embeds
// ---------------------------------------------

const BRAND = {
  name: "THE STANDARD",
  subtitle: "A Rolls‑Royce Life",
  tagline: "Excellence is the standard. Everything else is optional.",
  contactEmail: "Partnerships@TheStandardSeries.com",
  contactPhone: "(240) 946‑0774",
};

// Replace with your actual YouTube playlist ID + featured video IDs
const YT = {
  playlistId: "PLxxxxxxxxxxxxxxxx", // TODO
  featuredVideoId: "dQw4w9WgXcQ", // TODO
  // Optional: curate episodes here (used by Watch page)
  episodes: [
    {
      id: "dQw4w9WgXcQ",
      title: "Episode 1 — The Architecture of Excellence",
      runtime: "24:18",
      blurb:
        "A cinematic portrait of discipline, legacy, and the mindset behind extraordinary achievement.",
    },
    {
      id: "M7lc1UVf-VE",
      title: "Episode 2 — Destination: Luxury",
      runtime: "22:05",
      blurb:
        "An intimate look at how high performers curate their worlds—where they stay, how they move, what they value.",
    },
    {
      id: "ysz5S6PUM-U",
      title: "Episode 3 — The Vault Insight",
      runtime: "26:41",
      blurb: "Wisdom, strategy, and the principles that compound over time.",
    },
  ],
};

const NAV = [
  { key: "home", label: "Home" },
  { key: "watch", label: "Watch" },
  { key: "founding-guests", label: "Founding Guests" },
  { key: "sponsors", label: "Sponsors" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getHashRouteSafe() {
  if (typeof window === "undefined") return "/home";
  return (window.location.hash || "#/home").replace("#", "");
}

function useHashRoute() {
  const [route, setRoute] = useState(getHashRouteSafe());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onHash = () => setRoute(getHashRouteSafe());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const key = route.split("/")[1] || "home";
  const param = route.split("/")[2] || "";
  return { key, param };
}

function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <BackgroundGlow />
      <TopNav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute -bottom-24 right-[-120px] h-[360px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
    </div>
  );
}

function TopNav() {
  const { key } = useHashRoute();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const active = (k) => key === k;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#/home" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Crown className="h-4 w-4 text-yellow-400" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">{BRAND.name}</div>
            <div className="text-xs text-neutral-400">{BRAND.subtitle}</div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.key}
              href={`#/${item.key}`}
              className={cx(
                "rounded-2xl px-3 py-2 text-sm transition",
                active(item.key)
                  ? "bg-white/10 text-white"
                  : "text-neutral-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#/contact"
            className="ml-2 inline-flex items-center gap-2 rounded-2xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-neutral-950 shadow-lg shadow-yellow-500/10 hover:bg-yellow-400"
          >
            Inquire <ArrowRight className="h-4 w-4" />
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
        >
          Menu
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/10"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-2">
                {NAV.map((item) => (
                  <a
                    key={item.key}
                    href={`#/${item.key}`}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "rounded-2xl px-3 py-2 text-sm transition",
                      active(item.key)
                        ? "bg-white/10 text-white"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <a
                href="#/contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-neutral-950"
              >
                Inquire <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl break-words">
        {value}
      </div>
      <div className="mt-1 text-sm text-neutral-400">{label}</div>
    </div>
  );
}

function Pill({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-500/10">
        <Icon className="h-5 w-5 text-yellow-400" />
      </div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-1 text-sm text-neutral-400">{desc}</div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-widest text-yellow-400">
          {eyebrow}
        </div>
      )}
      <div className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</div>
      {desc && <div className="mt-3 max-w-2xl text-neutral-300">{desc}</div>}
    </div>
  );
}

function Button({ href, onClick, variant = "primary", children }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-yellow-500 text-neutral-950 hover:bg-yellow-400 shadow-lg shadow-yellow-500/10"
      : variant === "ghost"
      ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
      : "border border-white/10 bg-transparent text-white hover:bg-white/5";

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={cx(base, styles)}
      >
        {children}
        {isExternal && <ExternalLink className="h-4 w-4" />}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cx(base, styles)}>
      {children}
    </button>
  );
}

function YouTubeEmbed({ videoId, title }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
          title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function YouTubePlaylistEmbed({ playlistId }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1&playsinline=1`}
          title="YouTube playlist player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

// -----------------------
// Pages
// -----------------------

function Home() {
  return (
    <div className="space-y-12">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-neutral-300">
            <Shield className="h-4 w-4 text-yellow-400" /> Brand‑safe, approval‑first production
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            A cinematic portrait series featuring members of the Rolls‑Royce Whispers community.
          </h1>
          <p className="mt-4 max-w-xl text-neutral-300">
            We don’t review cars. We document a philosophy of living—discipline, legacy, and the architecture of
            excellence.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href="#/watch">
              <Play className="h-4 w-4" /> Watch
            </Button>
            <Button href="#/founding-guests" variant="ghost">
              <Crown className="h-4 w-4" /> Founding Guests
            </Button>
            <Button href="#/sponsors" variant="ghost">
              <Handshake className="h-4 w-4" /> Sponsors
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat value="14–15" label="Episodes (Season 1 target)" />
            <Stat value="15" label="Founding guest positions" />
            <Stat value="Invitation‑only" label="Participation" />
          </div>
        </div>

        <div className="space-y-4">
          <YouTubeEmbed videoId={YT.featuredVideoId} title="THE STANDARD — Featured" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Pill
              icon={Film}
              title="Broadcast‑ready production"
              desc="4K cinematic capture, color grading, multi‑camera interviews, original score."
            />
            <Pill
              icon={Lock}
              title="Relationship‑led partnerships"
              desc="Carefully curated, season‑long associations."
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Pill
          icon={Sparkles}
          title="For viewers"
          desc="Substance over spectacle—what excellence looks like in practice, from those who live it."
        />
        <Pill
          icon={Crown}
          title="For Founding Guests"
          desc="A permanent, cinematic legacy piece—crafted with discretion, input, and premium distribution."
        />
        <Pill
          icon={Handshake}
          title="For Sponsors"
          desc="Select, category‑aligned partnerships structured privately and with long‑term fit in mind."
        />
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-7">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-yellow-400">Positioning</div>
            <div className="mt-2 text-2xl font-semibold">The gap in luxury content</div>
            <p className="mt-3 text-neutral-300">
              Most automotive media focuses on mechanics and features. THE STANDARD focuses on the mindset and
              lifestyle behind ownership—why people build what they build, and how they choose to live.
            </p>
          </div>
          <div className="flex items-end justify-start lg:justify-end">
            <Button href="#/about" variant="ghost">
              Read the story <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Watch() {
  const [selected, setSelected] = useState(YT.episodes[0]?.id || YT.featuredVideoId);
  const selectedMeta = useMemo(
    () => YT.episodes.find((e) => e.id === selected) || null,
    [selected]
  );

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Watch"
        title="Episodes on YouTube"
        desc="Stream full episodes here. Embeds use youtube‑nocookie.com."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <YouTubeEmbed videoId={selected} title={selectedMeta?.title || "Episode"} />
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">{selectedMeta?.title || "Featured"}</div>
                <div className="mt-1 text-sm text-neutral-400">{selectedMeta?.runtime || ""}</div>
                <div className="mt-3 text-sm text-neutral-300">{selectedMeta?.blurb || ""}</div>
              </div>
              <Button href={`https://www.youtube.com/watch?v=${selected}`} variant="ghost">
                Open on YouTube <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold">All Episodes</div>
            <div className="mt-3 space-y-2">
              {YT.episodes.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => setSelected(ep.id)}
                  className={cx(
                    "w-full rounded-2xl border px-4 py-3 text-left transition",
                    ep.id === selected
                      ? "border-yellow-500/40 bg-yellow-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{ep.title}</div>
                      <div className="mt-1 text-xs text-neutral-400">{ep.runtime}</div>
                    </div>
                    <Play className={cx("h-4 w-4", ep.id === selected ? "text-yellow-400" : "text-neutral-400")} />
                  </div>
                  <div className="mt-2 line-clamp-2 text-sm text-neutral-300">{ep.blurb}</div>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <div className="text-xs text-neutral-400">Prefer a playlist view?</div>
              <div className="mt-2">
                <Button href={`https://www.youtube.com/playlist?list=${YT.playlistId}`} variant="outline">
                  Open playlist <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionTitle eyebrow="Playlist" title="Watch the full season" />
      <YouTubePlaylistEmbed playlistId={YT.playlistId} />
    </div>
  );
}

function FoundingGuests() {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Founding Guests"
        title="Your story. Your legacy."
        desc="A premium portrait experience for select principals—crafted as a permanent record of how you built your life."
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <Pill
          icon={Film}
          title="Cinematic profile"
          desc="A dedicated profile segment with professional filming, editing, and color grading—built to premium standards."
        />
        <Pill
          icon={Sparkles}
          title="Full content suite"
          desc="Lifestyle stills, supporting footage, and a digital press kit—usable for PR and personal archives."
        />
        <Pill
          icon={Shield}
          title="Discreet and collaborative"
          desc="A curated production day, edit consultation, and a private premiere invitation." 
        />
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-7">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-2xl font-semibold">The production experience</div>
            <p className="mt-3 text-neutral-300">
              Filming is designed as an experience: pre‑production consultation, a focused shoot window, and a
              collaborative edit process to preserve discretion and accuracy.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                ["Arrival", "A composed, cinematic entrance"],
                ["Setting", "Five‑star venue or private location"],
                ["Interview", "Your story—vision, journey, philosophy"],
                ["Craft", "Cinematic B‑roll and portrait moments"],
                ["Review", "Collaborative approval‑first workflow"],
                ["Premiere", "Private screening invitation"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-1 text-sm text-neutral-400">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-neutral-950/40 p-5">
            <div className="text-sm font-semibold">Next steps</div>
            <ol className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex gap-2">
                <span className="text-yellow-400">1.</span> Submit an inquiry
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400">2.</span> Brief conversation
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-400">3.</span> Schedule filming
              </li>
            </ol>
            <div className="mt-5 flex flex-col gap-2">
              <Button href="#/contact">
                Request the guest brief <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                href={`mailto:${BRAND.contactEmail}?subject=Founding%20Guest%20Inquiry%20—%20THE%20STANDARD`}
                variant="ghost"
              >
                Email <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 text-xs text-neutral-400">Participation is invitation‑only.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Sponsors() {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Sponsors"
        title="Select partnerships, discreetly structured"
        desc="THE STANDARD partners with a small number of category‑aligned institutions each season. Participation is by qualification and designed to preserve trust, discretion, and long‑term relationships."
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <PricingCard
          title="Category Lock"
          price="$10,000"
          subtitle="30‑day exclusive hold"
          bullets={["Category exclusivity", "Seasonal alignment", "Private collaboration", "Details shared by request"]}
          cta={{ label: "Request brief", href: "#/contact" }}
        />
        <PricingCard
          title="Episode Participation"
          price="$65,000"
          subtitle="Per episode"
          bullets={["Category exclusivity", "Seasonal alignment", "Private collaboration", "Details shared by request"]}
          highlight
          cta={{ label: "Request brief", href: "#/contact" }}
        />
        <PricingCard
          title="Season / Premier"
          price="$325K – $650K"
          subtitle="Full‑season partnership"
          bullets={["Category exclusivity", "Seasonal alignment", "Private collaboration", "Details shared by request"]}
          cta={{ label: "Request brief", href: "#/contact" }}
        />
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-7">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-2xl font-semibold">How partnerships are approached</div>
            <p className="mt-3 text-neutral-300">
              Sponsorship is intentionally limited. Each partnership is structured privately to align values,
              category relevance, and long‑term fit. Operational details are never public and are discussed only
              after mutual interest is established.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-neutral-950/40 p-5">
            <div className="text-sm font-semibold">Inquiry process</div>
            <ol className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex gap-2"><span className="text-yellow-400">1.</span> Submit an inquiry</li>
              <li className="flex gap-2"><span className="text-yellow-400">2.</span> Qualification conversation</li>
              <li className="flex gap-2"><span className="text-yellow-400">3.</span> Private sponsor brief</li>
            </ol>
            <div className="mt-5 flex flex-col gap-2">
              <Button href="#/contact">Request sponsor brief <ArrowRight className="h-4 w-4" /></Button>
              <Button
                href={`mailto:${BRAND.contactEmail}?subject=Confidential%20Sponsor%20Inquiry%20—%20THE%20STANDARD`}
                variant="ghost"
              >
                Contact partnerships <Mail className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 text-xs text-neutral-400">All discussions are confidential and non‑obligatory.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ title, price, subtitle, bullets, cta, highlight }) {
  return (
    <div
      className={cx(
        "rounded-[28px] border p-6",
        highlight ? "border-yellow-500/40 bg-yellow-500/10" : "border-white/10 bg-white/5"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="mt-1 text-xs text-neutral-400">{subtitle}</div>
        </div>
        {highlight && (
          <span className="rounded-2xl bg-yellow-500 px-3 py-1 text-xs font-semibold text-neutral-950">
            Recommended
          </span>
        )}
      </div>
      <div className="mt-5 text-3xl font-semibold tracking-tight">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-neutral-300">
        {bullets.map((b, idx) => (
          <li key={`${b}-${idx}`} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button href={cta.href}>
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="About"
        title="A documentary series worthy of the marque"
        desc="THE STANDARD is built around premium storytelling, brand protection, and an editorial standard of discretion."
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <Pill
          icon={Shield}
          title="Brand protection commitment"
          desc="Approval‑first workflow, restricted associations, and a standard of excellence in every frame."
        />
        <Pill
          icon={Film}
          title="Episode architecture"
          desc="Consistent segments enable seamless storytelling and repeatable creative production." 
        />
        <Pill
          icon={Sparkles}
          title="Distribution"
          desc="YouTube for proof‑of‑concept, with pathways to premium platform expansion and live screenings."
        />
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-7">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="text-2xl font-semibold">Host & Executive Producer</div>
            <p className="mt-3 text-neutral-300">
              Kris Buban is a Rolls‑Royce owner and member of the Whispers community, creating from inside the community—peer to
              the guests, not an outside reviewer.
            </p>
            <div className="mt-5 rounded-3xl border border-white/10 bg-neutral-950/40 p-5">
              <div className="flex items-start gap-3">
                <Quote className="mt-0.5 h-5 w-5 text-yellow-400" />
                <div className="text-sm text-neutral-300">“We don’t review cars. We document a philosophy of living.”</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-neutral-950/40 p-6">
            <div className="text-sm font-semibold">What makes this different</div>
            <div className="mt-3 space-y-3 text-sm text-neutral-300">
              <div className="flex gap-2">
                <span className="text-yellow-400">•</span> Selected guests (owners, not influencers)
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400">•</span> Relationship‑led partnerships
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400">•</span> Broadcast‑ready production quality
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400">•</span> Discretion, approvals, and brand protection
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#/watch" variant="ghost">
                <Play className="h-4 w-4" /> Watch
              </Button>
              <Button href="#/contact" variant="ghost">
                <Mail className="h-4 w-4" /> Inquire
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Contact"
        title="Request a brief. Schedule a call."
        desc="Tell us whether you’re a Founding Guest, Sponsor, or Media/Viewer inquiry."
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <ContactCard
          icon={Crown}
          title="Founding Guests"
          desc="Selection‑based invitations for members of the Whispers community and aligned principals."
          ctaLabel="Email guest team"
          href={`mailto:${BRAND.contactEmail}?subject=Founding%20Guest%20Inquiry%20—%20THE%20STANDARD`}
        />
        <ContactCard
          icon={Handshake}
          title="Sponsors"
          desc="Category exclusivity and limited seasonal participation."
          ctaLabel="Email partnerships"
          href={`mailto:${BRAND.contactEmail}?subject=Confidential%20Sponsor%20Inquiry%20—%20THE%20STANDARD`}
        />
        <ContactCard
          icon={Play}
          title="Viewers / Media"
          desc="Press, distribution inquiries, or collaborations."
          ctaLabel="Email media"
          href={`mailto:${BRAND.contactEmail}?subject=Media%20Inquiry%20—%20THE%20STANDARD`}
        />
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/5 p-7">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="text-sm font-semibold">Direct</div>
            <div className="mt-4 space-y-3 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-yellow-400" />
                <a className="hover:underline" href={`mailto:${BRAND.contactEmail}`}>
                  {BRAND.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-yellow-400" />
                <a className="hover:underline" href={`tel:${BRAND.contactPhone.replace(/[^0-9+]/g, "")}`}>
                  {BRAND.contactPhone}
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-neutral-950/40 p-5">
              <div className="text-sm font-semibold">Quick note</div>
              <p className="mt-2 text-sm text-neutral-300">
                We protect discretion. Guest details and category availability are shared on request.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-neutral-950/40 p-6">
            <div className="text-sm font-semibold">Lead form (optional)</div>
            <p className="mt-2 text-sm text-neutral-400">
              If you want a real form submission, connect this to your backend (e.g., Webflow, Next.js API
              route, HubSpot) and replace the mailto action.
            </p>

            <form
              className="mt-4 space-y-3"
              action={`mailto:${BRAND.contactEmail}`}
              method="post"
              encType="text/plain"
            >
              <Field label="Name" placeholder="Full name" name="name" />
              <Field label="Company" placeholder="Company / Organization" name="company" />
              <Field label="Email" placeholder="you@company.com" name="email" type="email" />
              <Field
                label="I’m reaching out as"
                name="type"
                as="select"
                options={["Founding Guest", "Sponsor", "Media", "Viewer"]}
              />
              <Field label="Message" placeholder="What would you like to accomplish?" name="message" as="textarea" />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-yellow-400"
              >
                Send <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="text-xs text-neutral-500">
        By contacting us, you acknowledge that communications may be used to coordinate production logistics and
        partnership discussions. Guest contact is shared only by explicit consent.
      </section>
    </div>
  );
}

function ContactCard({ icon: Icon, title, desc, ctaLabel, href }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10">
        <Icon className="h-5 w-5 text-yellow-400" />
      </div>
      <div className="mt-4 text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-neutral-300">{desc}</div>
      <div className="mt-5">
        <Button href={href}>{ctaLabel}</Button>
      </div>
    </div>
  );
}

function Field({ label, name, placeholder, type = "text", as, options }) {
  const common =
    "mt-1 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30";

  return (
    <label className="block">
      <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{label}</div>
      {as === "textarea" ? (
        <textarea name={name} placeholder={placeholder} rows={4} className={common} />
      ) : as === "select" ? (
        <select name={name} className={common} defaultValue={options?.[0]}>
          {options?.map((o) => (
            <option key={o} value={o} className="bg-neutral-900">
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={common} />
      )}
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-400 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-semibold text-neutral-200">{BRAND.name}</div>
            <div className="text-xs">
              {BRAND.subtitle} • {BRAND.tagline}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="hover:text-white" href="#/watch">Watch</a>
            <a className="hover:text-white" href="#/founding-guests">Founding Guests</a>
            <a className="hover:text-white" href="#/sponsors">Sponsors</a>
            <a className="hover:text-white" href="#/contact">Contact</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved. This site is a concept build; update legal
          and trademark language before launch. THE STANDARD is an independent documentary project and is not affiliated
          with or endorsed by Rolls‑Royce Motor Cars.
        </div>
      </div>
    </footer>
  );
}

function NotFound() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
      <div className="text-2xl font-semibold">Page not found</div>
      <div className="mt-2 text-neutral-300">Try going back to the home page.</div>
      <div className="mt-5">
        <Button href="#/home">Home</Button>
      </div>
    </div>
  );
}

// -----------------------
// Lightweight self-tests
// -----------------------
function runSelfTests() {
  // These run only in environments with a console and should never crash production.
  try {
    const requiredKeys = NAV.map((n) => n.key);
    const knownRoutes = new Set(["home", "watch", "founding-guests", "sponsors", "about", "contact"]);

    requiredKeys.forEach((k) => {
      if (!knownRoutes.has(k)) {
        throw new Error(`NAV route key not implemented: ${k}`);
      }
    });

    // Ensure page components exist (prevents the original Watch/FoundingGuests/Sponsors ReferenceErrors)
    if (typeof Home !== "function") throw new Error("Home component missing");
    if (typeof Watch !== "function") throw new Error("Watch component missing");
    if (typeof FoundingGuests !== "function") throw new Error("FoundingGuests component missing");
    if (typeof Sponsors !== "function") throw new Error("Sponsors component missing");
    if (typeof About !== "function") throw new Error("About component missing");
    if (typeof Contact !== "function") throw new Error("Contact component missing");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("THE STANDARD self-test failed:", e);
  }
}

export default function TheStandardWebsite() {
  const { key } = useHashRoute();

  // Run once on mount
  useEffect(() => {
    runSelfTests();
  }, []);

  const page = useMemo(() => {
    switch (key) {
      case "home":
        return <Home />;
      case "watch":
        return <Watch />;
      case "founding-guests":
        return <FoundingGuests />;
      case "sponsors":
        return <Sponsors />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return <NotFound />;
    }
  }, [key]);

  return (
    <PageShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
    </PageShell>
  );
}
