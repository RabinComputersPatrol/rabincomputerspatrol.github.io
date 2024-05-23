"use client"

import React, { useEffect, useState } from "react";
import { getAllDocuments } from "@/app/api/firebase";
import { Logout } from "../login/login.client";
import { useRouter } from "next/navigation";

interface IRowData {
    id: string;
    priority: number;
    problemDescription: string;
    name: string;
    roomNumber: number;
    date: string;
    phoneNumber: string;
    fixed: number;
}

export const getStatusClass = (fixedStatus: number) => {
    switch (fixedStatus) {
        case -1:
            return 'error';
        case 1:
            return 'not-fixed';
        case 2:
            return 'in-progress';
        case 3:
            return 'fixed';
        default:
            return '';
    }
};

export default function DashboardPage() {
    const [tableData, setTableData] = useState<IRowData[]>([]);
    const [hideFixed, setHideFixed] = useState(false);
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
                    fixed?: number;
                }[] = await getAllDocuments("dummy");

                let formattedData: IRowData[] = rawData.map(item => ({
                    id: item.id || "",
                    priority: item.priority || 0,
                    problemDescription: item.problemDescription || "",
                    name: item.name || "",
                    roomNumber: item.roomNumber || 0,
                    date: item.date || "",
                    phoneNumber: item.phoneNumber || "",
                    fixed: item.fixed ?? -1 // Set default value to -1
                }));


                formattedData = formattedData.sort((n1, n2) => {
                    if (n1.id > n2.id) {
                        return 1;
                    } else if (n1.id < n2.id) {
                        return -1;
                    } else {
                        return 0;
                    }
                });


                setTableData(formattedData);
            } catch (error) {
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
        if (hideFixed && rowData.fixed === 3) return false; // Hide rows where fixed is 3
        if (showHighPriority && rowData.priority < 5) return false;
        return true;
    });

    const router = useRouter();

    function CreateTable() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => updateSortConfig('id', sortConfig.keys.find(k => k.key === 'id')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                                ID {sortConfig.keys.find(k => k.key === 'id')?.direction === 'ascending' ? '▼' : '▲'}
                            </th>
                            <th onClick={() => updateSortConfig('priority', sortConfig.keys.find(k => k.key === 'priority')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                                Priority {sortConfig.keys.find(k => k.key === 'priority')?.direction === 'ascending' ? '▼' : '▲'}
                            </th>
                            <th>Problem Description</th>
                            <th>Name</th>
                            <th>Room Number</th>
                            <th onClick={() => updateSortConfig('date', sortConfig.keys.find(k => k.key === 'date')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                                Date {sortConfig.keys.find(k => k.key === 'date')?.direction === 'ascending' ? '▼' : '▲'}
                            </th>
                            <th>Phone Number</th>
                            <th onClick={() => updateSortConfig('fixed', sortConfig.keys.find(k => k.key === 'fixed')?.direction === 'ascending' ? 'descending' : 'ascending')}>
                                Fixed {sortConfig.keys.find(k => k.key === 'fixed')?.direction === 'ascending' ? '▼' : '▲'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTableData.map((rowData, index) => (
                            <tr key={index} onClick={() => {
                                router.push(`/pages/dashboard/reports?reportID=${rowData.id}`);
                                router.refresh();
                            }}>
                                <td data-label="ID">{rowData.id}</td>
                                <td data-label="Priority">{rowData.priority}</td>
                                <td data-label="Problem Description">{rowData.problemDescription}</td>
                                <td data-label="Name">{rowData.name}</td>
                                <td data-label="Room Number">{rowData.roomNumber}</td>
                                <td data-label="Date">{rowData.date}</td>
                                <td data-label="Phone Number">{rowData.phoneNumber}</td>
                                <td data-label="Fixed" className={getStatusClass(rowData.fixed)}>
                                    {rowData.fixed === -1 ? "ERROR" : rowData.fixed === 1 ? "Not Fixed" : rowData.fixed === 2 ? "In Progress" : "Fixed"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }




    return (
        <div className="dash">
            <div className="center container">
                <div>
                    <Logout />
                </div>
                <div className="filters">
                    <label>
                        <input
                            type="checkbox"
                            checked={hideFixed}
                            onChange={() => setHideFixed(!hideFixed)}
                        />
                        Hide Fixed
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={showHighPriority}
                            onChange={() => setShowHighPriority(!showHighPriority)}
                        />
                        Show High Priority Only
                    </label>
                </div>
                {tableData.length > 0 && CreateTable()}
            </div>
        </div>
    );
}
