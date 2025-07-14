import { Paper, Group, Text, Badge, List } from "@mantine/core";
import type { Synonym } from "../../../types/synonym";

interface SynonymResultProps {
	result: Synonym;
}

export default function SynonymResult({ result }: SynonymResultProps) {
	return (
		<Paper mb="md" p="xs" withBorder>
			<Group mb="xs">
				<Text fw={500}>Word:</Text>
				<Badge size="lg">{result.word}</Badge>
			</Group>
			<Text fw={500} mb="xs">
				Synonyms:
			</Text>
			<List listStyleType="none" spacing="md">
				<List.Item>
					{result.synonyms.map((synonym, synIndex) => (
						<Badge
							key={synIndex}
							color="blue"
							variant="light"
							style={{ margin: "0 8px 8px 0" }}
						>
							{synonym}
						</Badge>
					))}
				</List.Item>
			</List>
		</Paper>
	);
}
