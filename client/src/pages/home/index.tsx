import { Button, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AddSynonym } from "@/components/features/AddSynonym";
import { SynonymsSearch } from "@/components/features/SynonymsSearch";
import { HomeLayout } from "@/layout/home";
import i18n from "@/localization/i18n.json";

export function HomePage() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<HomeLayout>
			<AddSynonym opened={opened} onClose={close} />
			<Stack gap="xl">
				<SynonymsSearch />
				<Group justify="center">
					<Button onClick={open} size="md">
						{i18n.UI_TEXT.ADD_SYNONYM_TITLE}
					</Button>
				</Group>
			</Stack>
		</HomeLayout>
	);
}
