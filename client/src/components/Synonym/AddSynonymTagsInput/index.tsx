import { Code, TagsInput, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { UI_TEXT } from "@/constants/constants";

interface SynonymTagsInputProps {
	form: UseFormReturnType<{ word: string; synonyms: string[] }>;
}

export default function AddSynonymTagsInput({ form }: SynonymTagsInputProps) {
	return (
		<>
			<TagsInput
				label="Synonyms"
				placeholder={
					form.values.synonyms.length > 0
						? UI_TEXT.ADD_MORE_SYNONYMS
						: UI_TEXT.ADD_MORE_SYNONYMS_ALT
				}
				{...form.getInputProps("synonyms")}
				splitChars={[","]}
				maxTags={20}
				styles={{
					inputField: {
						caretColor: "var(--mantine-color-text)",
						color: "var(--mantine-color-text)",
						"--input-placeholder-color": "var(--mantine-color-placeholder)",
					},
				}}
			/>
			<Text size="sm" c="dimmed">
				{UI_TEXT.ADD_SYNONYMS_TIP}
				<Code>{UI_TEXT.ADD_SYNONYMS_TIP_EXAMPLE}</Code>
			</Text>
		</>
	);
}
