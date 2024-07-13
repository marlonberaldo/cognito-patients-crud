import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRow = () => (
  <div className="flex w-full items-center justify-between border-b p-4">
    <Skeleton className="h-6 w-[250px] rounded-sm" />
    <Skeleton className="h-6 w-[200px] rounded-sm" />
    <Skeleton className="h-6 w-[200px] rounded-sm" />

    <div className="flex items-center gap-x-4">
      <Skeleton className="flex size-8 justify-end rounded-sm" />
      <Skeleton className="flex size-8 justify-end rounded-sm" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 3 }) => (
  <div className="flex w-full flex-col items-start rounded-lg bg-white">
    <div className="flex w-full items-center justify-between border-b p-4 text-sm text-white/70">
      <Skeleton className="!bg-muted-foreground/60 h-4 w-[100px]" />
      <Skeleton className="!bg-muted-foreground/60 h-4 w-[100px]" />
      <Skeleton className="!bg-muted-foreground/60 h-4 w-[100px]" />
      <Skeleton className="!bg-muted-foreground/60 h-4 w-[100px]" />
    </div>

    {Array.from({ length: rows }, (_, index) => (
      <SkeletonRow key={index} />
    ))}
  </div>
);