// components/MapControls.js
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const MapControls = ({
    zoom = true,
    zoomPosition = 'topright',
    scale = false,
    scalePosition = 'bottomleft',
    attribution = true,
    ...controlOptions
}) => {
    const map = useMap();
    const controlsRef = useRef([]);

    useEffect(() => {
        const controls = [];

        // Add zoom control
        if (zoom) {
            const zoomControl = L.control.zoom({
                position: zoomPosition,
                ...controlOptions
            });
            zoomControl.addTo(map);
            controls.push(zoomControl);
        }

        // Add scale control
        if (scale) {
            const scaleControl = L.control.scale({
                position: scalePosition,
                ...controlOptions
            });
            scaleControl.addTo(map);
            controls.push(scaleControl);
        }

        // Store controls reference
        controlsRef.current = controls;

        // Cleanup function
        return () => {
            controlsRef.current.forEach(control => {
                map.removeControl(control);
            });
        };
    }, [map, zoom, zoomPosition, scale, scalePosition, controlOptions]);

    return null;
};

export default MapControls;