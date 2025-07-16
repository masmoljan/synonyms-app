import { CloseButton, Loader, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import i18n from "@/localization/i18n.json"

interface AddSynonymWordInputProps {
	form: UseFormReturnType<{ word: string; synonyms: string[] }>;
	isSearching: boolean;
	onWordChange: (word: string) => void;
}

export function AddSynonymWordInput({
	form,
	isSearching,
	onWordChange,
}: AddSynonymWordInputProps) {
	return (
		<TextInput
			label="Word"
			placeholder={i18n.UI_TEXT.ADD_WORD_INPUT}
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
