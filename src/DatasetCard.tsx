type Props = {
    id: string;
    title: string;
    updated: string;
    maintainer: string;
    formats: string[];
    setPage: unknown
};

const DatasetCard: React.FC<Props> = ({ id, title, updated, maintainer, formats, setPage }) => {
    const date = daysAgo(updated);

    return (
        <div className="flex justify-center p-2 md:p-4 w-full md:w-1/2">
            <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 w-full">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-primary-dark mb-2 truncate">{title}</h3>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-medium text-gray-800 w-1/2">Maintainer: {maintainer || "Unknown"}</p>
                        <p className="text-xs text-gray-500 ">Updated {date}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-xs font-semibold text-gray-700">Formats:</span>
                        {formats.map((format, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                {format.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end px-6 pb-4">
                    <a
                        href="#"
                        onClick={() => setPage("dataset")}
                        className="text-accent hover:text-accent-light font-semibold transition-colors duration-300"
                    >
                        Learn More →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DatasetCard;

function daysAgo(dateString: string): string {
    const dateModified: Date = new Date(dateString);
    const currentDate: Date = new Date();
    const difference: number = currentDate.getTime() - dateModified.getTime();
    const daysAgo: number = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) {
        return "today";
    } else if (daysAgo === 1) {
        return "yesterday";
    } else if (daysAgo > 365) {
        // Format as 'MMM YYYY' for dates more than 365 days ago
        return dateModified.toLocaleString("en-US", { month: "short", year: "numeric" });
    } else {
        return `${daysAgo} days ago`;
    }
}

