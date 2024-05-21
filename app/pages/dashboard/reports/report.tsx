"use client"

import React, { useEffect, useState } from "react";
export function ReportPage() {
    const [reportID, setReportID] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("reportID");
            if (id) {
                setReportID(Number.parseInt(id));
            }
        }
    }, []);

    return (
        <div>
            Report ID: {reportID}
        </div>
    );
}
