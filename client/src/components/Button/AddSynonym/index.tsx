import { Button } from '@mantine/core';

interface AddSynonymButtonProps {
  isLoading: boolean;
}

export default function AddSynonymButton({ isLoading }: AddSynonymButtonProps) {
  return (
    <Button type="submit" loading={isLoading} fullWidth>
      Add Synonym
    </Button>
  );
}
