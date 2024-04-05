import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import PaginationComponent from "./PaginationComponent";

interface CSVDataTableProps {
    csvUrl: string;
}

const CSVDataTable: React.FC<CSVDataTableProps> = ({ csvUrl }) => {
    const [rows, setRows] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const rowsPerPage = 50; // Adjust based on your preference

    useEffect(() => {
        const fetchCSV = async () => {
            setLoading(true);
            const response = await fetch(`/download?url=${encodeURIComponent(csvUrl)}`);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value);
            Papa.parse(csv, {
                complete: (result) => {
                    setRows(result.data as string[][]);
                    setLoading(false);
                },
            });
        };

        fetchCSV();
    }, [csvUrl]);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        setExpandedRow(null); // Reset expanded row on page change
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(1).slice(indexOfFirstRow, indexOfLastRow);

    const toggleRowExpansion = (index: number) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    if (loading) return <div className="flex justify-center items-center py-4">Loading...</div>;

    return (
        <div className=" flex flex-col">
            <div className="h-96 rounded-lg overflow-scroll">
                <table className="w-full text-xs text-gray-700 dark:text-gray-400">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        {rows.slice(0, 1).map((headerRow, index) => (
                            <tr key={index}>
                                {headerRow.map((header, index) => (
                                    <th key={index} className="px-6 py-3 text-left">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {currentRows.map((dataRow, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                                    expandedRow === rowIndex ? "overflow-visible" : "overflow-hidden"
                                } h-auto`}
                                onClick={() => toggleRowExpansion(rowIndex)}
                                style={{ maxHeight: expandedRow === rowIndex ? "none" : "3rem" }}
                            >
                                {dataRow.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-6 py-4">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={Math.ceil((rows.length - 1) / rowsPerPage)}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );

};

export default CSVDataTable;
