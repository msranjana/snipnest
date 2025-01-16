import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";

const sansFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

const monoFont = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

import { getGroupedSnippets } from "@/lib/snippets";
import { cn, getSnippetList } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme/provider";
import { Navbar } from "@/components/navbar";
import { SearchProvider } from "@/components/search/provider";
import { SearchDialog } from "@/components/search/dialog";

import "./globals.css";
import "./highlight.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://snipnest.dev"),
  title: "SnipNest - Open-source code snippet collection",
  description:
    "Need code that works? Grab a snippet. Made something cool? Share it back. Simple as that.",
  alternates: {
    canonical: "https://snipnest.dev",
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon-light.png",
        href: "/favicon-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.png",
        href: "/favicon-dark.png",
      },
    ],
  },
  openGraph: {
    tags: [
      "snippets",
      "code",
      "community",
      "share",
      "tool",
      "useful",
      "development",
    ],
    images: [
      {
        url: "/banner.png",
        href: "/banner.png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#f66b15",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const groupedSnippets = await getGroupedSnippets();
  const snippetList = getSnippetList(groupedSnippets);

  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "antialiased bg-zinc-300 dark:bg-black",
          sansFont.className,
          monoFont.variable
        )}
      >
        <SearchProvider>
          <ThemeProvider>
            <div
              className="flex flex-col bg-background text-foreground"
              data-vaul-drawer-wrapper=""
            >
              <Navbar />
              <div className="max-w-7xl min-h-screen mx-auto w-full 2xl:px-0 px-4 mt-12">
                {children}
                <SearchDialog snippetList={snippetList} />
              </div>
            </div>
          </ThemeProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
