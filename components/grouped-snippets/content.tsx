"use client";

import { useParams, usePathname } from "next/navigation";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

import { LANGUAGES } from "@/lib/constants";
import { cn, toTitleCase } from "@/lib/utils";
import type { Snippet } from "@/lib/snippets";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function SidebarMargin({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:ml-80 ml-0 w-full lg:pl-6 pl-0 py-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function GroupedSnippetsContent({
  snippetList,
  children,
}: {
  snippetList: Snippet[];
  children: React.ReactNode;
}) {
  const params = useParams<Awaited<SnippetParams["params"]>>();
  const pathname = usePathname().split("/").filter(Boolean);

  const languageLink = `/snippets/${params.language}`;
  const categoryLink = `/snippets/${params.language}/${params.category}`;

  const languageName = LANGUAGES.find(
    (language) => language.value === params.language
  )?.name!;
  const categoryName = toTitleCase(params.category || "");

  const snippet = snippetList.find((snippet) => snippet.name === params.name);

  const snippetName = snippet?.metadata.name!;

  return (
    <SidebarMargin>
      <Breadcrumb>
        <BreadcrumbList>
          {pathname.length > 1 && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/snippets">Snippets</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            {pathname.length === 1 ? (
              <BreadcrumbPage>{languageName}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={languageLink}>
                {languageName}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {pathname.length > 2 && <BreadcrumbSeparator />}
          <BreadcrumbItem>
            {pathname.length === 3 ? (
              <BreadcrumbPage>{categoryName}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={categoryLink}>
                {categoryName}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {pathname.length === 4 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{snippetName}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-4">{children}</div>
    </SidebarMargin>
  );
}
