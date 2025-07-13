import { Alert, Group, Badge, Text } from '@mantine/core';

interface ExistingSynonymsAlertProps {
  synonyms: string[];
}

export default function ExistingSynonymsAlert({
  synonyms,
}: ExistingSynonymsAlertProps) {
  return (
    <Alert variant="light" color="blue" title="Existing synonyms found">
      <Group gap="xs">
        {synonyms.map((synonym, index) => (
          <Badge key={index} variant="light" color="blue">
            {synonym}
          </Badge>
        ))}
      </Group>
      <Text size="sm" mt="xs">
        These synonyms are already in your list.
      </Text>
    </Alert>
  );
}
