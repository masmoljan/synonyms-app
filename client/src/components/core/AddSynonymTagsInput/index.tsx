import { Code, TagsInput, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { VALIDATION_LIMITS } from "@/constants/validation";
import i18n from "@/localization/i18n.json";

interface SynonymTagsInputProps {
	form: UseFormReturnType<{ word: string; synonyms: string[] }>;
}

export function AddSynonymTagsInput({ form }: SynonymTagsInputProps) {
	return (
		<>
			<TagsInput
				label="Synonyms"
				placeholder={
					form.values.synonyms.length > 0
						? i18n.UI_TEXT.ADD_MORE_SYNONYMS
						: i18n.UI_TEXT.ADD_MORE_SYNONYMS_ALT
				}
				{...form.getInputProps("synonyms")}
				splitChars={[","]}
				maxTags={VALIDATION_LIMITS.SYNONYMS_MAX_COUNT}
				maxLength={VALIDATION_LIMITS.SYNONYM_MAX_LENGTH}
				styles={{
					inputField: {
						caretColor: "var(--mantine-color-text)",
						color: "var(--mantine-color-text)",
						"--input-placeholder-color": "var(--mantine-color-placeholder)",
					},
				}}
			/>
			<Text size="sm" c="dimmed">
				{i18n.UI_TEXT.ADD_SYNONYMS_TIP}
				<Code>{i18n.UI_TEXT.ADD_SYNONYMS_TIP_EXAMPLE}</Code>
			</Text>
		</>
	);
}
