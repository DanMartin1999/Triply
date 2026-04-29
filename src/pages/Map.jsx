import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔴 Main location icon
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

// 🔵 Hotel icon
const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
});

// 🟢 Restaurant icon
const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

// 🌍 Main locations (zoomed out)
const mainLocations = [
  {
    name: "Madrid",
    coords: [40.4168, -3.7038],
    image: "https://th.bing.com/th/id/R.eafa92f0f4c4230dcb053bc474c78d17?rik=W2WZ4YNaO6DHAQ&riu=http%3a%2f%2fcdn.wallpapersafari.com%2f48%2f51%2fQZgadO.jpg&ehk=mTlbhFs%2fQE4JiKm1%2bWwmqqDul8d4gbFxQGi87WasrFM%3d&risl=&pid=ImgRaw&r=0"
  },
  {
    name: "Panama",
    coords: [8.538, -80.7821],
    image: "https://www.thepinnaclelist.com/wp-content/uploads/2022/06/Panama-City-Skyline-Panama.jpg"
  },
  {
    name: "Barbados",
    coords: [13.1939, -59.5432],
    image: "https://www.sandals.com/blog/content/images/2020/04/Sandals-Royal-Barbados-Main-Pool.jpg"
  },
  {
    name: "Tokyo",
    coords: [35.6762, 139.6503],
    image: "https://cdn.kimkim.com/files/a/images/6077051d16379eab327d03204d2c5d91cda44b25/original-c0d3cfb1770d1639002f327240fc2338.jpg"
  },
  {
    name: "Union, NJ",
    coords: [40.6976, -74.2632],
    image: "https://www.collegeconsensus.com/wp-content/uploads/2016/12/Kean-University.jpg"
  }
];

// 📍 Detailed spots (3 hotels + 3 restaurants each, no Union)
const detailedLocations = [
  // 🇪🇸 Madrid
  { name: "Riu Plaza España", coords: [40.4203, -3.7074], type: "hotel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
  { name: "Madrid EDITION", coords: [40.4154, -3.7072], type: "hotel", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" },
  { name: "Only YOU Atocha", coords: [40.4066, -3.6892], type: "hotel", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd" },

  { name: "DiverXO", coords: [40.4588, -3.6855], type: "restaurant", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0" },
  { name: "Botín", coords: [40.414, -3.7084], type: "restaurant", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" },
  { name: "StreetXO", coords: [40.425, -3.6878], type: "restaurant", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },

  // 🇵🇦 Panama
  { name: "Central Hotel Panama", coords: [8.952, -79.534], type: "hotel", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd" },
  { name: "American Trade Hotel", coords: [8.953, -79.534], type: "hotel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
  { name: "W Panama", coords: [8.98, -79.52], type: "hotel", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" },

  { name: "Maito", coords: [8.98, -79.51], type: "restaurant", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" },
  { name: "Donde José", coords: [8.95, -79.53], type: "restaurant", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
  { name: "Intimo", coords: [8.97, -79.52], type: "restaurant", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0" },

  // 🇧🇧 Barbados
  { name: "Sandy Lane", coords: [13.17, -59.63], type: "hotel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
  { name: "Coral Reef Club", coords: [13.19, -59.64], type: "hotel", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd" },
  { name: "The House", coords: [13.2, -59.65], type: "hotel", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" },

  { name: "The Cliff", coords: [13.2, -59.64], type: "restaurant", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" },
  { name: "Oistins Fish Fry", coords: [13.06, -59.53], type: "restaurant", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
  { name: "Champers", coords: [13.07, -59.56], type: "restaurant", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0" },

  // 🇯🇵 Tokyo
  { name: "Park Hyatt Tokyo", coords: [35.685, 139.691], type: "hotel", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
  { name: "Aman Tokyo", coords: [35.68, 139.76], type: "hotel", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" },
  { name: "The Ritz Tokyo", coords: [35.665, 139.73], type: "hotel", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd" },

  { name: "Sukiyabashi Jiro", coords: [35.67, 139.76], type: "restaurant", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0" },
  { name: "Ichiran Ramen", coords: [35.69, 139.7], type: "restaurant", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
  { name: "Gyukatsu Motomura", coords: [35.66, 139.7], type: "restaurant", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" },
];

// 🔍 Zoom tracker
function ZoomHandler({ setZoom }) {
  const map = useMap();
  map.on("zoomend", () => {
    setZoom(map.getZoom());
  });
  return null;
}

export default function MapPage() {
  const [zoom, setZoom] = useState(3);

  return (
    <MapContainer center={[20, 0]} zoom={3} style={{ height: "600px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ZoomHandler setZoom={setZoom} />

      {/* 🌍 Main markers */}
     {zoom < 6 &&
  mainLocations.map((place, i) => (
    <Marker key={i} position={place.coords} icon={redIcon}>
      
      {/* 🔥 HOVER (shows name) */}
      <Tooltip direction="top" offset={[0, -10]}>
        <strong>{place.name}</strong>
      </Tooltip>

      {/* 🔥 CLICK (shows image) */}
      <Popup>
        <div style={{ textAlign: "center" }}>
          <img
            src={place.image}
            alt={place.name}
            style={{
              width: "150px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "5px"
            }}
          />
          <h4>{place.name}</h4>
        </div>
      </Popup>

    </Marker>
  ))}

      {/* 🏨 Detailed markers */}
      {zoom >= 6 &&
        detailedLocations.map((place, i) => (
          <Marker
            key={i}
            position={place.coords}
            icon={place.type === "hotel" ? blueIcon : greenIcon}
          >
            <Tooltip>{place.name}</Tooltip>

            <Popup>
              <div style={{ textAlign: "center" }}>
                <img
                  src={place.image}
                  alt={place.name}
                  style={{ width: "150px", borderRadius: "8px" }}
                />
                <h4>{place.name}</h4>
                <p>{place.type === "hotel" ? "🏨 Hotel" : "🍽 Restaurant"}</p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}