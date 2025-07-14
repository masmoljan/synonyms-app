import { TagsInput, Text, Code } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface SynonymTagsInputProps {
	form: UseFormReturnType<{ word: string; synonyms: string[] }>;
}

export default function SynonymTagsInput({ form }: SynonymTagsInputProps) {
	return (
		<>
			<TagsInput
				label="Synonyms"
				placeholder={
					form.values.synonyms.length > 0
						? "Add more..."
						: "Type and press comma..."
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
				Type synonyms and press comma to add them:
				<Code>happy, joyful, cheerful</Code>
			</Text>
		</>
	);
}
