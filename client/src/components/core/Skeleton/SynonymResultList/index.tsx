import { SynonymResultSkeleton } from "@/components/core/Skeleton/SynonymResult";
import { DEFAULT_PAGINATION_LIMIT } from "@/constants/constants";

interface SynonymResultsListSkeletonProps {
  count?: number;
}

export function SynonymResultsListSkeleton({
  count = DEFAULT_PAGINATION_LIMIT,
}: SynonymResultsListSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SynonymResultSkeleton key={index} />
      ))}
    </>
  );
}
