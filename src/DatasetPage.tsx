const dataset = {
    author: null,
    author_email: null,
    creator_user_id: "2b785922-9f13-491b-a3c2-2a40acbd80c2",
    id: "4cfdbe83-666d-4e72-b8c6-31dbcdd8dbf0",
    isopen: false,
    license_id: "notspecified",
    license_title: "License not specified",
    maintainer: "FDIC Public Data Feedback",
    maintainer_email: "FDICPublicDataFeedback@fdic.gov",
    metadata_created: "2020-11-12T12:17:38.682700",
    metadata_modified: "2020-11-12T12:17:38.682707",
    name: "fdic-failed-bank-list",
    notes: "The FDIC is often appointed as receiver for failed banks. This list includes banks which have failed since October 1, 2000.",
    num_resources: 2,
    num_tags: 4,
    organization: {
        id: "5e4d7221-af33-40f5-bbed-78ae1dd8721e",
        name: "fdic-gov",
        title: "Federal Deposit Insurance Corporation",
        type: "organization",
        description: "",
        image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/US-FDIC-Logo.svg/150px-US-FDIC-Logo.svg.png",
        created: "2020-11-10T18:34:31.142125",
        is_organization: true,
        approval_status: "approved",
        state: "active",
    },
    owner_org: "5e4d7221-af33-40f5-bbed-78ae1dd8721e",
    private: false,
    state: "active",
    title: "FDIC Failed Bank List",
    type: "dataset",
    url: null,
    version: null,
    extras: [
        {
            key: "publisher",
            value: "Division of Insurance and Research",
        },
        {
            key: "identifier",
            value: "https://www.fdic.gov/bank/individual/failed/",
        },
        {
            key: "harvest_source_id",
            value: "bdc14e86-bb5f-4eaf-a2b4-a7195258b7a0",
        },
        {
            key: "publisher_hierarchy",
            value: "U.S. Government > Federal Deposit Insurance Corporation > Division of Insurance and Research",
        },
        {
            key: "resource-type",
            value: "Dataset",
        },
        {
            key: "modified",
            value: "R/P1W",
        },
        {
            key: "harvest_source_title",
            value: "FDIC data.json",
        },
        {
            key: "source_schema_version",
            value: "1.1",
        },
        {
            key: "source_datajson_identifier",
            value: true,
        },
        {
            key: "programCode",
            value: ["000:000"],
        },
        {
            key: "bureauCode",
            value: ["357:20"],
        },
        {
            key: "catalog_conformsTo",
            value: "https://project-open-data.cio.gov/v1.1/schema",
        },
        {
            key: "accessLevel",
            value: "public",
        },
        {
            key: "harvest_object_id",
            value: "cb22fea9-0c90-43e9-94bf-903eacd37c92",
        },
        {
            key: "source_hash",
            value: "ec43cc841ee6fac880339565e8afcd6842b1ddbd",
        },
    ],
    resources: [
        {
            cache_last_updated: null,
            cache_url: null,
            created: "2020-11-12T12:17:38.699505",
            description: "banklist.csv",
            format: "CSV",
            hash: "",
            id: "a8cfc40d-bf6d-4716-bba6-04fdbdf5f9c1",
            last_modified: null,
            metadata_modified: "2020-11-12T12:17:38.699505",
            mimetype: "text/csv",
            mimetype_inner: null,
            name: "Comma Separated Values File",
            no_real_name: true,
            package_id: "4cfdbe83-666d-4e72-b8c6-31dbcdd8dbf0",
            position: 0,
            resource_type: null,
            size: null,
            state: "active",
            url: "https://www.fdic.gov/bank/individual/failed/banklist.csv",
            url_type: null,
        },
        {
            cache_last_updated: null,
            cache_url: null,
            created: "2020-11-12T12:17:38.699515",
            description: "index.html",
            format: "HTML",
            hash: "",
            id: "58aa28bc-3b22-474f-b3a4-ff8717b22ce2",
            last_modified: null,
            metadata_modified: "2020-11-12T12:17:38.699515",
            mimetype: "text/html",
            mimetype_inner: null,
            name: "Web Page",
            no_real_name: true,
            package_id: "4cfdbe83-666d-4e72-b8c6-31dbcdd8dbf0",
            position: 1,
            resource_type: null,
            size: null,
            state: "active",
            url: "https://www.fdic.gov/bank/individual/failed/index.html",
            url_type: null,
        },
    ],
    tags: [
        {
            display_name: "assistance-transactions",
            id: "2cc65f65-b642-4ba4-aa78-05e0f6cf9a78",
            name: "assistance-transactions",
            state: "active",
            vocabulary_id: null,
        },
        {
            display_name: "banks",
            id: "3541524f-7688-441e-af75-aa09ac3592c9",
            name: "banks",
            state: "active",
            vocabulary_id: null,
        },
        {
            display_name: "failures",
            id: "33c06384-b4c4-4164-b8f3-aa92ce2e5818",
            name: "failures",
            state: "active",
            vocabulary_id: null,
        },
        {
            display_name: "financial-institution",
            id: "c613322f-8127-4106-86a3-ff21f88498f9",
            name: "financial-institution",
            state: "active",
            vocabulary_id: null,
        },
    ],
    groups: [],
    relationships_as_subject: [],
    relationships_as_object: [],
};import React from "react";
import CSVDataVisualization from "./CSVDataVisualization";

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
    dataset: Dataset;
};


// Assuming the same TypeScript interfaces for Dataset and DatasetPageProps


const DatasetPage: React.FC<DatasetPageProps> = () => {

    const csvResource = dataset.resources.find((resource) => resource.format === "CSV");

    return (
        <div className="container mx-auto p-4 bg-background text-foreground">
            <div className="shadow-md p-6 mb-6 rounded-lg bg-card text-card-foreground">
                <h1 className="text-3xl font-bold mb-4 text-primary-default">{dataset.title}</h1>
                <p className="mb-4">{dataset.notes}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2">
                    <section className="shadow-md p-6 mb-6 rounded-lg bg-card text-card-foreground">
                        <h2 className="text-2xl font-semibold mb-2">Data Visualization</h2>
                        <div className="h-64 rounded-lg flex items-center justify-center">
                            {csvResource && <CSVDataVisualization csvUrl={csvResource.url} />}
                            <span>Data Visualization Placeholder</span>
                        </div>
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
                        <h2 className="text-2xl font-semibold mb-2">Resources</h2>
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