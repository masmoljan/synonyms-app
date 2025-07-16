import { CloseButton, Group, TextInput } from "@mantine/core";
import i18n from "@/localization/i18n.json"

interface SearchInputProps {
	searchTerm: string;
	onInputChange: (value: string) => void;
	onClearSearch: () => void;
}

export function SearchInput({
	searchTerm,
	onInputChange,
	onClearSearch,
}: SearchInputProps) {
	return (
		<Group mb="md">
			<TextInput
				placeholder={i18n.UI_TEXT.ENTER_WORD}
				value={searchTerm}
				onChange={(e) => onInputChange(e.target.value)}
				style={{ flexGrow: 1 }}
				rightSection={
					<CloseButton
						onClick={onClearSearch}
						style={{
							cursor: "pointer",
							display: searchTerm ? "inherit" : "none",
						}}
					/>
				}
			/>
		</Group>
	);
}
