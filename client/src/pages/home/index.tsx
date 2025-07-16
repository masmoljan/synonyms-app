import { Button, Group, Stack } from "@mantine/core";
import { SynonymsSearch } from "@/components/features/SynonymsSearch";
import { HomeLayout } from "@/layout/home";
import { useDisclosure } from "@mantine/hooks";
import { AddSynonym } from "@/components/features/AddSynonym";
import { UI_TEXT } from "@/constants/constants";

export function HomePage() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<HomeLayout>
			<AddSynonym opened={opened} onClose={close} />
			<Stack gap="xl">
				<SynonymsSearch />
				<Group justify="center">
					<Button onClick={open} size="md">
						{UI_TEXT.ADD_SYNONYM_TITLE}
					</Button>
				</Group>
			</Stack>
		</HomeLayout>
	);
}
