import NoResults from "@components/Synonym/NoResults";
import SearchInput from "@components/Synonym/SearchInput";
import SearchPagination from "@components/Synonym/SearchPagination";
import SynonymResultsList from "@components/Synonym/SynonymResultsList";
import useSynonymSearch from "@hooks/useSynonymSearch";
import { Group, Paper, Text, Title } from "@mantine/core";
import SynonymResultsListSkeleton from "@/components/Skeleton/SynonymResultList";
import { UI_TEXT } from "@/constants/constants";
import useScrollToTop from "@/hooks/useScrollToTop";

export default function SynonymsSearch() {
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
					{UI_TEXT.FIND_SYNONYMS_TITLE}
				</Title>
				<Text c="dimmed" size="sm">
					{UI_TEXT.FIND_SYNONYMS_SUBTITLE}
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
