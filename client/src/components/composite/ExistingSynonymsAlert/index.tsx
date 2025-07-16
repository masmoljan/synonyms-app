import { Alert, Badge, Group, Text } from "@mantine/core";
import { UI_TEXT } from "@/constants/constants";

interface ExistingSynonymsAlertProps {
	synonyms: string[];
}

export function ExistingSynonymsAlert({
	synonyms,
}: ExistingSynonymsAlertProps) {
	return (
		<Alert variant="light" color="blue" title={UI_TEXT.EXISTING_SYNONYMS_FOUND}>
			<Group gap="xs">
				{synonyms.map((synonym, index) => (
					<Badge key={`${synonym}-${index}`} variant="light" color="blue">
						{synonym}
					</Badge>
				))}
			</Group>
			<Text size="sm" mt="xs">
				{UI_TEXT.SYNONYMS_ALREADY_IN_LIST}
			</Text>
		</Alert>
	);
}
