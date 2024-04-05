import React, { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./components/ui/pagination";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const [selectedPage, setSelectedPage] = useState(currentPage);

    const handlePageChange = (page: number) => {
        setSelectedPage(page);
        onPageChange(page);
    };

    const renderPaginationItems = () => {
        let items = [];

        // First page
        items.push(
            <PaginationItem key={1} className={selectedPage === 1 ? "bg-secondary text-white rounded" : ""}>
                <PaginationLink
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(1);
                    }}
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        // Ellipsis if needed
        if (selectedPage > 3) {
            items.push(
                <PaginationItem key="left-ellipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Middle pages
        for (let p = Math.max(2, selectedPage - 1); p <= Math.min(selectedPage + 1, totalPages - 1); p++) {
            items.push(
                <PaginationItem key={p} className={selectedPage === p ? "bg-secondary text-white rounded" : ""}>
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(p);
                        }}
                    >
                        {p}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Ellipsis if needed
        if (selectedPage < totalPages - 2) {
            items.push(
                <PaginationItem key="right-ellipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Last page
        if (totalPages > 1) {
            items.push(
                <PaginationItem
                    key={totalPages}
                    className={selectedPage === totalPages ? "bg-secondary text-white rounded" : ""}
                >
                    <PaginationLink
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                        }}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(Math.max(1, selectedPage - 1));
                        }}
                    />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(Math.min(totalPages, selectedPage + 1));
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
