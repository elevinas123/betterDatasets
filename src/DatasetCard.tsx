type Props = {
    id: string;
    title: string;
    description: string;
};

const DatasetCard: React.FC<Props> = (props) => {
    return (
        <div className=" p-2 w-1/2 ">
            <button className=" w-full h-24 overflow-hidden bg-white border-primary border p-2 rounded-lg">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </button>
        </div>
    );
};

export default DatasetCard;
