import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, page, totalPages, onPageChange }) => {
  // Support both currentPage and page props for compatibility
  const activePage = currentPage || page || 1;
  const safeTotal = totalPages || 0;

  return (
    <div className="flex items-center justify-end gap-3">
      <span className="text-sm text-muted-foreground">
        Halaman {activePage} dari {safeTotal}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(activePage - 1)}
        disabled={activePage === 1 || safeTotal === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage >= safeTotal || safeTotal === 0}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
