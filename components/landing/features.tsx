import {
  GitMergeIcon,
  MinusIcon,
  SearchIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { GitHubIcon } from "../icons/github";
import { CodePreview } from "../code-preview";
import { Identicon1, Identicon2 } from "../icons/identicons";

function FeatureCard({
  className,
  banner,
  title,
  description,
}: {
  className?: string;
  banner: React.ReactNode;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col h-72 bg-card border border-border rounded-lg relative overflow-hidden shadow-sm dark:shadow-none group",
        className
      )}
    >
      <div className="size-full overflow-hidden flex items-end justify-center select-none relative group-hover:scale-[1.02] transition-transform duration-300">
        {banner}
      </div>
      <div className="absolute bottom-0 bg-gradient-to-t from-card via-card h-36 w-full" />
      <div className="flex flex-col gap-1 p-4 absolute bottom-0 z-10">
        <h3 className="font-semibold text-xl inline-flex gap-2.5 items-center">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const code = `\`\`\`js
function chunkArray(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

const numbers = [1, 2, 3, 4, 5, 6, 7];
chunkArray(numbers, 3); // [[1, 2, 3], [4, 5, 6], [7]]
\`\`\``;

function OpenSourceBanner() {
  return (
    <div className="bg-muted rounded-md size-full flex flex-col gap-1 text-xs text-muted-foreground overflow-hidden w-[calc(100%-4rem)] h-[calc(100%-2rem)] border border-border dark:border-input">
      <div className="bg-accent w-full p-2 flex items-center justify-between border-b border-border dark:border-input">
        <span>super-cool-snippet.mdx</span>
        <span className="px-2 py-0.5 bg-card text-card-foreground rounded inline-flex gap-1 items-center border border-border dark:border-none">
          <GitHubIcon className="size-3 fill-card-foreground" /> Submit Snippet
        </span>
      </div>
      <div className="flex flex-col pt-2 gap-1.5">
        {new Array(7)
          .fill(0)
          .map(() => randomNumber(50, 300))
          .map((v, i) => (
            <span
              className="flex items-center gap-3 font-mono ml-3"
              /* biome-ignore lint/suspicious/noArrayIndexKey: there is nothing else that could be used as a key */
              key={i}
            >
              <span className="text-muted-foreground/40">{i + 1}</span>
              <span
                className="h-3 rounded-full bg-muted-foreground/10 dark:bg-input"
                style={{
                  width: v,
                }}
              />
            </span>
          ))}
      </div>
    </div>
  );
}

function FindSnippetsFastBanner() {
  return (
    <div className="size-full flex flex-col gap-1 text-muted-foreground">
      <div className="absolute -rotate-3 top-6 left-8 bg-muted px-4 py-3 rounded-md text-sm w-48 flex items-center gap-1 z-10 border border-border dark:border-input">
        <div className="flex gap-2 items-center">
          <SearchIcon className="size-4" />
          chunk arr
        </div>
        <div className="h-4 w-px bg-muted-foreground" />
      </div>
      <CodePreview
        className="bg-muted py-2 rounded-md absolute top-16 left-3 rotate-3 border border-border dark:border-input text-xs [&>figure>pre>code>span]:!pl-2"
        code={code}
      />
    </div>
  );
}

function CodeEditorIntegrationBanner() {
  return (
    <div className="bg-muted rounded-md size-full flex flex-col gap-1 text-xs text-muted-foreground overflow-hidden w-[calc(100%-4rem)] h-[calc(100%-2rem)] border border-border dark:border-input">
      <div className="bg-accent w-full p-2 flex items-center justify-between border-b border-border dark:border-input relative">
        <div className="flex items-center gap-2">
          <span className="size-3 bg-muted-foreground/30 rounded" />
          <div className="flex gap-1">
            <span className="h-2 w-4 bg-muted-foreground/30 rounded-full" />
            <span className="h-2 w-3 bg-muted-foreground/30 rounded-full" />
            <span className="h-2 w-6 bg-muted-foreground/30 rounded-full" />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <MinusIcon className="size-3" />
          <SquareIcon className="size-2.5" />
          <XIcon className="size-3" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-44 flex flex-col gap-1 [&>div]:bg-accent [&>div]:shadow-sm [&>div]:dark:shadow-none [&>div]:border [&>div]:border-border [&>div]:dark:border-input [&>div]:rounded-sm [&>div]:py-1">
          <div className="flex items-center gap-1.5 px-2">
            <SearchIcon className="size-3" /> chunk arr
          </div>
          <div className="px-1">
            <div className="p-1.5 rounded-sm bg-muted-foreground/10 gap-1 flex flex-col">
              <span className="h-2 w-12 bg-muted-foreground/20 rounded-full" />
              <span className="h-1 w-full bg-muted-foreground/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Message({
  className,
  messageClassName,
  icon,
  message,
}: {
  className?: string;
  messageClassName?: string;
  icon: React.ReactNode;
  message: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-10 text-xs flex gap-2 items-center text-foreground/80 [&>*]:shadow-sm [&>*]:dark:shadow-none",
        className
      )}
    >
      {icon}
      <div
        className={cn(
          "bg-muted rounded-sm px-2 py-0.5 border border-border dark:border-input",
          messageClassName
        )}
      >
        {message}
      </div>
    </div>
  );
}

function CommunityDrivenBanner() {
  return (
    <>
      <Message
        className="md:top-8 top-4 md:left-6 left-6 -rotate-[4deg]"
        icon={<Identicon1 className="size-8" />}
        message="Looks good to me!"
      />
      <Message
        className="md:top-12 top-16 right-6 md:rotate-6 rotate-3"
        icon={<Identicon2 className="size-8" />}
        message="Yup, looks good, we should add this."
      />
      <Message
        className="top-32 md:left-20 left-4 -rotate-1"
        icon={
          <GitMergeIcon className="size-8 p-1.5 rounded-full bg-purple-200 dark:bg-purple-950 border border-purple-300 dark:border-purple-900" />
        }
        message="Pull request successfully merged and closed"
        messageClassName="bg-purple-200 dark:bg-purple-950 border-purple-300 dark:border-purple-900 text-purple-950 dark:text-purple-200"
      />
      <div className="bg-muted rounded-md size-full flex flex-col gap-1 text-xs text-muted-foreground overflow-hidden md:w-[calc(100%-12rem)] w-[calc(100%-4rem)] md:h-[calc(100%-4rem)] h-[calc(100%-2rem)] border border-border dark:border-input py-2">
        <CodePreview className="[&>figure>pre>code>span]:!pl-2" code={code} />
      </div>
    </>
  );
}

export function Features() {
  return (
    <section
      className="mt-16 max-w-5xl w-full mx-auto flex flex-col gap-16"
      id="features"
    >
      <div className="flex flex-col gap-2 items-center justify-center mx-auto max-w-md text-center">
        <h2 className="text-3xl font-semibold">Features</h2>
        <p className="text-muted-foreground">
          Explore the powerful features that make SnipNest an awesome platform.
        </p>
      </div>
      <div className="grid lg:grid-cols-7 grid-cols-1 gap-4">
        <FeatureCard
          className="lg:col-span-4 col-span-1"
          banner={<OpenSourceBanner />}
          title="Open-source"
          description="Easily fork, edit, and submit code snippets. Share your work with the community in just a few clicks."
        />
        <FeatureCard
          className="lg:col-span-3 col-span-1"
          banner={<FindSnippetsFastBanner />}
          title="Find Snippets Fast"
          description="Quickly filter through a vast collection of code snippets. Get the perfect code for your project every time."
        />
        <FeatureCard
          className="lg:col-span-3 col-span-1"
          banner={<CodeEditorIntegrationBanner />}
          title="Code Editor Integration"
          description="Access and insert your saved snippets directly within your code editor. Boost your productivity without leaving your workspace."
        />
        <FeatureCard
          className="lg:col-span-4 col-span-1"
          banner={<CommunityDrivenBanner />}
          title="Community Driven"
          description="Help improve the platform by contributing snippets and collaborating with other developers."
        />
      </div>
    </section>
  );
}
