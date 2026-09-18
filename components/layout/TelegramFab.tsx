"use client";

import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { telegramUrl } from "@/data/site";
import { cn } from "@/lib/utils";

/** Плавающая кнопка Telegram на мобильных. Прячется на первом экране и над формой заявки. */
export function TelegramFab() {
  const [pastHero, setPastHero] = useState(false);
  const [overForm, setOverForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = ["contact"].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setOverForm(visible.size > 0);
    });
    targets.forEach((t) => observer.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const shown = pastHero && !overForm;

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={cn(
        "fixed bottom-4 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-accent text-accent-fg shadow-[0_10px_30px_-5px_rgb(198_244_50/0.5)] transition-[opacity,transform] duration-300 md:hidden",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <Send className="size-6 -translate-x-px translate-y-px" aria-hidden="true" />
    </a>
  );
}
