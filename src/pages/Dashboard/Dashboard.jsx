import { useState } from "react";
import { ThemeProvider } from "@contexts/ThemeContext";

import Header from "@components/layout/Header";
import Sidebar from "@components/layout/Sidebar";
import MainContent from "@components/layout/MainContent";
import Overview from "./Overview";
import Sales from "./Sales";
import Users from "./Users";
import Analytics from "./Analytics";

export default function Dashboard() {
    const [activeSection, setActiveSection] = useState("overview");

    return (
        <ThemeProvider>
            <div className="dashboard">
                <Header />

                <div className="dashboard-body">
                    <Sidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />

                    <MainContent className="main-content">
                        {activeSection === "overview" && <Overview />}
                        {activeSection === "sales" && <Sales />}
                        {activeSection === "users" && <Users />}
                        {activeSection === "analytics" && <Analytics />}
                    </MainContent>
                </div>
            </div>
        </ThemeProvider>
    );
}
