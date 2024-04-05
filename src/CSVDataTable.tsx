import React, { useMemo, useState, useEffect } from "react";
import Papa from "papaparse";
import { useTable, usePagination, Row, Cell, Column } from "react-table";
import PaginationComponent from "./PaginationComponent";

interface CSVDataTableProps {
    csvUrl: string;
}

interface Data {
    [header: string]: any;
}

const CSVDataTable: React.FC<CSVDataTableProps> = ({ csvUrl }) => {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const rowsPerPage = 100;
    useEffect(() => {
        const fetchCSV = async () => {
            setLoading(true);
            const response = await fetch(`/download?url=${encodeURIComponent(csvUrl)}`);
            if (!response.body) throw new Error("Failed to get response body");
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value);
            Papa.parse(csv, {
                header: true, // Ensure that the first row is treated as the header
                complete: (result) => {
                    setData(result.data as Data[]);
                    setLoading(false);
                },
            });
        };

        fetchCSV();
    }, [csvUrl]);

    const columns: Column<Data>[] = useMemo(
        () =>
            data[0]
                ? Object.keys(data[0]).map((header) => ({
                      Header: header,
                      accessor: header,
                  }))
                : [],
        [data]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        gotoPage,
        pageCount,
        state: { pageIndex },
    } = useTable<Data>(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: rowsPerPage }, // Setting the initial page size here
        },
        usePagination)

    const onPageChange = (newPage: number) => {
        gotoPage(newPage - 1);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg h-96">
                <table {...getTableProps()} className="w-full text-xs text-gray-700 dark:text-gray-400">
                    <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()} className="px-6 py-3 text-left">
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row: Row<Data>) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 even:bg-gray-100"
                                >
                                    {row.cells.map((cell: Cell<Data>) => (
                                        <td {...cell.getCellProps()} className="px-6 py-2">
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <PaginationComponent currentPage={pageIndex + 1} totalPages={pageCount} onPageChange={onPageChange} />
            </div>
        </div>
    );
};

export default CSVDataTable;
