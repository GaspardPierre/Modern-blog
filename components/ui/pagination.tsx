import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginationInfo } from '@/lib/pagination';

interface PaginationProps {
  paginationInfo: PaginationInfo;
  basePath: string;
}

const Pagination: React.FC<PaginationProps> = ({ paginationInfo, basePath }) => {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = paginationInfo;

  return (
    <div className="flex justify-center items-center space-x-4 mt-8 w-full">
        {hasPrevPage && (
      <Button
        variant="outline"
        disabled={!hasPrevPage}
        asChild
        className="flex items-center space-x-2" // Assure l'espacement correct entre l'icône et le texte
      >
        <Link href={`${basePath}?page=${currentPage - 1}`} className="text-black flex items-center space-x-2">
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Link>
      </Button>
           )}

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      {hasNextPage && (
      <Button
        variant="outline"
        disabled={!hasNextPage}
        asChild
        className="flex items-center space-x-2" // Même configuration pour le bouton "Next"
      >
        <Link href={`${basePath}?page=${currentPage + 1}`} className="text-black flex items-center space-x-2">
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
            )}
    </div>
  );
};

export default Pagination;
