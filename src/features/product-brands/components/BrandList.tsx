import { cn } from "@/lib/utils";

type BrandListProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BrandList({ children, className }: BrandListProps) {
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
