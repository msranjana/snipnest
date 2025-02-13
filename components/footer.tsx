import Link from "next/link";

import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-t-border py-8 flex items-center 2xl:px-0 px-4 bg-background z-50 mt-24">
      <div className="max-w-7xl mx-auto w-full flex md:flex-row flex-col md:justify-between justify-start md:gap-0 gap-8">
        <div className="flex flex-col gap-1.5">
          <Link
            className="font-semibold inline-flex text-lg gap-2 items-center hover:opacity-90 transition-opacity"
            href="/"
            title={`SnipNest v${process.env.VERSION}`}
          >
            <Logo />
            SnipNest
          </Link>
          <p className="text-muted-foreground text-sm">
            Open-source code snippet collection
          </p>
        </div>
        <div className="flex flex-col gap-8 md:items-end items-start">
          <div className="flex sm:flex-row flex-col sm:gap-24 gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                SnipNest
              </h3>
              <div className="flex flex-col gap-1">
                <Link
                  className="hover:text-foreground/90 transition-colors"
                  href="https://dev.to/itsbrunodev/what-i-learned-while-building-a-code-snippet-collection-4hm2"
                  target="_blank"
                >
                  About
                </Link>
                <Link
                  className="hover:text-foreground/90 transition-colors"
                  href="https://github.com/itsbrunodev/snipnest"
                  target="_blank"
                >
                  Repository
                </Link>
                <Link
                  className="hover:text-foreground/90 transition-colors"
                  href="https://github.com/itsbrunodev/snipnest/blob/main/LICENSE.md"
                  target="_blank"
                >
                  License
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                Docs
              </h3>
              <div className="flex flex-col gap-1">
                <Link
                  className="hover:text-foreground/90 transition-colors"
                  href="https://github.com/itsbrunodev/snipnest/blob/main/API.md"
                  target="_blank"
                >
                  API
                </Link>
                <Link
                  className="hover:text-foreground/90 transition-colors"
                  href="https://github.com/itsbrunodev/snipnest/blob/main/CONTRIBUTING.md"
                  target="_blank"
                >
                  Contributing
                </Link>
              </div>
            </div>
          </div>
          <span className="text-muted-foreground [&>a]:text-foreground [&>a]:underline [&>a]:transition-colors text-sm mb-px">
            Built by{" "}
            <Link
              className="hover:text-foreground/90"
              href="https://itsbruno.dev"
              target="_blank"
            >
              Bruno
            </Link>{" "}
            and{" "}
            <Link
              className="hover:text-foreground/90"
              href="https://github.com/itsbrunodev/snipnest/graphs/contributors"
              target="_blank"
            >
              the contributors
            </Link>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
