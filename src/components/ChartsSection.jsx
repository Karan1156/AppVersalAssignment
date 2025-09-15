// components/ChartsSection.js
import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ChartsSection = () => {
    // Sample data
    const trendData = [
        { name: 'Jan', clicks: 2450, impressions: 2400, spend: 3200 },
        { name: 'Feb', clicks: 2980, impressions: 2800, spend: 3800 },
        { name: 'Mar', clicks: 3560, impressions: 3200, spend: 4100 },
        { name: 'Apr', clicks: 3780, impressions: 3500, spend: 4300 },
        { name: 'May', clicks: 4120, impressions: 3800, spend: 4800 },
        { name: 'Jun', clicks: 4890, impressions: 4200, spend: 5200 },
    ];

    // Geographical data with coordinates and values
    const mapData = [
        { position: [40.7128, -74.006], value: 95, name: 'North America', fill: '#8884d8' },
        { position: [51.5074, -0.1278], value: 87, name: 'Europe', fill: '#82ca9d' },
        { position: [35.6895, 139.6917], value: 78, name: 'Asia', fill: '#ff7300' },
        { position: [-23.5505, -46.6333], value: 65, name: 'South America', fill: '#ffc658' },
        { position: [-33.8688, 151.2093], value: 60, name: 'Australia', fill: '#d084d0' },
        { position: [0, 20], value: 72, name: 'Africa', fill: '#8dd1e1' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* World Map Visualization with Leaflet */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold text-gray-700 mb-4">Regional Performance</h2>
                <div className="h-64 rounded-md overflow-hidden">
                    <MapContainer
                        center={[20, 0]}
                        zoom={2}
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {mapData.map((item, index) => (
                            <Circle
                                key={index}
                                center={item.position}
                                radius={item.value * 10000}
                                pathOptions={{
                                    color: item.fill,
                                    fillColor: item.fill,
                                    fillOpacity: 0.6,
                                    weight: 2,
                                }}
                            >
                                <Popup>
                                    <div className="text-sm font-medium">
                                        {item.name}: {item.value}%
                                    </div>
                                </Popup>
                            </Circle>
                        ))}
                    </MapContainer>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {mapData.map(({ name, value, fill }) => (
                        <div key={name} className="flex items-center">
                            <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: fill }}
                            ></div>
                            <span className="text-xs text-gray-600">{name}: {value}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Line Chart */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold text-gray-700 mb-4">Performance Trends</h2>
                <ResponsiveContainer width="100%" height={256}>
                    <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="spend" stroke="#ff7300" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartsSection;