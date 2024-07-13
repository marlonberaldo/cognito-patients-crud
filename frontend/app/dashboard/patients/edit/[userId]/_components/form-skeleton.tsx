import { Skeleton } from "@/components/ui/skeleton";

const FormSkeleton = () => (
  <div className="w-full space-y-4 rounded-lg bg-white">
    <div className="text-_gray-title border-b p-5">
      <h2 className="animate-pulse text-lg font-semibold">Dados pessoais</h2>
    </div>

    <div className="grid items-stretch justify-between gap-[50px] border-b p-8 md:grid-cols-2 lg:grid-cols-3 lg:flex-row xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[80px] w-full" />
      ))}
    </div>

    <div className="grid items-stretch justify-between gap-[50px] p-8 md:grid-cols-2 lg:grid-cols-3 lg:flex-row xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[80px] w-full" />
      ))}
    </div>
  </div>
);

export default FormSkeleton;
