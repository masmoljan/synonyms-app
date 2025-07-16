import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import {
	useAddSynonymMutation,
	useSearchSynonymsQuery,
} from "@/api/synonymsSlice";
import i18n from "@/localization/i18n.json";
import {
	showErrorNotification,
	showSuccessNotification,
} from "@/utils/notifications";
import { addSynonymSchema } from "@/validation/synonym";

function formatSuccessMessage(word: string, synonyms: string[]): string {
	const synonymsText =
		synonyms.length > 1
			? `${synonyms.slice(0, -1).join(", ")} and ${
					synonyms[synonyms.length - 1]
				}`
			: synonyms[0];

	return `${i18n.UI_TEXT.ADD_SUCCESS_PREFIX} ${
		synonyms.length > 1
			? i18n.UI_TEXT.SYNONYM_SUCCESS_PLURAL
			: i18n.UI_TEXT.SYNONYM_SUCCESS_SINGLE
	} "${synonymsText}" ${i18n.UI_TEXT.ADD_SUCCESS_FOR} "${word}"`;
}

export function useAddSynonym(onClose: () => void) {
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
							synonyms: `${
								i18n.ERROR_MESSAGES.SYNONYMS_ALREADY_EXIST
							} ${duplicates.join(", ")}`,
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

	const foundWordGroup = searchResults?.results.find(
		(result: { word: string }) =>
			result.word.toLowerCase() === debouncedWord.toLowerCase(),
	);

	const handleSubmit = form.onSubmit(async (values) => {
		try {
			const result = await addSynonym(values).unwrap();
			const successMessage = formatSuccessMessage(result.word, result.synonyms);
			showSuccessNotification(successMessage);
			form.reset();
			setCurrentWord("");
			onClose();
		} catch {
			showErrorNotification(i18n.ERROR_MESSAGES.ADD_SYNONYM_ERROR);
		}
	});

	return {
		form,
		isLoading,
		isSearching,
		foundWordGroup,
		setCurrentWord,
		handleSubmit,
	};
}
