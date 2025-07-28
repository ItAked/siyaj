/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { useEffect, useRef } from "react";

// Fix for Leaflet's default icon in Next.js
const DefaultIcon = L.icon({
  iconUrl: 'leaflet/dist/images/marker-icon.png',
  iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Map() {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Set the default icon
    L.Marker.prototype.options.icon = DefaultIcon;
    
    // Cleanup
    return () => {
      if (mapRef.current) {
        (mapRef.current as any)._map = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-80 relative z-0">
      <MapContainer 
        ref={mapRef}
        center={[24.709564738208442, 46.702315836546354]} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        <Marker position={[24.709564738208442, 46.702315836546354]}>
          <Popup>المقر الرئيسي</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}