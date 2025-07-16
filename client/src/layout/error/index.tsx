import { Center, Stack } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function ErrorLayout({ children }: PropsWithChildren) {
	return (
		<Center h="100vh">
			<Stack align="center">{children}</Stack>
		</Center>
	);
}
