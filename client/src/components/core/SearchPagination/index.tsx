import { Center, Pagination } from "@mantine/core";

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SearchPagination({
  currentPage,
  totalPages,
  onPageChange,
}: SearchPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Center mt="md">
      <Pagination
        value={currentPage}
        onChange={onPageChange}
        total={totalPages}
        withEdges
      />
    </Center>
  );
}
