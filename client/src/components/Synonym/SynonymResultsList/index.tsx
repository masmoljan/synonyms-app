import type { Synonym } from '../../../types';
import SynonymResult from '@components/Synonym/SynonymResult';

interface SynonymResultsListProps {
  results: Synonym[];
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
