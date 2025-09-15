// components/SummaryCards.js
import React from 'react';

const SummaryCards = () => {
    const stats = [
        { label: 'Spend', value: '$24,563', trend: '+12%' },
        { label: 'Clicks', value: '18,492', trend: '+8%' },
        { label: 'Impressions', value: '2.8M', trend: '+5%' },
        { label: 'CTR', value: '4.62%', trend: '+2%' },
        { label: 'CPC', value: '$0.42', trend: '-3%' },
        { label: 'Conversions', value: '892', trend: '+15%' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <div className="flex items-baseline justify-between">
                        <p className="font-bold text-xl">{stat.value}</p>
                        <span className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.trend}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;