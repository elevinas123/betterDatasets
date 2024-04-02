import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import DatasetCard from "./DatasetCard";

export default function App() {
    const path = "package_search";
    const apiKey = "k4AkDG3946rKOWZT5Qc9UpccxlUyWkrEjPGUJPUQ";
    const rows = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const prefetchRange = 2;
    const queryClient = useQueryClient();
    const { data, error } = useQuery(["packages", currentPage], () => fetchPackages(path, apiKey, currentPage, rows), {
        keepPreviousData: true, // Keep showing previous data until new data is fetched
        onSuccess: () => {
            if (isInitialLoad) setIsInitialLoad(false); // Set initial load to false on successful fetch
        },
    });

    // Prefetch the next page whenever the current page changes
    useEffect(() => {
        // Calculate the range of pages to prefetch
        const startPage = Math.max(1, currentPage - prefetchRange); // Ensure we don't go below page 1
        const endPage = currentPage + prefetchRange; // Assuming there's no upper limit on pages

        for (let page = startPage; page <= endPage; page++) {
            if (page !== currentPage) {
                // Avoid refetching the current page
                queryClient.prefetchQuery(["packages", page], () => fetchPackages(path, apiKey, page, rows));
            }
        }
    }, [currentPage, apiKey, path, queryClient, rows, prefetchRange]);

    if (isInitialLoad) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <div className="flex flex-col">
            <div>TOP SIDE</div>
            <div className="flex flex-row h-full">
                <div className="flex flex-col w-1/3 bg-accent"></div>
                <div className="flex flex-col p-10 w-1/2">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                            <div className="font-semibold">Datasets</div>
                            <div className="ml-4">{data.result.count}</div>
                            <input className="ml-4" placeholder="filter by name"></input>
                        </div>
                        <div>Sort: trending</div>
                    </div>
                    <div className="flex flex-row flex-wrap">
                        {data.result.results.map((i) => (
                            <DatasetCard id={i.id} key={i.id} title={i.title} description={""} />
                        ))}
                    </div>
                    <div className="flex flex-row justify-center mt-4">
                        <button
                            className="ml-4 shadow-md p-1 rounded-lg pl-2 pr-2 border"
                            onClick={() => setCurrentPage((i) => Math.max(i - 1, 0))}
                        >
                            Previous
                        </button>
                        <button className="ml-4 shadow-md p-1 rounded-lg pl-2 pr-2 border">{currentPage}</button>
                        <button
                            className="ml-4 shadow-md p-1 rounded-lg pl-2 pr-2 border"
                            onClick={() => setCurrentPage((i) => i + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

async function fetchPackages(path: string, apiKey: string, start: number, rows: number) {
    const response = await fetch(`/api/${path}?rows=${rows}&start=${start}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
        },
    });
    console.log(response);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    console.log("making request");
    const responseBody = await response.json();
    console.log("responseBody", responseBody);
    return responseBody;
}
