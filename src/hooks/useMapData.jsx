// hooks/useMapData.js
import { useState, useEffect } from 'react';

const useMapData = () => {
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        // This is where you would fetch real data from an API
        const data = [
            { position: [40.7128, -74.006], value: 95, name: 'North America', fill: '#8884d8' },
            { position: [51.5074, -0.1278], value: 87, name: 'Europe', fill: '#82ca9d' },
            { position: [35.6895, 139.6917], value: 78, name: 'Asia', fill: '#ff7300' },
            { position: [-23.5505, -46.6333], value: 65, name: 'South America', fill: '#ffc658' },
            { position: [-33.8688, 151.2093], value: 60, name: 'Australia', fill: '#d084d0' },
            { position: [0, 20], value: 72, name: 'Africa', fill: '#8dd1e1' },
        ];
        setMapData(data);
    }, []);

    return mapData;
};

export default useMapData;