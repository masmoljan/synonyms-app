import {
	useAddSynonymMutation,
	useSearchSynonymsQuery,
} from "@api/synonymsSlice";
import { Group, Modal, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import AddSynonymButton from "@/components/Button/AddSynonym";
import { UI_TEXT } from "@/constants/constants";
import { ERROR_MESSAGES } from "@/constants/messages";
import {
	showErrorNotification,
	showSuccessNotification,
} from "@/utils/notifications";
import { addSynonymSchema } from "@/validation/synonym";
import AddSynonymTagsInput from "../AddSynonymTagsInput";
import AddSynonymWordInput from "../AddSynonymWordInput";
import ExistingSynonymsAlert from "../ExistingSynonymsAlert";

function formatSuccessMessage(word: string, synonyms: string[]): string {
	const synonymsText =
		synonyms.length > 1
			? `${synonyms.slice(0, -1).join(", ")} and ${
					synonyms[synonyms.length - 1]
				}`
			: synonyms[0];

	return `${UI_TEXT.ADD_SUCCESS_PREFIX} ${
		synonyms.length > 1
			? UI_TEXT.SYNONYM_SUCCESS_PLURAL
			: UI_TEXT.SYNONYM_SUCCESS_SINGLE
	} "${synonymsText}" ${UI_TEXT.ADD_SUCCESS_FOR} "${word}"`;
}

interface AddSynonymProps {
	opened: boolean;
	onClose: () => void;
}

export default function AddSynonym({ opened, onClose }: AddSynonymProps) {
	const [addSynonym, { isLoading }] = useAddSynonymMutation();
	const [currentWord, setCurrentWord] = useState("");
	const [debouncedWord] = useDebouncedValue(currentWord, 500);

	const form = useForm({
		initialValues: {
			word: "",
			synonyms: [] as string[],
		},
		validate: (values) => {
			const zodValidation = zodResolver(addSynonymSchema)(values);

			const foundSynonyms = foundWordGroup?.synonyms || [];
			const duplicates = values.synonyms.filter((syn) =>
				foundSynonyms.some(
					(found: string) => found.toLowerCase() === syn.toLowerCase(),
				),
			);

			const duplicatesValidation =
				duplicates.length > 0
					? {
							synonyms: `${ERROR_MESSAGES.SYNONYMS_ALREADY_EXIST} ${duplicates.join(
								", ",
							)}`,
						}
					: {};

			return { ...zodValidation, ...duplicatesValidation };
		},
	});

	const { data: searchResults, isLoading: isSearching } =
		useSearchSynonymsQuery(
			{
				word: debouncedWord,
				skip: 0,
				limit: 1,
			},
			{
				skip: !debouncedWord,
			},
		);

	useEffect(() => {
		setCurrentWord(form.values.word);
	}, [form.values.word]);

	const handleSubmit = form.onSubmit(async (values) => {
		try {
			const result = await addSynonym(values).unwrap();
			const successMessage = formatSuccessMessage(result.word, result.synonyms);
			showSuccessNotification(successMessage);
			form.reset();
			setCurrentWord("");
			onClose();
		} catch {
			showErrorNotification(ERROR_MESSAGES.ADD_SYNONYM_ERROR);
		}
	});

	const foundWordGroup = searchResults?.results.find(
		(result: { word: string }) =>
			result.word.toLowerCase() === debouncedWord.toLowerCase(),
	);
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
				<AddSynonymButton isLoading={isLoading} />
			</form>
		</Modal>
	);
}
