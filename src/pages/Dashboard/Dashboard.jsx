import { useState, useTransition } from "react";

import Header from "@components/layout/Header";
import Sidebar from "@components/layout/Sidebar";
import MainContent from "@components/layout/MainContent";

import Overview from "./Overview";
import Sales from "./Sales";
import Users from "./Users";
import Analytics from "./Analytics";

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState("overview");

    // 🔹 period selector
    const [period, setPeriod] = useState("monthly");

    // 🔹 global refresh key
    const [refreshKey, setRefreshKey] = useState(0);

    // 🔹 global loading indicator
    const [isPending, startTransition] = useTransition();

    const reloadAllData = () => {
        startTransition(() => {
            setRefreshKey((k) => k + 1);
        });
    };

    const [filters, setFilters] = useState({
        categories: [],
        regions: [],
        maxPrice: 50000,
    });

    return (
        <div className="dashboard">
            <Header
                period={period}
                onPeriodChange={setPeriod}
                onRefresh={reloadAllData}
                isLoading={isPending}
            />

            <div className="dashboard-body">
                <Sidebar
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                    filters={filters}
                    onFiltersChange={setFilters}
                />

                <MainContent>
                    {activeSection === "overview" && (
                        <Overview
                            period={period}
                            refreshKey={refreshKey}
                        />
                    )}

                    {activeSection === "sales" && (
                        <Sales
                            period={period}
                            refreshKey={refreshKey}
                        />
                    )}

                    {activeSection === "users" && (
                        <Users
                            period={period}
                            refreshKey={refreshKey}
                        />
                    )}

                    {activeSection === "analytics" && (
                        <Analytics
                            period={period}
                            refreshKey={refreshKey}
                        />
                    )}
                </MainContent>
            </div>
        </div>
    );
}
