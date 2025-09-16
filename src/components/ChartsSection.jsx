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
import WorldMap from '@svg-maps/world';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';

// Sample countries with performance data
const countriesData = {
  IN: {
    name: 'India',
    performance: 82,
    fill: '#ff7300',
    details: {
      clicks: 12500,
      impressions: 185000,
      spend: 4200,
      conversions: 345,
      ctr: 6.8,
      revenue: 12500,
    },
  },
  US: {
    name: 'United States',
    performance: 92,
    fill: '#00C49F',
    details: {
      clicks: 18500,
      impressions: 245000,
      spend: 8200,
      conversions: 520,
      ctr: 7.6,
      revenue: 21500,
    },
  },
  GB: {
    name: 'United Kingdom',
    performance: 78,
    fill: '#0088FE',
    details: {
      clicks: 8500,
      impressions: 120000,
      spend: 3100,
      conversions: 210,
      ctr: 7.1,
      revenue: 9800,
    },
  },
  AU: {
    name: 'Australia',
    performance: 85,
    fill: '#FFBB28',
    details: {
      clicks: 7200,
      impressions: 95000,
      spend: 2800,
      conversions: 180,
      ctr: 7.6,
      revenue: 8500,
    },
  },
  DE: {
    name: 'Germany',
    performance: 76,
    fill: '#FF8042',
    details: {
      clicks: 6800,
      impressions: 88000,
      spend: 2400,
      conversions: 150,
      ctr: 7.7,
      revenue: 7200,
    },
  },
};

const indiaTrendData = [
  { name: 'Jan', clicks: 1850, impressions: 28000, spend: 2800, conversions: 210 },
  { name: 'Feb', clicks: 2100, impressions: 32000, spend: 3100, conversions: 235 },
  { name: 'Mar', clicks: 2450, impressions: 36500, spend: 3450, conversions: 265 },
  { name: 'Apr', clicks: 2780, impressions: 41000, spend: 3800, conversions: 290 },
  { name: 'May', clicks: 3120, impressions: 45500, spend: 4150, conversions: 315 },
  { name: 'Jun', clicks: 3450, impressions: 50000, spend: 4500, conversions: 340 },
];

const ChartsSection = () => {
  const [timeRange, setTimeRange] = useState('last6months');
  const [selectedCountry, setSelectedCountry] = useState('IN');

  const handleCountryClick = (event) => {
    const code = event.target.id;
    if (countriesData[code]) {
      setSelectedCountry(code);
    }
  };

  const selectedData = countriesData[selectedCountry];

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
        {/* World Map */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">Global Performance Overview</h2>
          <div className="h-96 rounded-md overflow-hidden relative">
            <SVGMap
              map={WorldMap}
              onLocationClick={handleCountryClick}
              locationClassName={(loc) =>
                countriesData[loc.id] ? 'cursor-pointer' : 'fill-gray-200'
              }
            />
          </div>

          {/* Selected country performance summary */}
          {selectedData && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">{selectedData.name} Perf.</p>
                <p className="text-xl font-bold text-orange-600">{selectedData.performance}%</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Spend</p>
                <p className="text-xl font-bold text-blue-600">
                  ${selectedData.details.spend.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Revenue</p>
                <p className="text-xl font-bold text-green-600">
                  ${selectedData.details.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* India Trends */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-4">India Performance Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={indiaTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'spend') return [`$${value.toLocaleString()}`, 'Spend'];
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
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
