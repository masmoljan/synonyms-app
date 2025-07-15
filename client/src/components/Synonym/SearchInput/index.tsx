import { CloseButton, Group, TextInput } from "@mantine/core";
import { UI_TEXT } from "@/constants/constants";

interface SearchInputProps {
	searchTerm: string;
	onInputChange: (value: string) => void;
	onClearSearch: () => void;
}

export default function SearchInput({
	searchTerm,
	onInputChange,
	onClearSearch,
}: SearchInputProps) {
	return (
		<Group mb="md">
			<TextInput
				placeholder={UI_TEXT.ENTER_WORD}
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
