"use client"

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getAllDocuments } from "@/app/api/firebase";

interface IRowData {
    id: string;
    priority: number;
    problemDescription: string;
    name: string;
    roomNumber: number;
    date: string;
    phoneNumber: string;
}

export default function DashboardPage() {
    const [tableData, setTableData] = useState<IRowData[]>([]);

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
                }[] = await getAllDocuments("reports");

                const formattedData: IRowData[] = rawData.map(item => ({
                    id: item.id || "", // Assuming id is always present
                    priority: item.priority || 0,
                    problemDescription: item.problemDescription || "",
                    name: item.name || "",
                    roomNumber: item.roomNumber || 0,
                    date: item.date || "",
                    phoneNumber: item.phoneNumber || "",
                    completed: item.completed || "",
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

    function createTable() {
        return (
            <table>
                <tbody>
                    {tableData.map((rowData, index) => (
                        <tr key={index}>
                            <td>{rowData.id}</td>
                            <td>{rowData.priority}</td>
                            <td>{rowData.problemDescription}</td>
                            <td>{rowData.name}</td>
                            <td>{rowData.roomNumber}</td>
                            <td>{rowData.date}</td>
                            <td>{rowData.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <div className="dash">
            <div className="center container">
                {tableData.length > 0 && createTable()}
            </div>
        </div>
    );
}
