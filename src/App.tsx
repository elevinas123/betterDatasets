import { useState } from "react";
import SearchPage from "./SearchPage";
import DatasetPage from "./DatasetPage";

export default function App() {

    
    

    const [page, setPage] = useState("search")
    const [currDataset, setCurrDataset] = useState(null)

    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header only contains the title now */}
            <header className="bg-primary text-white p-6 shadow-md">
                <div className="max-w-7xl mx-auto  flex flex-row justify-between">
                    <h1 className="font-bold text-xl">Dataset Explorer</h1>
                    <h1>
                        <button onClick={() => setPage("search")} className="bg-accent px-2 py-2 rounded-lg font-bold">Go back</button>
                    </h1>
                </div>
            </header>
            {page === "search" ? (
                <SearchPage setPage={setPage} setCurrDataset={setCurrDataset} />
            ) : (
                <DatasetPage dataset={currDataset} />
            )}
        </div>
    );


}



