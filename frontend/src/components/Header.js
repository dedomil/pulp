"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();

  function handleThemeChange() {
    setTheme(theme == "light" ? "dark" : "light");
  }

  return (
    <header className="bg-background border-b border-input">
      <div className="flex container justify-between mx-auto px-4 py-4">
        <Link href={"/"}>
          <h1
            className="text-3xl font-black relative group"
            {...(pathname == "/" ? { onClick: handleThemeChange } : {})}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700 opacity-75 group-hover:opacity-100 transition-opacity duration-300 bg-clip-text text-transparent animate-gradient">
              pulp
            </span>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-stone-900 dark:from-stone-300 dark:to-stone-100 group-hover:opacity-0 transition-opacity duration-300 inline-block animate-bounce-hover">
              pulp
            </span>
          </h1>
        </Link>
        <Link href={"/me"}>
          <Button className="text-base font-bold">my pulps</Button>
        </Link>
      </div>
    </header>
  );
}
