import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AppPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: AppPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`h-9 flex items-center ${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }`}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink
              isActive={currentPage === i + 1}
              onClick={() => onPageChange(i + 1)}
              className="cursor-pointer"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={`h-9 flex items-center ${
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
