import { Badge, Group, List, Paper, Text } from "@mantine/core";
import { UI_TEXT } from "@/constants/constants";
import type { WordSynonym } from "../../../types/synonym";

interface SynonymResultProps {
	result: WordSynonym;
}

export function SynonymResult({ result }: SynonymResultProps) {
	return (
		<Paper mb="md" p="xs" withBorder>
			<Group mb="xs">
				<Text fw={500}>{UI_TEXT.WORD_LABEL}</Text>
				<Badge size="lg">{result.word}</Badge>
			</Group>
			<Text fw={500} mb="xs">
				{UI_TEXT.SYNONYMS_LABEL}
			</Text>
			<List listStyleType="none" spacing="md">
				<List.Item>
					{result.synonyms.map((synonym, synIndex) => (
						<Badge
							key={`${synonym}-${synIndex}`}
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
