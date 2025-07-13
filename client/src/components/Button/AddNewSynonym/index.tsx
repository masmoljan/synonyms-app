import { Button, Group } from '@mantine/core';

export default function AddNewSynonymButton({ open }: { open: () => void }) {
  return (
    <Group justify="center">
      <Button onClick={open} size="md">
        Add New Synonym
      </Button>
    </Group>
  );
}
