"use client"

import React, { useEffect, useState } from "react";
import { getAllDocuments } from "@/app/api/firebase";
import { Logout } from "../login/login.client";
import { ReportPage } from "./reports/report";

interface IRowData {
    id: string;
    priority: number;
    problemDescription: string;
    name: string;
    roomNumber: number;
    date: string;
    phoneNumber: string;
    fixed: number; // Changed from boolean to accept 4 possible values
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
                    fixed?: number; // Changed from boolean to accept 4 possible values
                }[] = await getAllDocuments("dummy");

                const formattedData: IRowData[] = rawData.map(item => ({
                    id: item.id || "",
                    priority: item.priority || 0,
                    problemDescription: item.problemDescription || "",
                    name: item.name || "",
                    roomNumber: item.roomNumber || 0,
                    date: item.date || "",
                    phoneNumber: item.phoneNumber || "",
                    fixed: item.fixed || -1 // Set default value to -1
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
            { key: 'fixed', direction: 'ascending' }, // Changed from 'completed' to 'fixed'
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
            { key: 'fixed', direction: 'ascending' },
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
        if (hideCompleted && rowData.fixed !== -1) return false; // Check for -1 value
        if (showHighPriority && rowData.priority < 5) return false;
        return true;
    });

    function createTable() {
        return (<div>
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
                        <th onClick={() => updateSortConfig('fixed', sortConfig.keys.find(k => k.key === 'fixed')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                            Fixed {sortConfig.keys.find(k => k.key === 'fixed')?.direction === 'ascending' ? '▼' : '▲'}
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
                            <td>{rowData.fixed === -1 ? "Not Fixed" : rowData.fixed === 1 ? "Fixed 1" : rowData.fixed === 2 ? "Fixed 2" : "Fixed 3"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
        );
    }

    return (
        <div className="dash">
            <div className="center container">
                <div>
                    <Logout />
                </div>
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
