
"use client";

import { Pagination } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

export default function PaginationWrapper({ totalPages, currentPage }) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page) => {
    router.push(`${pathname}?page=${page}`);
  };

  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis logic
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= half + 1) {
        for (let i = 1; i <= maxVisible - 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - half) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - maxVisible + 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - half + 1; i <= currentPage + half - 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex  justify-center mt-6">
      <Pagination>
        <Pagination.Content>
          {/* Previous button */}
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}
              className="border border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <Pagination.PreviousIcon />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {/* Page numbers */}
          {visiblePages.map((page, index) => (
            <Pagination.Item key={index}>
              {page === "ellipsis" ? (
                <Pagination.Ellipsis className="px-3 py-2 text-slate-500" />
              ) : (
                <Pagination.Link
                  isActive={page === currentPage}
                  onPress={() => handlePageChange(page)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    page === currentPage
                      ? "bg-purple-600 text-white dark:bg-purple-500 shadow-md"
                      : "text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                  }`}
                >
                  {page}
                </Pagination.Link>
              )}
            </Pagination.Item>
          ))}

          {/* Next button */}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={currentPage === totalPages}
              onPress={() => handlePageChange(currentPage + 1)}
              className="border border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}