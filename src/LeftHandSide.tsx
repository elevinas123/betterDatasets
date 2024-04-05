import { useEffect, useState } from "react";
import { useQuery } from "react-query";

type Props = {
    tags: unknown;
};

const LeftHandSide: React.FC<Props> = ({ tags }) => {
    const [searchInputed, setSearchInputed] = useState("");
    const [tagsPicked, setTagsPicked] = useState<string[]>([]);
    const [formatsPicked, setFormatsPicked] = useState<string[]>([]);
    const [tagSearch, setTagSearch] = useState("")
    const apiKey = "k4AkDG3946rKOWZT5Qc9UpccxlUyWkrEjPGUJPUQ";

    useEffect(() => {
        console.log("tag", tags);
    }, [tags]);
    type SuggestionScore = {
        suggestion: string;
        score: number;
    };

    // Levenshtein Distance Function
    function levenshtein(a: string, b: string): number {
        const matrix: number[][] = Array(b.length + 1)
            .fill(null)
            .map(() => Array(a.length + 1).fill(0));

        for (let i = 0; i <= b.length; i++) {
            matrix[i][0] = i;
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                const indicator = a[j - 1] === b[i - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1, // deletion
                    matrix[i][j - 1] + 1, // insertion
                    matrix[i - 1][j - 1] + indicator // substitution
                );
            }
        }

        return matrix[b.length][a.length];
    }

    // Suggestion Scoring and Sorting
    function scoreSuggestions(input: string, suggestions: string[]): SuggestionScore[] {
        const scoredSuggestions: SuggestionScore[] = suggestions.map((suggestion) => {
            const distance = levenshtein(input.toLowerCase(), suggestion.toLowerCase());
            const startsWithInput = suggestion.toLowerCase().startsWith(input.toLowerCase()) ? 0 : 1;
            const score = distance + startsWithInput;
            return { suggestion, score };
        });

        // Sort the suggestions by score
        return scoredSuggestions.sort((a, b) => a.score - b.score);
    }

    const { data: autocompletedTags } = useQuery(
        ["autoCompletedTags", searchInputed],
        () => autocompleteTags(apiKey, searchInputed),
        {
            keepPreviousData: true,
            // Only enable the query if searchInputed has two or more characters
            enabled: searchInputed.length >= 2,
        }
    );

    const [currentSuggestions, setCurrentSuggestions] = useState<SuggestionScore[]>([]);

    useEffect(() => {
        if (!autocompletedTags) return;
        setCurrentSuggestions(scoreSuggestions(searchInputed, autocompletedTags))
    }, [autocompletedTags]);
    const handlePicked = (name: string, where: string) => {
        if (where === "tag") {
            setTagsPicked((currentTags) => {
                const index = currentTags.indexOf(name);
                if (index >= 0) {
                    return currentTags.filter((tag) => tag !== name); // Remove the tag
                } else {
                    return [...currentTags, name]; // Add the tag
                }
            });
            // Invoke the callback for external handling (like filtering datasets)
        } else if (where === "formats") {
            setFormatsPicked((currentFormats) => {
                const index = currentFormats.indexOf(name);
                if (index >= 0) {
                    return currentFormats.filter((format) => format !== name); // Remove the format
                } else {
                    return [...currentFormats, name]; // Add the format
                }
            });
        } else {
            throw new Error(`Wrong place, got ${where}`);
        }
    };
    
    const handleTagPicked = (tag) => {
        
    }


    const renderTagSuggestions = () => {
        return currentSuggestions?.map(({ suggestion , score}: SuggestionScore) => (
            <button
                key={suggestion}
                onClick={() => handleTagPicked(suggestion)}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm transition-colors duration-300 ease-in-out"
            >
                {suggestion}
            </button>
        ));
    };

    if (!tags) return <div>Loading</div>;

    return (
        <aside className="w-1/4 p-6 bg-gray-100 text-gray-700">
            <div className="mb-8">
                <h2 className="font-semibold text-xl mb-5 text-primary">Filters</h2>
                {/* Search filter */}
                <div className="mb-6">
                    <label htmlFor="search" className="block text-sm font-medium mb-2 text-gray-600">
                        Search
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={tagSearch}
                        onChange={(e) => setTagSearch(e.target.value)}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md py-2 px-4"
                        placeholder="Filter by name"
                    />
                </div>
                {/* Additional filters can be dynamically added here */}
            </div>

            <div>
                <h2 className="font-semibold text-xl mb-5 text-primary">Tags</h2>

                <div className="mb-6">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchInputed}
                        onChange={(e) => setSearchInputed(e.target.value)}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md py-2 px-4"
                        placeholder="Search tag"
                    />
                    <div className="bg-white shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md py-2 px-4">
                        {renderTagSuggestions()}
                    </div>
                </div>
                {/* Dynamically generated tags */}
                <div className="flex flex-wrap gap-2">
                    {tagsPicked.map((tag) => (
                        <button
                            key={tag}
                            className={`text-white px-4 py-2 rounded-full text-sm leading-none transition-colors duration-300 ease-in-out`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-semibold text-xl mb-5 text-primary mt-4">Formats</h2>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handlePicked("csv", "formats")}
                        className={`${
                            formatsPicked.indexOf("csv") >= 0 ? "bg-secondary" : "bg-primary"
                        } hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm leading-none transition-all duration-300 ease-in-out`}
                    >
                        CSV
                    </button>
                    <button
                        onClick={() => handlePicked("json", "formats")}
                        className={`${
                            formatsPicked.indexOf("json") >= 0 ? "bg-secondary" : "bg-primary"
                        } hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm leading-none transition-all duration-300 ease-in-out`}
                    >
                        JSON
                    </button>
                    {/* Additional tags can be dynamically added here */}
                </div>
            </div>
        </aside>
    );
};

export default LeftHandSide;

async function autocompleteTags(apiKey: string, query: string) {
    console.log("started");
    const response = await fetch(`/api/tag_autocomplete?query=${query}&limit=100&offset=0`, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
        },
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("autocompleteTags", data);
    return data.result; // Or however the API formats its response for facets/tags
}
