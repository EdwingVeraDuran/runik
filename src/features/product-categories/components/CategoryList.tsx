import { cn } from "@/lib/utils";

type CategoryListProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CategoryList({
  children,
  className,
}: CategoryListProps) {
  return (
    <div
      className={cn(
        "flex flex-col divide-y overflow-hidden rounded-md border border-border bg-card shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
