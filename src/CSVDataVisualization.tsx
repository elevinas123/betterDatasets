// CSVDataVisualization.tsx
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CSVDataVisualizationProps {
    csvUrl: string;
}

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}

const CSVDataVisualization: React.FC<CSVDataVisualizationProps> = ({ csvUrl }) => {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    useEffect(() => {
        console.log("charData", chartData);
    }, [chartData]);
    const processData = (data: string[][]) => {
        // Assuming the first row contains labels (excluding the first cell, which might be a category label)
        const labels = data[0].slice(1);

        // Assuming each column after the first is a different dataset
        const datasets = data.slice(1).map((row, index) => ({
            label: row[0], // Use the first cell of each row as the dataset label
            data: row.slice(1).map(Number), // Convert string values to numbers, excluding the first cell
            backgroundColor: `rgba(53, 162, ${(235 + index * 30) % 255}, 0.5)`, // Vary the color slightly for each dataset
        }));

        setChartData({
            labels,
            datasets,
        });
    };


    useEffect(() => {
        const fetchCSV = async () => {
            const response = await fetch(`/download?url=${csvUrl}`);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value);
            Papa.parse(csv, {
                header: false,
                skipEmptyLines: true,
                complete: (result) => {
                    processData(result.data as string[][]);
                },
            });
        };

        fetchCSV();
    }, [csvUrl]);

    return <div>{chartData && <Bar data={chartData} />}</div>;
};

export default CSVDataVisualization;
