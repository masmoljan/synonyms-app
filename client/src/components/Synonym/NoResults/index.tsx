import { Text } from "@mantine/core";

interface NoResultsProps {
	searchTerm: string;
}

export default function NoResults({ searchTerm }: NoResultsProps) {
	return (
		<Text c="dimmed" ta="center">
			No synonyms found for word "{searchTerm}"
		</Text>
	);
}
