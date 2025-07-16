import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ErrorLayout } from "@/layout/error";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <ErrorLayout>
      <Container size="sm" py="xl" style={{ textAlign: "center" }}>
        <Stack gap="lg">
          <Title order={1} size="3rem" c="blue">
            404
          </Title>
          <Title order={2}>Page Not Found</Title>
          <Text size="lg" c="dimmed">
            The page you are looking for doesn't exist or has been moved.
          </Text>
          <Group justify="center" mt="xl">
            <Button size="md" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Group>
        </Stack>
      </Container>
    </ErrorLayout>
  );
}
