import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { ExistingSynonymsAlert } from "@/components/composite/ExistingSynonymsAlert";
import { AddSynonymTagsInput } from "@/components/core/AddSynonymTagsInput";
import { AddSynonymWordInput } from "@/components/core/AddSynonymWordInput";
import { useAddSynonym } from "@/hooks/useAddSynonym";
import i18n from "@/localization/i18n.json";

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
						{i18n.UI_TEXT.ADD_SYNONYM_TITLE}
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
					{i18n.UI_TEXT.ADD_SYNONYM_BUTTON}
				</Button>
			</form>
		</Modal>
	);
}
