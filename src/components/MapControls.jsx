// components/MapControls.js
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapControls = () => {
    const map = useMap();

    useEffect(() => {
        // Add custom control
        const zoomControl = L.control.zoom({
            position: 'topright'
        });
        zoomControl.addTo(map);

        return () => {
            map.removeControl(zoomControl);
        };
    }, [map]);

    return null;
};

export default MapControls;