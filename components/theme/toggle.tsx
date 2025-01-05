import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      className="size-4 hover:opacity-80 transition-opacity"
      type="button"
      onClick={() => {
        if (resolvedTheme === "dark") setTheme("light");
        else setTheme("dark");
      }}
    >
      <SunIcon className="size-4 block dark:hidden" />
      <MoonIcon className="size-4 hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
