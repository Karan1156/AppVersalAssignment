// components/Header.js
import React from 'react';

const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Overview Dashboard</h1>
            <div className="flex space-x-4">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>Q2 Marketing Report.pdf</option>
                    <option>Q1 Marketing Report.pdf</option>
                    <option>Annual Summary.pdf</option>
                </select>
                <div className="border border-gray-300 rounded-md px-3 py-2 text-sm flex items-center">
                    <span className="text-gray-600">Jan 1, 2025 - Jun 30, 2025</span>
                    <span className="ml-2 text-gray-500">📅</span>
                </div>
            </div>
        </header>
    );
};

export default Header;