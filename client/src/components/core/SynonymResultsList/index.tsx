import { SynonymResult } from "@/components/core/SynonymResult";
import type { WordSynonym } from "@/types/synonym";

interface SynonymResultsListProps {
	results: WordSynonym[];
}

export function SynonymResultsList({ results }: SynonymResultsListProps) {
	return (
		<>
			{results.map((wordSynonymPair: WordSynonym, index: number) => (
				<SynonymResult
					key={`${wordSynonymPair.word}-${index}`}
					result={wordSynonymPair}
				/>
			))}
		</>
	);
}
