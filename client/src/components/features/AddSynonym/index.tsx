import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { UI_TEXT } from "@/constants/constants";
import { AddSynonymTagsInput } from "@/components/core/AddSynonymTagsInput";
import { AddSynonymWordInput } from "@/components/core/AddSynonymWordInput";
import { ExistingSynonymsAlert } from "@/components/composite/ExistingSynonymsAlert";
import { useAddSynonym } from "@/hooks/useAddSynonym";

interface AddSynonymProps {
	opened: boolean;
	onClose: () => void;
}

export function AddSynonym({ opened, onClose }: AddSynonymProps) {
	const {
		form,
		isLoading,
		isSearching,
		foundWordGroup,
		setCurrentWord,
		handleSubmit,
	} = useAddSynonym(onClose);

	useEffect(() => {
		setCurrentWord(form.values.word);
	}, [form.values.word]);

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={
				<Group gap="sm" align="center">
					<Text fw={600} size="lg">
						{UI_TEXT.ADD_SYNONYM_TITLE}
					</Text>
				</Group>
			}
			centered
			radius="lg"
			shadow="xl"
			size="md"
		>
			<form onSubmit={handleSubmit}>
				<Stack gap="md" mb="md">
					<AddSynonymWordInput
						form={form}
						isSearching={isSearching}
						onWordChange={setCurrentWord}
					/>
					{foundWordGroup && foundWordGroup.synonyms.length > 0 && (
						<ExistingSynonymsAlert synonyms={foundWordGroup.synonyms} />
					)}
					<AddSynonymTagsInput form={form} />
				</Stack>
				<Button type="submit" loading={isLoading} fullWidth>
					{UI_TEXT.ADD_SYNONYM_BUTTON}
				</Button>
			</form>
		</Modal>
	);
}
