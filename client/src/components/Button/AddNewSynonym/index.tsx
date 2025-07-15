import { Button, Group } from "@mantine/core";
import { UI_TEXT } from "@/constants/constants";

export default function AddNewSynonymButton({ open }: { open: () => void }) {
	return (
		<Group justify="center">
			<Button onClick={open} size="md">
				{UI_TEXT.ADD_SYNONYM_TITLE}
			</Button>
		</Group>
	);
}
