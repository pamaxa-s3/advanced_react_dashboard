import { useState } from "react";
import { ThemeProvider } from "@context/ThemeContext";

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
            <div
                className="dashboard"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh"
                }}
            >
                <Header />
                <div
                    className="dashboard-body"
                    style={{ display: "flex", flex: 1, overflow: "hidden" }}
                >
                    <Sidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />
                    <MainContent>
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
