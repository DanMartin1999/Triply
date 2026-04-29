import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

// 🔥 Tracks zoom level
function ZoomHandler({ setZoom }) {
  useMapEvents({
    zoomend: (e) => {
      setZoom(e.target.getZoom());
    },
  });
  return null;
}

export default function MapPage() {
  const [zoom, setZoom] = useState(2);

  // 🌍 Global locations
  const locations = [
    {
      name: "Union, NJ",
      coords: [40.6976, -74.2632],
      image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
    },
    {
      name: "Panama",
      coords: [8.9824, -79.5199],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    {
      name: "Barbados",
      coords: [13.1939, -59.5432],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    {
      name: "Madrid",
      coords: [40.4168, -3.7038],
      image: "https://images.unsplash.com/photo-1543340713-8e8d1b9d1b5d"
    },
    {
      name: "Tokyo",
      coords: [35.6762, 139.6503],
      image: "https://images.unsplash.com/photo-1505066836043-7f2a6f96b0f4"
    }
  ];

  // 🇪🇸 Madrid detailed spots (hotels + restaurants)
  const madridSpots = [
    {
      name: "Hotel Riu Plaza España",
      coords: [40.4232, -3.7114],
      type: "Hotel",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    {
      name: "Gran Vía Restaurant",
      coords: [40.4203, -3.7058],
      type: "Restaurant",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
    },
    {
      name: "Mercado de San Miguel",
      coords: [40.4155, -3.7094],
      type: "Food Market",
      image: "https://images.unsplash.com/photo-1555992336-03a23c6a0f5b"
    }
  ];

  return (
    <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
        
        {/* 🔍 Zoom tracking */}
        <ZoomHandler setZoom={setZoom} />

        {/* 🌍 Map tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🌍 Show global locations when zoomed out */}
        {zoom < 5 &&
          locations.map((loc, i) => (
            <Marker key={i} position={loc.coords}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={loc.image}
                    alt={loc.name}
                    style={{
                      width: "120px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "5px"
                    }}
                  />
                  <div style={{ fontWeight: "600" }}>{loc.name}</div>
                </div>
              </Tooltip>
            </Marker>
          ))}

        {/* 🇪🇸 Show Madrid spots when zoomed in */}
        {zoom >= 5 &&
          madridSpots.map((spot, i) => (
            <Marker key={i} position={spot.coords}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={spot.image}
                    alt={spot.name}
                    style={{
                      width: "120px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "5px"
                    }}
                  />
                  <div style={{ fontWeight: "600" }}>{spot.name}</div>
                  <div style={{ fontSize: "12px", color: "#555" }}>
                    {spot.type}
                  </div>
                </div>
              </Tooltip>
            </Marker>
          ))}

      </MapContainer>
    </div>
  );
}