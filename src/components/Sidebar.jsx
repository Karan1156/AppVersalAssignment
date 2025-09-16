// components/Sidebar.js (alternative version)
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../redux/sidebarSlice';

const Sidebar = () => {
    const activeTab = useSelector((state) => state.sidebar.activeTab);
    const dispatch = useDispatch();

    const tabs = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'charts', icon: '📊', label: 'Charts' },
        { id: 'gallery', icon: '🖼️', label: 'Gallery' },
        { id: 'cluster', icon: '🔲', label: 'Cluster View' },
        { id: 'tables', icon: '📋', label: 'Tables' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
    ];

    // 4-square cluster component
    const FourSquareCluster = () => (
        <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
            <div className="bg-white rounded-sm opacity-80"></div>
            <div className="bg-white rounded-sm opacity-80"></div>
            <div className="bg-white rounded-sm opacity-80"></div>
            <div className="bg-white rounded-sm opacity-80"></div>
        </div>
    );

    return (
        <div className="w-16 bg-gradient-to-b from-orange-500 to-orange-600 flex flex-col items-center py-6 space-y-8">
            {/* User Profile with Avatar */}
            <div className="flex flex-col items-center mb-4">
                <div className="relative">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <span className="text-orange-500 text-lg">👤</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-orange-600"></div>
                </div>
                <span className="text-xs text-white mt-1 font-medium">John D.</span>
                <span className="text-xs text-orange-200">Admin</span>
            </div>

            {/* Divider */}
            <div className="w-8 h-0.5 bg-orange-400 rounded-full"></div>

            {/* Navigation Tabs */}
            <div className="flex flex-col space-y-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
                            activeTab === tab.id 
                                ? 'bg-orange-700 shadow-inner' 
                                : 'hover:bg-orange-400 hover:shadow-md'
                        }`}
                        onClick={() => dispatch(setActiveTab(tab.id))}
                        title={tab.label}
                    >
                        {tab.id === 'cluster' ? (
                            <FourSquareCluster />
                        ) : (
                            <span className="text-xl text-white">{tab.icon}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Spacer to push bottom items down */}
            <div className="flex-grow"></div>

            {/* Bottom Action Items */}
        </div>
    );
};

export default Sidebar;