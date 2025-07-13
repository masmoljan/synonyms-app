import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useSearchSynonymsQuery } from '../api/synonymsSlice';
import { DEFAULT_QUERY_OPTIONS } from '@/constants/constants';
import useErrorNotification from './useErrorNotification';

export default function useSynonymSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = DEFAULT_QUERY_OPTIONS.LIMIT;

  const debouncedSetSearch = useRef(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 500)
  ).current;

  const {
    data: wordWithSynonyms,
    error,
    isLoading: isLoadingSynonyms,
    isFetching,
  } = useSearchSynonymsQuery(
    {
      word: debouncedSearchTerm,
      skip: (page - 1) * limit,
      limit,
    },
    {
      skip: !debouncedSearchTerm,
    }
  );

  useErrorNotification(error);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      debouncedSetSearch(value.trim());
    } else {
      debouncedSetSearch.cancel();
      setDebouncedSearchTerm('');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    debouncedSetSearch.cancel();
  };

  const totalPages = wordWithSynonyms?.count
    ? Math.ceil(wordWithSynonyms.count / limit)
    : 0;

  return {
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
  };
}
