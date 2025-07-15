import { CloseButton, Loader, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface AddSynonymWordInputProps {
	form: UseFormReturnType<{ word: string; synonyms: string[] }>;
	isSearching: boolean;
	onWordChange: (word: string) => void;
}

export default function AddSynonymWordInput({
	form,
	isSearching,
	onWordChange,
}: AddSynonymWordInputProps) {
	return (
		<TextInput
			label="Word"
			placeholder="Enter a word or phrase..."
			{...form.getInputProps("word")}
			rightSection={
				<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
					{isSearching && <Loader size="sm" />}
					{form.values.word && (
						<CloseButton
							size="sm"
							onClick={() => {
								form.setFieldValue("word", "");
								onWordChange("");
							}}
						/>
					)}
				</div>
			}
		/>
	);
}
