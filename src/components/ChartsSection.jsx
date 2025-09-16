// components/ChartsSection.js
import React, { useState } from 'react';
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
import { MapContainer, TileLayer, Polygon, Popup, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for India
const indiaIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// More accurate coordinates for India's outline
const indiaCoordinates = [
    [37.06, 68.18], // Jammu & Kashmir
    [32.76, 74.85], // Punjab border
    [27.70, 81.65], // Uttar Pradesh border
    [23.70, 68.90], // Gujarat
    [15.50, 73.80], // Goa
    [8.10, 77.55],  // Tamil Nadu
    [7.95, 93.55],  // Andaman Islands
    [27.50, 96.85], // Arunachal Pradesh
    [28.50, 77.25], // New Delhi
    [37.06, 68.18]  // Back to start
];

// Major Indian cities with performance data
const indianCities = [
    {
        name: 'Mumbai',
        position: [19.0760, 72.8777],
        performance: 88,
        details: {
            clicks: 4200,
            impressions: 65000,
            spend: 1500,
            conversions: 125,
            ctr: 6.5,
            revenue: 4800
        }
    },
    {
        name: 'Delhi',
        position: [28.7041, 77.1025],
        performance: 82,
        details: {
            clicks: 3800,
            impressions: 58000,
            spend: 1350,
            conversions: 110,
            ctr: 6.6,
            revenue: 4200
        }
    },
    {
        name: 'Bangalore',
        position: [12.9716, 77.5946],
        performance: 91,
        details: {
            clicks: 3200,
            impressions: 45000,
            spend: 1100,
            conversions: 95,
            ctr: 7.1,
            revenue: 3800
        }
    },
    {
        name: 'Chennai',
        position: [13.0827, 80.2707],
        performance: 79,
        details: {
            clicks: 1800,
            impressions: 28000,
            spend: 650,
            conversions: 55,
            ctr: 6.4,
            revenue: 2100
        }
    },
    {
        name: 'Kolkata',
        position: [22.5726, 88.3639],
        performance: 75,
        details: {
            clicks: 1500,
            impressions: 22000,
            spend: 550,
            conversions: 45,
            ctr: 6.8,
            revenue: 1800
        }
    }
];

// Sample data for other countries to show on world map
const countriesData = [
    {
        name: 'United States',
        position: [37.0902, -95.7129],
        performance: 92,
        fill: '#00C49F',
        details: {
            clicks: 18500,
            impressions: 245000,
            spend: 8200,
            conversions: 520,
            ctr: 7.6,
            revenue: 21500
        }
    },
    {
        name: 'United Kingdom',
        position: [55.3781, -3.4360],
        performance: 78,
        fill: '#0088FE',
        details: {
            clicks: 8500,
            impressions: 120000,
            spend: 3100,
            conversions: 210,
            ctr: 7.1,
            revenue: 9800
        }
    },
    {
        name: 'Australia',
        position: [-25.2744, 133.7751],
        performance: 85,
        fill: '#FFBB28',
        details: {
            clicks: 7200,
            impressions: 95000,
            spend: 2800,
            conversions: 180,
            ctr: 7.6,
            revenue: 8500
        }
    },
    {
        name: 'Germany',
        position: [51.1657, 10.4515],
        performance: 76,
        fill: '#FF8042',
        details: {
            clicks: 6800,
            impressions: 88000,
            spend: 2400,
            conversions: 150,
            ctr: 7.7,
            revenue: 7200
        }
    }
];

const ChartsSection = () => {
    const [timeRange, setTimeRange] = useState('last6months');

    // India-specific data
    const indiaData = {
        name: 'India',
        position: [20.5937, 78.9629],
        performance: 82,
        fill: '#ff7300',
        details: {
            clicks: 12500,
            impressions: 185000,
            spend: 4200,
            conversions: 345,
            ctr: 6.8,
            revenue: 12500
        }
    };

    // India performance trend data with spend
    const indiaTrendData = [
        { name: 'Jan', clicks: 1850, impressions: 28000, spend: 2800, conversions: 210 },
        { name: 'Feb', clicks: 2100, impressions: 32000, spend: 3100, conversions: 235 },
        { name: 'Mar', clicks: 2450, impressions: 36500, spend: 3450, conversions: 265 },
        { name: 'Apr', clicks: 2780, impressions: 41000, spend: 3800, conversions: 290 },
        { name: 'May', clicks: 3120, impressions: 45500, spend: 4150, conversions: 315 },
        { name: 'Jun', clicks: 3450, impressions: 50000, spend: 4500, conversions: 340 },
    ];

    return (
        <div className="space-y-6 mb-6">
            {/* Time Range Selector */}
            <div className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center">
                <h2 className="font-semibold text-gray-700">Global Performance Dashboard</h2>
                <select
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    <option value="lastmonth">Last Month</option>
                    <option value="last3months">Last 3 Months</option>
                    <option value="last6months">Last 6 Months</option>
                    <option value="lastyear">Last Year</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* World Map Visualization */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h2 className="font-semibold text-gray-700 mb-4">Global Performance Overview</h2>
                    <div className="h-96 rounded-md overflow-hidden relative">
                        <MapContainer
                            center={[23, 80]}
                            zoom={4}
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                            className="rounded-lg"
                            minZoom={3}
                            maxBounds={[[-90, -180], [90, 180]]}
                            maxBoundsViscosity={1.0}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <ZoomControl position="bottomright" />

                            {/* India outline with more accurate shape */}
                            <Polygon
                                positions={indiaCoordinates}
                                pathOptions={{
                                    color: '#ff7300',
                                    fillColor: '#ff7300',
                                    fillOpacity: 0.4,
                                    weight: 2,
                                }}
                            >
                                <Popup className="custom-popup">
                                    <div className="text-sm">
                                        <h3 className="font-bold text-lg mb-2">India Performance Summary</h3>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Overall Performance:</span>
                                                <span className="font-semibold">{indiaData.performance}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Clicks:</span>
                                                <span className="font-semibold">{indiaData.details.clicks.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Impressions:</span>
                                                <span className="font-semibold">{indiaData.details.impressions.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Spend:</span>
                                                <span className="font-semibold">${indiaData.details.spend.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Revenue:</span>
                                                <span className="font-semibold">${indiaData.details.revenue.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">ROI:</span>
                                                <span className="font-semibold">
                                                    {((indiaData.details.revenue / indiaData.details.spend) * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            </Polygon>

                            {/* Markers for Indian cities */}
                            {indianCities.map((city, index) => (
                                <Marker
                                    key={`city-${index}`}
                                    position={city.position}
                                    icon={new L.Icon({
                                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                        iconSize: [20, 32],
                                        iconAnchor: [10, 32],
                                        popupAnchor: [1, -28],
                                        shadowSize: [32, 32]
                                    })}
                                >
                                    <Popup>
                                        <div className="text-sm">
                                            <h3 className="font-bold">{city.name}</h3>
                                            <div className="space-y-1">
                                                <div className="flex justify-between">
                                                    <span>Performance:</span>
                                                    <span className="font-semibold">{city.performance}%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Spend:</span>
                                                    <span className="font-semibold">${city.details.spend.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Revenue:</span>
                                                    <span className="font-semibold">${city.details.revenue.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}

                            {/* Markers for other countries */}
                            {countriesData.map((country, index) => (
                                <Marker
                                    key={`country-${index}`}
                                    position={country.position}
                                    icon={new L.Icon({
                                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                        iconSize: [25, 41],
                                        iconAnchor: [12, 41],
                                        popupAnchor: [1, -34],
                                        shadowSize: [41, 41]
                                    })}
                                >
                                    <Popup>
                                        <div className="text-sm">
                                            <h3 className="font-bold">{country.name}</h3>
                                            <div className="space-y-1">
                                                <div className="flex justify-between">
                                                    <span>Performance:</span>
                                                    <span className="font-semibold">{country.performance}%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Spend:</span>
                                                    <span className="font-semibold">${country.details.spend.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Revenue:</span>
                                                    <span className="font-semibold">${country.details.revenue.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>ROI:</span>
                                                    <span className="font-semibold">
                                                        {((country.details.revenue / country.details.spend) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Map overlay legend */}
                        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-500">
                            <h4 className="text-xs font-semibold mb-2">Performance Legend</h4>
                            <div className="space-y-1">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 rounded-full mr-2 bg-orange-500"></div>
                                    <span className="text-xs">India Region</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                                    <span className="text-xs">Indian Cities</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 rounded-full mr-2 bg-blue-500"></div>
                                    <span className="text-xs">Other Countries</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance summary */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="bg-orange-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">India Performance</p>
                            <p className="text-xl font-bold text-orange-600">{indiaData.performance}%</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">India Spend</p>
                            <p className="text-xl font-bold text-blue-600">${indiaData.details.spend.toLocaleString()}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500">India Revenue</p>
                            <p className="text-xl font-bold text-green-600">${indiaData.details.revenue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* India Performance Trends with Spend */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h2 className="font-semibold text-gray-700 mb-4">India Performance Trends</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={indiaTrendData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip 
                                formatter={(value, name) => {
                                    if (name === 'spend') {
                                        return [`$${value.toLocaleString()}`, 'Spend'];
                                    }
                                    return [value, name.charAt(0).toUpperCase() + name.slice(1)];
                                }}
                            />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="clicks"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                                strokeWidth={2}
                                name="Clicks"
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="conversions"
                                stroke="#82ca9d"
                                activeDot={{ r: 8 }}
                                strokeWidth={2}
                                name="Conversions"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="spend"
                                stroke="#ff7300"
                                activeDot={{ r: 8 }}
                                strokeWidth={2}
                                name="Spend"
                                strokeDasharray="4 4"
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Additional metrics cards */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="bg-purple-50 p-2 rounded-lg">
                            <p className="text-xs text-gray-500">Total Clicks</p>
                            <p className="font-bold text-purple-600">
                                {indiaTrendData.reduce((sum, month) => sum + month.clicks, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-green-50 p-2 rounded-lg">
                            <p className="text-xs text-gray-500">Total Conversions</p>
                            <p className="font-bold text-green-600">
                                {indiaTrendData.reduce((sum, month) => sum + month.conversions, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded-lg">
                            <p className="text-xs text-gray-500">Total Spend</p>
                            <p className="font-bold text-orange-600">
                                ${indiaTrendData.reduce((sum, month) => sum + month.spend, 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;
