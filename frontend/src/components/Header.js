"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Merienda } from "next/font/google";
import { usePathname } from "next/navigation";

const fontLogo = Merienda({
  weight: "variable",
  subsets: ["latin"],
});

export default function Header() {
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();

  function handleThemeChange() {
    setTheme(theme == "light" ? "dark" : "light");
  }

  return (
    <header className="bg-background border-b border-input">
      <div className="flex container items-center justify-between mx-auto px-4 py-4">
        <Link href={"/"}>
          <h1
            className={`text-2xl font-bold ${fontLogo.className}`}
            {...(pathname == "/" ? { onClick: handleThemeChange } : {})}
          >
            pulp
          </h1>
        </Link>
        <Link href={"/me"}>
          <Button variant="outline" className="font-bold">
            my pulps
          </Button>
        </Link>
      </div>
    </header>
  );
}
