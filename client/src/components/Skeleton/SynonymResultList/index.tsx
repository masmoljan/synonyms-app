import SynonymResultSkeleton from "../SynonymResult";

interface SynonymResultsListSkeletonProps {
	count?: number;
}

export default function SynonymResultsListSkeleton({
	count = 5,
}: SynonymResultsListSkeletonProps) {
	return (
		<>
			{Array.from({ length: count }, (_, index) => (
				<SynonymResultSkeleton key={index} />
			))}
		</>
	);
}
