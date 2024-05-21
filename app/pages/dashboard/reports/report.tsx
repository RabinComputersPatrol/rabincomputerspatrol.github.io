"use client";

import { getAllDocuments } from "@/app/api/firebase";
import React, { useEffect, useState } from "react";

export function ReportPage() {
    const [reportID, setReportID] = useState<number | null>(null);
    const [reportData, setReportData] = useState<any>(null);

    useEffect(() => {
        async function fetchData(id: number) {
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

            return rawData.find(data => Number.parseInt(data.id) == id);
        }

        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("reportID");
            if (id) {
                const fetchReportData = async () => {
                    const data = await fetchData(Number.parseInt(id));
                    setReportID(Number.parseInt(id));
                    setReportData(data);
                };
                fetchReportData();
            }
        }
    }, []);

    return (
        <div>
            <div>Report ID: {reportID}</div>
            console.log("Report ID Worked!");
            
            <div>Report Data: {JSON.stringify(reportData)}</div>
            console.log("Report Data Worked!");

        </div>
    );
}
