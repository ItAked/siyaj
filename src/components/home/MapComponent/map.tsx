/* eslint-disable @typescript-eslint/no-require-imports */
'use client'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet"

export default function Map(){
    delete (L.Icon.Default.prototype as unknown)._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
    
    return (
        <MapContainer className="w-full h-80" center={[24.709564738208442, 46.702315836546354]} zoom={13} scrollWheelZoom={false}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[24.709564738208442, 46.702315836546354]}>
                <Popup>المقر الرئيسي</Popup>
            </Marker>
        </MapContainer>
    )
}