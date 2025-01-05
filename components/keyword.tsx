export function Keyword({ keyword }: { keyword: string }) {
  return (
    <div className="text-sm text-muted-foreground bg-muted border border-border rounded-md py-0.5 px-2">
      {keyword}
    </div>
  );
}
