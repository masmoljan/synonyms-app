import { Text } from "@mantine/core";
import i18n from "@/localization/i18n.json"

interface NoResultsProps {
	searchTerm: string;
}

export function NoResults({ searchTerm }: NoResultsProps) {
	const noSynonymsFound = i18n.UI_TEXT.NO_SYNONYMS_FOUND.replace(
		"{searchTerm}",
		searchTerm,
	);

	return (
		<Text c="dimmed" ta="center">
			{noSynonymsFound}
		</Text>
	);
}
