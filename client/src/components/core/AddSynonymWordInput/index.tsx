import { CloseButton, Loader, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { UI_TEXT } from "@/constants/constants";

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
      placeholder={UI_TEXT.ADD_WORD_INPUT}
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
