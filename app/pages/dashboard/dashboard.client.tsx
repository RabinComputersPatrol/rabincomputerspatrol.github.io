"use client"

import React, { useEffect, useState } from "react";
import { getAllDocuments } from "@/app/api/firebase";

interface IRowData {
    id: string;
    priority: number;
    problemDescription: string;
    name: string;
    roomNumber: number;
    date: string;
    phoneNumber: string;
    completed: boolean;
}

export default function DashboardPage() {
    const [tableData, setTableData] = useState<IRowData[]>([]);
    const [hideCompleted, setHideCompleted] = useState(false);
    const [showHighPriority, setShowHighPriority] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const rawData: {
                    id: string;
                    priority?: number;
                    problemDescription?: string;
                    name?: string;
                    roomNumber?: number;
                    date?: string;
                    phoneNumber?: string;
                    completed?: boolean;
                }[] = await getAllDocuments("dummy");

                const formattedData: IRowData[] = rawData.map(item => ({
                    id: item.id || "", // Assuming id is always present
                    priority: item.priority || 0,
                    problemDescription: item.problemDescription || "",
                    name: item.name || "",
                    roomNumber: item.roomNumber || 0,
                    date: item.date || "",
                    phoneNumber: item.phoneNumber || "",
                    completed: item.completed || false
                }));
                formattedData.sort((n1, n2) => {
                    return parseInt(n1.id) - parseInt(n2.date);
                });
                setTableData(formattedData);
            } catch (error) {
                console.error("Error getting documents: ", error);
                // Handle error if necessary
            }
        }
        fetchData();
    }, []);

    const [sortConfig, setSortConfig] = useState({
        keys: [
            { key: 'completed', direction: 'ascending' },
            { key: 'priority', direction: 'descending' },
            { key: 'date', direction: 'descending' },
            { key: 'id', direction: 'descending' },
            { key: 'roomNumber', direction: 'descending' },
        ],
    });

    function updateSortConfig(key: string, direction: 'ascending' | 'descending') {
        const updatedSortConfig = [
            { key, direction },
            ...sortConfig.keys.filter(k => k.key !== key),
        ].slice(0, 3);

        setSortConfig({ keys: updatedSortConfig });
    }

    function sortData(data: IRowData[]): IRowData[] {
        const defaultSortConfig = [
            { key: 'completed', direction: 'ascending' },
            { key: 'priority', direction: 'descending' },
            { key: 'date', direction: 'descending' },
            { key: 'id', direction: 'descending' },
            { key: 'roomNumber', direction: 'descending' },
        ];

        const currentSortConfig = sortConfig.keys.length ? sortConfig.keys : defaultSortConfig;

        return data.sort((a, b) => {
            for (const { key, direction } of currentSortConfig) {
                let aValue = a[key as keyof IRowData];
                let bValue = b[key as keyof IRowData];

                if (key === 'date' && typeof aValue === 'string') {
                    aValue = new Date(aValue).getTime();
                    bValue = new Date(bValue as string).getTime();
                }

                if (typeof aValue === 'boolean') aValue = aValue ? 1 : 0;
                if (typeof bValue === 'boolean') bValue = bValue ? 1 : 0;

                if (aValue < bValue) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return direction === 'ascending' ? 1 : -1;
                }
            }
            return 0;
        });
    }

    const sortedTableData = sortData(tableData).filter(rowData => {
        if (hideCompleted && rowData.completed) return false;
        if (showHighPriority && rowData.priority < 5) return false;
        return true;
    });

    function createTable() {
        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={() => updateSortConfig('id', sortConfig.keys.find(k => k.key === 'id')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                            ID {sortConfig.keys.find(k => k.key === 'id')?.direction === 'ascending' ? '▼' : '▲'}
                        </th>
                        <th onClick={() => updateSortConfig('priority', sortConfig.keys.find(k => k.key === 'priority')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                            Priority {sortConfig.keys.find(k => k.key === 'priority')?.direction === 'ascending' ? '▼' : '▲'}
                        </th>
                        <th> Problem Description </th>
                        <th> Name </th>
                        <th> Room Number </th>
                        <th onClick={() => updateSortConfig('date', sortConfig.keys.find(k => k.key === 'date')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                            Date {sortConfig.keys.find(k => k.key === 'date')?.direction === 'ascending' ? '▼' : '▲'}
                        </th>
                        <th> Phone Number </th>
                        <th onClick={() => updateSortConfig('completed', sortConfig.keys.find(k => k.key === 'completed')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                            Completed {sortConfig.keys.find(k => k.key === 'completed')?.direction === 'ascending' ? '▼' : '▲'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTableData.map((rowData, index) => (
                        <tr key={index}>
                            <td>{rowData.id}</td>
                            <td>{rowData.priority}</td>
                            <td>{rowData.problemDescription}</td>
                            <td>{rowData.name}</td>
                            <td>{rowData.roomNumber}</td>
                            <td>{rowData.date}</td>
                            <td>{rowData.phoneNumber}</td>
                            <td>{rowData.completed ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <div className="dash">
            <div className="center container">
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={hideCompleted}
                            onChange={() => setHideCompleted(!hideCompleted)}
                        />
                        Hide Completed
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showHighPriority}
                            onChange={() => setShowHighPriority(!showHighPriority)}
                        />
                        Show High Priority Only
                    </label>
                </div>
                {tableData.length > 0 && createTable()}
            </div>
        </div>
    );
}


