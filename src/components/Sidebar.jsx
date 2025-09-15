// components/Sidebar.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../redux/sidebarSlice';

const Sidebar = () => {
    const activeTab = useSelector((state) => state.sidebar.activeTab);
    const dispatch = useDispatch();

    const tabs = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'charts', icon: '📊', label: 'Charts' },
        { id: 'tables', icon: '📋', label: 'Tables' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <div className="w-16 bg-gradient-to-b from-orange-500 to-orange-600 flex flex-col items-center py-6 space-y-8">
            <div className="text-white text-2xl mb-4">
                <span>📈</span>
            </div>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`p-3 rounded-lg transition-all duration-200 ${activeTab === tab.id ? 'bg-orange-700' : 'hover:bg-orange-400'
                        }`}
                    onClick={() => dispatch(setActiveTab(tab.id))}
                    title={tab.label}
                >
                    <span className="text-xl text-white">{tab.icon}</span>
                </button>
            ))}
        </div>
    );
};

export default Sidebar;