import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Extensions - SnipNest",
  description:
    "Integration with your favorite tools to make SnipNest available when you need it most.",
};

export default function ExtensionsPage() {
  const extensions = [
    {
      name: "SnipNest for Visual Studio Code",
      link: "https://marketplace.visualstudio.com/items?itemName=itsbrunodev.snipnest",
      icon: "https://raw.githubusercontent.com/itsbrunodev/snipnest/refs/heads/main/assets/vscode.png",
    },
  ];

  return (
    <div className="mt-16 max-w-2xl mx-auto flex flex-col gap-16">
      <div className="flex flex-col gap-4 items-center justify-center mx-auto max-w-md text-center">
        <h1 className="text-4xl font-semibold">Extensions</h1>
        <p className="text-muted-foreground">
          Integration with your favorite tools to make SnipNest available when
          you need it most.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {extensions.map((extension) => (
          <Link
            href={extension.link}
            target="_blank"
            key={extension.name}
            className="flex lg:flex-row flex-col w-full items-center justify-between group p-4 lg:gap-0 gap-4 bg-card rounded-md border border-border"
          >
            <div className="flex gap-4 items-center">
              <Image
                className="size-8 lg:inline-flex hidden"
                src={extension.icon}
                alt={extension.name}
                width={32}
                height={32}
                draggable={false}
              />
              <h2 className="font-medium lg:text-lg text-xl group-hover:underline">
                {extension.name}
              </h2>
            </div>
            <Button
              className="lg:w-fit w-full min-w-24"
              variant="secondary"
            >
              Install
            </Button>
          </Link>
        ))}
        <p className="text-muted-foreground text-center text-sm mt-6">
          Is your favorite tool missing? Help us by{" "}
          <Link
            className="underline hover:opacity-90 transition-opacity"
            href="https://github.com/itsbrunodev/snipnest/issues/new?assignees=&labels=enhancement%2Cfeature&projects=&template=features.yml&title=%5Bfeature%5D+-+"
            target="_blank"
          >
            submitting an issue
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
