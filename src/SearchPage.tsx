import { useQuery, useQueryClient } from "react-query";
import DatasetCard from "./DatasetCard";
import LeftHandSide from "./LeftHandSide";
import PaginationComponent from "./PaginationComponent";
import { useEffect, useState } from "react";

type Props = {
    setPage: unknown
}


export default function SearchPage({setPage}: Props) {
    const apiKey = "k4AkDG3946rKOWZT5Qc9UpccxlUyWkrEjPGUJPUQ";
    const path = "package_search";
    const rows = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const prefetchRange = 2;
    const queryClient = useQueryClient();
    const { data: mostFamousTags } = useQuery(["famousTags"], () => fetchTopTags(apiKey), {
        keepPreviousData: true,
    });
    const { data, error } = useQuery(["packages", currentPage], () => fetchPackages(path, apiKey, currentPage, rows), {
        keepPreviousData: true, // Keep showing previous data until new data is fetched
        onSuccess: () => {
            console.log("data", data);
            if (isInitialLoad) setIsInitialLoad(false); // Set initial load to false on successful fetch
        },
    });

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

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
    if (isInitialLoad || !data || !mostFamousTags) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        
            <div className="flex flex-grow">
                {/* Sidebar for filters and tags */}
                <LeftHandSide tags={mostFamousTags} />
                {/* Dataset cards and pagination */}
                <div className="flex flex-col flex-1 p-10">
                    <div className="flex flex-wrap -mx-4">
                        { data.results.map((i) => (
                            <DatasetCard
                                key={i.id}
                                id={i.id}
                                title={i.title}
                                formats={["csv", "json", "html"]}
                                updated={i.metadata_modified}
                                maintainer={i.maintainer}
                                setPage={setPage}
                            />
                        ))}
                    </div>
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={Math.ceil(data.count / 20)}
                        onPageChange={onPageChange}
                    />
                </div>
            </div>
    )
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
    return responseBody.result;
}

async function fetchTopTags(apiKey: string) {
    const response = await fetch(`/api/package_search?facet.field=["tags"]&facet.limit=10&rows=0`, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
        },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("tagResponse", data);
    return data.result; // Or however the API formats its response for facets/tags
}