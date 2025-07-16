import { AppShell, Container, Box } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { Header } from "@/components/composite/Header";

export function HomeLayout({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: 80 }} withBorder={false}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Box pt="xl">
          <Container size="sm" p="xl">
            {children}
          </Container>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
