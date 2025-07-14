import { Stack } from "@mantine/core";
import SynonymSearch from "@components/Synonym/SynonymsSearch";
import HomeLayout from "@layout/home";
import { useDisclosure } from "@mantine/hooks";
import AddSynonym from "@components/Synonym/AddSynonym";
import AddNewSynonymButton from "@/components/Button/AddNewSynonym";

export default function HomePage() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<HomeLayout>
			<AddSynonym opened={opened} onClose={close} />
			<Stack gap="xl">
				<SynonymSearch />
				<AddNewSynonymButton open={open} />
			</Stack>
		</HomeLayout>
	);
}
