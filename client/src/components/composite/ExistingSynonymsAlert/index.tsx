import { Alert, Badge, Group, Text } from "@mantine/core";
import i18n from "@/localization/i18n.json"

interface ExistingSynonymsAlertProps {
	synonyms: string[];
}

export function ExistingSynonymsAlert({
	synonyms,
}: ExistingSynonymsAlertProps) {
	return (
		<Alert variant="light" color="blue" title={i18n.UI_TEXT.EXISTING_SYNONYMS_FOUND}>
			<Group gap="xs">
				{synonyms.map((synonym, index) => (
					<Badge key={`${synonym}-${index}`} variant="light" color="blue">
						{synonym}
					</Badge>
				))}
			</Group>
			<Text size="sm" mt="xs">
				{i18n.UI_TEXT.SYNONYMS_ALREADY_IN_LIST}
			</Text>
		</Alert>
	);
}
