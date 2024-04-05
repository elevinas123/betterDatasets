import React, { useEffect } from "react";
import CSVDataTable from "./CSVDataTable";
import sanitizeHtml from "sanitize-html";
// TypeScript interfaces for type safety
interface Resource {
    description: string;
    format: string;
    url: string;
}

interface Tag {
    display_name: string;
}

interface Dataset {
    title: string;
    notes: string;
    maintainer: string;
    maintainer_email: string;
    license_title: string;
    metadata_created: string;
    metadata_modified: string;
    organization: {
        name: string;
        title: string;
        description: string;
        image_url: string;
    };
    resources: Resource[];
    tags: Tag[];
}

type DatasetPageProps = {
    dataset: Dataset | null;
};


// Assuming the same TypeScript interfaces for Dataset and DatasetPageProps


const DatasetPage: React.FC<DatasetPageProps> = ({ dataset }) => {
    useEffect(() => {
        console.log("dataset", dataset)
    }, [dataset])
    if (!dataset) return <div>Error</div>
    const csvResource = dataset.resources.find((resource) => resource.format === "CSV");
    const cleanNotes = sanitizeHtml(dataset.notes, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "span"]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            a: ["href", "style", "target", "rel"],
            img: ["src", "alt"],
            span: ["class"],
        },
        allowedStyles: {
            "*": {
                // Allow certain CSS styles for all elements
                color: [/^#(0x)?[0-9a-f]+$/i, /^rgb/], // Allows colors in hex (#RRGGBB) or rgb()
                "text-align": [/^left$/, /^right$/, /^center$/], // Allows text alignment
            },
            a: {
                // Additional styles for <a> tags
                "text-decoration": [/^none$/, /^underline$/],
            },
        },
    });
    return (
        <div className="container mx-auto p-4 bg-background text-foreground">
            <div className="shadow-md p-6 mb-6 rounded-lg bg-card text-card-foreground">
                <h1 className="text-3xl font-bold mb-4 text-primary-default">{dataset.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: cleanNotes }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2">
                    <section className="flex flex-col shadow-md p-6 mb-6 rounded-lg bg-card text-card-foreground">
                        <h2 className="text-2xl font-semibold mb-2">CSV preview</h2>
                        {csvResource && <CSVDataTable csvUrl={csvResource.url} />}
                    </section>

                    <section className="shadow-md p-6 mb-6 rounded-lg bg-card text-card-foreground">
                        <h2 className="text-2xl font-semibold mb-2">Organization</h2>
                        <div className="flex items-center mb-4">
                            <img
                                src={dataset.organization.image_url}
                                alt="Organization logo"
                                className="w-16 h-16 mr-4"
                            />
                            <div>
                                <h3 className="text-lg font-bold">{dataset.organization.title}</h3>
                                <p>{dataset.organization.description}</p>
                            </div>
                        </div>
                    </section>

                    <section className="shadow-md p-6 rounded-lg bg-card text-card-foreground">
                        <h2 className="text-2xl font-semibold mb-2">Resources to download</h2>
                        {dataset.resources.map((resource, index) => (
                            <div key={index} className="mb-2">
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-secondary-default transition-colors duration-300"
                                >
                                    {resource.description} ({resource.format})
                                </a>
                            </div>
                        ))}
                    </section>
                </div>

                <aside className="col-span-1">
                    <section className="shadow-md p-6 mb-6 rounded-lg bg-card text-card-foreground">
                        <h2 className="text-2xl font-semibold mb-2">Details</h2>
                        <ul className="list-disc pl-5">
                            <li>Maintainer: {dataset.maintainer}</li>
                            <li>License: {dataset.license_title}</li>
                            <li>Created: {new Date(dataset.metadata_created).toLocaleDateString()}</li>
                            <li>Last Modified: {new Date(dataset.metadata_modified).toLocaleDateString()}</li>
                        </ul>
                    </section>

                    <section className="shadow-md p-6 rounded-lg bg-card text-card-foreground">
                        <h2 className="text-2xl font-semibold mb-2">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {dataset.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm"
                                >
                                    {tag.display_name}
                                </span>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default DatasetPage;