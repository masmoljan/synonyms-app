import { useSynonymSearch } from "@hooks/useSynonymSearch";
import { Group, Paper, Text, Title } from "@mantine/core";
import { NoResults } from "@/components/core/NoResults";
import { SearchInput } from "@/components/core/SearchInput";
import { SearchPagination } from "@/components/core/SearchPagination";
import { SynonymResultsListSkeleton } from "@/components/core/Skeleton/SynonymResultList";
import { SynonymResultsList } from "@/components/core/SynonymResultsList";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import i18n from "@/localization/i18n.json";

export function SynonymsSearch() {
	const {
		searchTerm,
		debouncedSearchTerm,
		page,
		setPage,
		wordWithSynonyms,
		isLoadingSynonyms,
		isFetching,
		totalPages,
		handleInputChange,
		handleClearSearch,
	} = useSynonymSearch();

	useScrollToTop(page);

	const isLoading = isLoadingSynonyms || isFetching;
	const hasSearchTerm = debouncedSearchTerm.length > 0;
	return (
		<Paper p="xl" withBorder radius="lg" shadow="md">
			<Group mb="lg" align="center" gap="sm">
				<Title order={2} fw={600}>
					{i18n.UI_TEXT.FIND_SYNONYMS_TITLE}
				</Title>
				<Text c="dimmed" size="sm">
					{i18n.UI_TEXT.FIND_SYNONYMS_SUBTITLE}
				</Text>
			</Group>

			<SearchInput
				searchTerm={searchTerm}
				onInputChange={handleInputChange}
				onClearSearch={handleClearSearch}
			/>

			{isLoading && <SynonymResultsListSkeleton count={5} />}

			{!isLoading && hasSearchTerm && wordWithSynonyms?.results && (
				<>
					<SynonymResultsList results={wordWithSynonyms.results} />
					<SearchPagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={setPage}
					/>
				</>
			)}

			{!isLoading && hasSearchTerm && !wordWithSynonyms?.results.length && (
				<NoResults searchTerm={debouncedSearchTerm} />
			)}
		</Paper>
	);
}
