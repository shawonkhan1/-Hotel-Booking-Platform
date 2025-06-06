import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Maps = () => {
  const position = [23.7461, 90.3747];

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>DhanMondi,Dhaka</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
