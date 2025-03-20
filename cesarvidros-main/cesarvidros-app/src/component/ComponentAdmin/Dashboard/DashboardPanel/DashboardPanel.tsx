import { lazy } from "react";
import React from "react";

const ConversionCharts = lazy(() => import("../DashboardCard/ConversionCharts"));

const DashboardPanel = () => {
    return (
        <>
            <ConversionCharts />
        </>
    )
}

export default DashboardPanel;