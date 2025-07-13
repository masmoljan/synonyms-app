import { Group, Modal, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import {
  useAddSynonymMutation,
  useSearchSynonymsQuery,
} from '@api/synonymsSlice';
import { addSynonymSchema } from '@/validation/synonym';
import { useState, useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import WordInput from '../WordInput';
import ExistingSynonymsAlert from '../ExistingSynonymsAlert';
import SynonymTagsInput from '../SynonymTagsInput';
import AddSynonymButton from '@/components/Button/AddSynonym';

function formatSuccessMessage(word: string, synonyms: string[]): string {
  const synonymsText =
    synonyms.length > 1
      ? `${synonyms.slice(0, -1).join(', ')} and ${
          synonyms[synonyms.length - 1]
        }`
      : synonyms[0];

  return `Successfully added ${
    synonyms.length > 1 ? 'synonyms' : 'synonym'
  } "${synonymsText}" for "${word}"`;
}

interface AddSynonymProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddSynonym({ opened, onClose }: AddSynonymProps) {
  const [addSynonym, { isLoading }] = useAddSynonymMutation();
  const [currentWord, setCurrentWord] = useState('');
  const [debouncedWord] = useDebouncedValue(currentWord, 500);

  const form = useForm({
    initialValues: {
      word: '',
      synonyms: [] as string[],
    },
    validate: (values) => {
      const zodValidation = zodResolver(addSynonymSchema)(values);

      const foundSynonyms = foundWordGroup?.synonyms || [];
      const duplicates = values.synonyms.filter((syn) =>
        foundSynonyms.some(
          (found: string) => found.toLowerCase() === syn.toLowerCase()
        )
      );

      const duplicatesValidation =
        duplicates.length > 0
          ? {
              synonyms: `These synonyms already exist: ${duplicates.join(
                ', '
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
      }
    );

  useEffect(() => {
    setCurrentWord(form.values.word);
  }, [form.values.word]);

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const result = await addSynonym(values).unwrap();
      notifications.show({
        title: 'Success',
        message: formatSuccessMessage(result.word, result.synonyms),
        color: 'green',
      });
      form.reset();
      setCurrentWord('');
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: 'An error occurred while adding the synonym',
        color: 'red',
      });
    }
  });

  const foundWordGroup = searchResults?.results.find(
    (result: { word: string }) =>
      result.word.toLowerCase() === debouncedWord.toLowerCase()
  );
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm" align="center">
          <Text fw={600} size="lg">
            Add New Synonym
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
          <WordInput
            form={form}
            isSearching={isSearching}
            onWordChange={setCurrentWord}
          />
          {foundWordGroup && foundWordGroup.synonyms.length > 0 && (
            <ExistingSynonymsAlert synonyms={foundWordGroup.synonyms} />
          )}
          <SynonymTagsInput form={form} />
        </Stack>
        <AddSynonymButton isLoading={isLoading} />
      </form>
    </Modal>
  );
}
