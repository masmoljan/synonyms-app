import { Stack, Text, Title, Box, Group } from '@mantine/core';
import { UI_TEXT } from '@/constants/constants';

export default function Header() {
  return (
    <Box
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      h="100%"
      w="100%"
      style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.5)' }}
    >
      <Stack h="100%" justify="center" align="center" gap="xs">
        <Group gap="xs" align="center">
          <Title order={2} c="white" fw={700}>
            {UI_TEXT.APP_NAME}
          </Title>
        </Group>
        <Text c="rgba(255,255,255,0.9)" size="sm" fw={500}>
          {UI_TEXT.APP_TAGLINE}
        </Text>
      </Stack>
    </Box>
  );
}
