import { Paper, Group, Skeleton, Stack } from '@mantine/core';

export default function SynonymResultSkeleton() {
  return (
    <Paper mb="md" p="xs" withBorder>
      <Group mb="xs">
        <Skeleton height={16} width={40} />
        <Skeleton height={32} width={80} radius="xl" animate />
      </Group>

      <Skeleton height={16} width={70} mb="xs" />

      <Stack gap="xs">
        <Group gap="xs">
          <Skeleton height={24} width={60} radius="xl" />
          <Skeleton height={24} width={75} radius="xl" />
          <Skeleton height={24} width={55} radius="xl" />
        </Group>
        <Group gap="xs">
          <Skeleton height={24} width={80} radius="xl" />
          <Skeleton height={24} width={65} radius="xl" />
        </Group>
      </Stack>
    </Paper>
  );
}
