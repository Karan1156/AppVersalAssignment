import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, ZoomControl, useMap } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const indiaIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const countryIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// India coordinates
const indiaCoordinates = [
  [37.06, 68.18], [32.76, 74.85], [27.70, 81.65],
  [23.70, 68.90], [15.50, 73.80], [8.10, 77.55],
  [7.95, 93.55], [27.50, 96.85], [28.50, 77.25],
  [37.06, 68.18]
];

// Sample data
const indianCities = [
  {
    name: 'Mumbai',
    position: [19.0760, 72.8777],
    performance: 88,
    details: {
      clicks: 4200, impressions: 65000, spend: 1500,
      conversions: 125, ctr: 6.5, revenue: 4800
    }
  },
  {
    name: 'Delhi',
    position: [28.7041, 77.1025],
    performance: 82,
    details: {
      clicks: 3800, impressions: 58000, spend: 1350,
      conversions: 110, ctr: 6.6, revenue: 4200
    }
  },
  {
    name: 'Bangalore',
    position: [12.9716, 77.5946],
    performance: 91,
    details: {
      clicks: 3200, impressions: 45000, spend: 1100,
      conversions: 95, ctr: 7.1, revenue: 3800
    }
  }
];

const countriesData = [
  {
    name: 'United States',
    position: [37.0902, -95.7129],
    performance: 92,
    details: {
      clicks: 18500, impressions: 245000, spend: 8200,
      conversions: 520, ctr: 7.6, revenue: 21500
    }
  },
  {
    name: 'United Kingdom',
    position: [55.3781, -3.4360],
    performance: 78,
    details: {
      clicks: 8500, impressions: 120000, spend: 3100,
      conversions: 210, ctr: 7.1, revenue: 9800
    }
  }
];

const indiaTrendData = [
  { name: 'Jan', clicks: 1850, impressions: 28000, spend: 2800, conversions: 210 },
  { name: 'Feb', clicks: 2100, impressions: 32000, spend: 3100, conversions: 235 },
  { name: 'Mar', clicks: 2450, impressions: 36500, spend: 3450, conversions: 265 },
  { name: 'Apr', clicks: 2780, impressions: 41000, spend: 3800, conversions: 290 },
  { name: 'May', clicks: 3120, impressions: 45500, spend: 4150, conversions: 315 },
  { name: 'Jun', clicks: 3450, impressions: 50000, spend: 4500, conversions: 340 },
];

const indiaData = {
  name: 'India',
  position: [20.5937, 78.9629],
  performance: 82,
  details: {
    clicks: 12500, impressions: 185000, spend: 4200,
    conversions: 345, ctr: 6.8, revenue: 12500
  }
};

// Component to handle map initialization and resizing
function MapEffect() {
  const map = useMap();
  
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}

const GlobalDashboard = () => {
  const [timeRange, setTimeRange] = useState('last6months');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Global Performance Dashboard</h1>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-auto"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="lastmonth">Last Month</option>
            <option value="last3months">Last 3 Months</option>
            <option value="last6months">Last 6 Months</option>
            <option value="lastyear">Last Year</option>
          </select>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Global Performance Overview</h2>
            <div className="h-96 rounded-md overflow-hidden relative">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <MapEffect />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />
                
                {/* India outline */}
                <Polygon
                  positions={indiaCoordinates}
                  pathOptions={{
                    color: '#ff7300',
                    fillColor: '#ff7300',
                    fillOpacity: 0.4,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <h3 className="font-bold text-lg mb-2">India Performance Summary</h3>
                      <p>Performance: {indiaData.performance}%</p>
                      <p>Clicks: {indiaData.details.clicks.toLocaleString()}</p>
                      <p>Revenue: ${indiaData.details.revenue.toLocaleString()}</p>
                    </div>
                  </Popup>
                </Polygon>

                {/* Indian cities */}
                {indianCities.map((city, index) => (
                  <Marker key={`city-${index}`} position={city.position} icon={indiaIcon}>
                    <Popup>
                      <div className="text-sm">
                        <h3 className="font-bold">{city.name}</h3>
                        <p>Performance: {city.performance}%</p>
                        <p>Revenue: ${city.details.revenue.toLocaleString()}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Other countries */}
                {countriesData.map((country, index) => (
                  <Marker key={`country-${index}`} position={country.position} icon={countryIcon}>
                    <Popup>
                      <div className="text-sm">
                        <h3 className="font-bold">{country.name}</h3>
                        <p>Performance: {country.performance}%</p>
                        <p>Revenue: ${country.details.revenue.toLocaleString()}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-50">
                <h4 className="text-xs font-semibold mb-2">Performance Legend</h4>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2 bg-orange-500"></div>
                    <span className="text-xs">India Region</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 bg-red-500"></div>
                    <span className="text-xs">Indian Cities</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2 bg-blue-500"></div>
                    <span className="text-xs">Other Countries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance metrics */}
            <div className="grid grid-cols-3 gap-2 mt-4">
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

          {/* Chart Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">India Performance Trends</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
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
            </div>

            {/* Additional metrics */}
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
    </div>
  );
};

export default GlobalDashboard;
