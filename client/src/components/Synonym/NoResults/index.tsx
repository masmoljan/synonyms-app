import { Text } from "@mantine/core";
import { UI_TEXT } from "@/constants/constants";

interface NoResultsProps {
	searchTerm: string;
}

export default function NoResults({ searchTerm }: NoResultsProps) {
	const noSynonymsFound = UI_TEXT.NO_SYNONYMS_FOUND.replace("{searchTerm}", searchTerm)
	
	return (
		<Text c="dimmed" ta="center">
			{noSynonymsFound}
		</Text>
	);
}
