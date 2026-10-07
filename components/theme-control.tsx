"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { THEME_KEY, type ThemePreference } from "@/lib/theme";
import { iconButton } from "@/lib/portfolio-styles";
import { cn } from "@/lib/utils";

function applyTheme(preference: ThemePreference) {
  const dark =
    preference === "dark" ||
    (preference === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.themePreference = preference;
  window.dispatchEvent(new Event("joelyn-theme-change"));
}

function subscribe(onChange: () => void) {
  window.addEventListener("joelyn-theme-change", onChange);
  return () => window.removeEventListener("joelyn-theme-change", onChange);
}

function getSnapshot(): ThemePreference {
  const preference = document.documentElement.dataset.themePreference;
  return preference === "dark" || preference === "system" ? preference : "light";
}

export function ThemeControl() {
  const preference = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => "light" as ThemePreference,
  );
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (getSnapshot() === "system") applyTheme("system");
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_KEY || event.key === null) {
        applyTheme(
          event.newValue === "light" || event.newValue === "dark"
            ? event.newValue
            : "system",
        );
      }
    };
    const handleOutsideClick = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !detailsRef.current?.contains(event.target) &&
        detailsRef.current
      ) {
        detailsRef.current.open = false;
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.open = false;
        detailsRef.current.querySelector("summary")?.focus();
      }
    };
    media.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorage);
    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      media.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function selectTheme(value: ThemePreference) {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch {
      /* Keep the in-memory preference if storage is unavailable. */
    }
    applyTheme(value);
    if (detailsRef.current) {
      detailsRef.current.open = false;
      detailsRef.current.querySelector("summary")?.focus();
    }
  }

  return (
    <details className="theme-control relative z-20" ref={detailsRef}>
      <summary
        className={cn(iconButton, "list-none [&::-webkit-details-marker]:hidden")}
        aria-label="Choose color theme"
        title="Color theme"
      >
        <Moon className="dark:hidden" size={18} strokeWidth={1.4} aria-hidden="true" />
        <Sun className="hidden dark:block" size={18} strokeWidth={1.4} aria-hidden="true" />
      </summary>
      <div className="theme-options absolute top-12 right-0 w-[155px] border border-border bg-background p-2" role="group" aria-label="Color theme">
        {([
          { value: "light", label: "Light", Icon: Sun },
          { value: "dark", label: "Dark", Icon: Moon },
          { value: "system", label: "System", Icon: Monitor },
        ] as const).map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => selectTheme(value)}
            aria-pressed={preference === value}
            className="flex min-h-10 w-full items-center gap-3 border-0 bg-transparent px-3 py-2 text-left text-[12px] text-muted-foreground hover:bg-muted aria-pressed:text-accent"
          >
            <Icon size={15} strokeWidth={1.4} aria-hidden="true" />
            <span>{label}</span>
            <span className="ml-auto text-2xl leading-none" aria-hidden="true">
              {preference === value ? "·" : ""}
            </span>
          </button>
        ))}
      </div>
    </details>
  );
}
