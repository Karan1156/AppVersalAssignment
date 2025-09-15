// components/DataTables.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataTables = () => {
    const topCampaigns = [
        { name: 'Summer Sale', value: 12000, growth: 15 },
        { name: 'Product Launch', value: 9800, growth: 22 },
        { name: 'Email Campaign', value: 7600, growth: 8 },
        { name: 'Social Media', value: 6500, growth: 12 },
        { name: 'Referral Program', value: 5200, growth: 5 },
    ];

    const changesData = [
        { name: 'Direct', value: 12, growth: 15 },
        { name: 'Organic', value: 9, growth: 8 },
        { name: 'Social', value: 7, growth: 22 },
        { name: 'Email', value: 6, growth: -3 },
        { name: 'Referral', value: 5, growth: 5 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Campaigns */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold text-gray-700 mb-4">Top Campaigns</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {topCampaigns.map((campaign, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${campaign.value.toLocaleString()}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {campaign.growth >= 0 ? '+' : ''}{campaign.growth}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Changes Bar Chart */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold text-gray-700 mb-4">Channel Growth</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={changesData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="growth" fill="#8884d8" name="Growth %" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DataTables;