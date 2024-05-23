"use client"

import React, { useEffect, useState, useRef } from "react";
import { getAllDocuments } from "@/app/api/firebase";
import { getStatusClass } from "../dashboard.client";
import { writeDoc } from "@/app/api/firebase";

export default function ReportPage() {
    const [reportID, setReportID] = useState<number | null>(null);
    const [reportData, setReportData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
    const selectRef = useRef<HTMLSelectElement>(null); // Ref for select element

    useEffect(() => {
        async function fetchData(id: number) {
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

                return rawData.find(data => Number.parseInt(data.id) === id);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("reportID");
            if (id) {
                const fetchReportData = async () => {
                    const data = await fetchData(Number.parseInt(id));
                    setReportID(Number.parseInt(id));
                    setReportData(data);
                    setSelectedStatus(data?.fixed || null);
                };
                fetchReportData();
            }
        }
    }, []);

    const handleEditButtonClick = () => {
        setIsEditing(true);
        if (selectRef.current) {
            selectRef.current.size = 3; // Set size attribute to open the dropdown
        }
    };

    const handleStatusChange = (status: number) => {
        setSelectedStatus(status);
        setIsEditing(false);
        const updatedData = {
            ...reportData,
            fixed: status   
        };
        setReportData(updatedData);
        writeDoc("dummy", updatedData, reportID?.toString());
    };
    

    return (
        <div className="report-container">
            <div>Report ID: {reportID}</div>
            {reportData && (
                <div>
                    <div className="report-header">
                        <div>Name: {reportData.name}</div>
                        <div>Phone: {reportData.phoneNumber}</div>
                    </div>
                    <div className="report-description">Description: {reportData.problemDescription}</div>
                    <div className="report-details">
                        <div>Room: {reportData.roomNumber}</div>
                        <div>Priority: {reportData.priority}</div>
                        {isEditing ? (
                            <div className="status-edit-dropdown">
                                <select 
                                    value={selectedStatus?.toString() || ''} 
                                    onChange={(e) => handleStatusChange(parseInt(e.target.value))}
                                    ref={selectRef} // Attach ref to select element
                                >
                                    <option value={1}>Not Fixed</option>
                                    <option value={2}>In Progress</option>
                                    <option value={3}>Fixed</option>
                                </select>
                            </div>
                        ) : (
                            <div className={`report-status ${getStatusClass(reportData.fixed)}`}>
                                {reportData.fixed === 3 ? "Fixed" : reportData.fixed === 2 ? "In Progress" : reportData.fixed === 1 ? "Not Fixed" : "Error"}
                                <button onClick={handleEditButtonClick} className="status-edit-button">Edit</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
