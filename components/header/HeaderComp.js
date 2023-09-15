"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const HeaderComp = () => {
  const { theme, setTheme } = useTheme();
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/submit",
      label: "Submit",
    },
  ];

  return (
    <header className="sm:flex sm:justify-between pt-3 pb-0 px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="relative px-4 flex h-16 items-center w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <HamburgerMenuIcon className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      href={route.href}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center justify-between">
            <nav className="mx-6 space-x-4 lg:space-x-6 hidden md:block">
              {routes.map((route, i) => (
                <Link
                  key={i}
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              ))}
            </nav>
            <div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Theme"
                className="mr-6"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle Theme</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComp;
