import SynonymResult from "@components/Synonym/SynonymResult";
import type { WordSynonym } from "../../../types";

interface SynonymResultsListProps {
	results: WordSynonym[];
}

export default function SynonymResultsList({
	results,
}: SynonymResultsListProps) {
	return (
		<>
			{results.map((wordSynonymPair: Synonym, index: number) => (
				<SynonymResult key={index} result={wordSynonymPair} />
			))}
		</>
	);
}
