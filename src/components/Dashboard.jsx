// components/Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SummaryCards from './SummaryCards';
import ChartsSection from './ChartsSection';
import DataTables from './DataTables';

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <SummaryCards />
                    <ChartsSection />
                    <DataTables />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;