import { techSection } from "@/data/content";

export function TechMarquee() {
  const items = techSection.items;
  return (
    <section aria-label={techSection.label} className="border-y border-border bg-surface/40 py-8">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-subtle">{techSection.label}</p>
      <div className="marquee-mask overflow-hidden">
        <ul className="flex w-max animate-marquee gap-12 pr-12 motion-reduce:animate-none hover:[animation-play-state:paused]">
          {[...items, ...items].map((item, i) => (
            <li
              key={`${item}-${i}`}
              aria-hidden={i >= items.length}
              className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-white/35 transition-colors hover:text-white/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
