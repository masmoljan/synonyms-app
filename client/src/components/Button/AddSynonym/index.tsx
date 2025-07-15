import { Button } from "@mantine/core";
import { UI_TEXT } from "@/constants/constants";

interface AddSynonymButtonProps {
	isLoading: boolean;
}

export default function AddSynonymButton({ isLoading }: AddSynonymButtonProps) {
	return (
		<Button type="submit" loading={isLoading} fullWidth>
			{UI_TEXT.ADD_SYNONYM_BUTTON}
		</Button>
	);
}
