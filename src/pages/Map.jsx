import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Icons
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🌍 Main Locations
const mainLocations = [
  { name: "Madrid", coords: [40.4168, -3.7038] },
  { name: "Panama", coords: [8.538, -80.7821] },
  { name: "Barbados", coords: [13.1939, -59.5432] },
  { name: "Tokyo", coords: [35.6762, 139.6503] },
];

// 📍 Detailed Locations
const detailedLocations = [
  { name: "Hotel Riu Plaza España", city: "madrid", type: "hotel", coords: [40.4203, -3.7074] },
  { name: "Botín Restaurant", city: "madrid", type: "restaurant", coords: [40.4142, -3.7073] },

  { name: "JW Marriott Panama", city: "panama", type: "hotel", coords: [8.9806, -79.5197] },
  { name: "Maito Restaurant", city: "panama", type: "restaurant", coords: [8.9936, -79.5203] },

  { name: "Sandy Lane Hotel", city: "barbados", type: "hotel", coords: [13.178, -59.638] },
  { name: "The Cliff Restaurant", city: "barbados", type: "restaurant", coords: [13.151, -59.637] },

  { name: "Park Hyatt Tokyo", city: "tokyo", type: "hotel", coords: [35.685, 139.691] },
  { name: "Ichiran Ramen", city: "tokyo", type: "restaurant", coords: [35.693, 139.703] },
];

export default function MapPage({ selectedCity, mode = "global" }) {
  const isGlobal = mode === "global";

  const filteredLocations = selectedCity
    ? detailedLocations.filter((loc) => loc.city === selectedCity)
    : detailedLocations;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🔴 ALWAYS SHOW MAIN LOCATIONS */}
      {mainLocations.map((loc, i) => (
        <Marker key={`main-${i}`} position={loc.coords} icon={redIcon}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}

      {/* 🔥 MAIN MAP → SHOW ALL HOTELS + RESTAURANTS */}
      {isGlobal &&
        detailedLocations.map((loc, i) => (
          <Marker
            key={`global-${i}`}
            position={loc.coords}
            icon={loc.type === "hotel" ? blueIcon : greenIcon}
          >
            <Popup>
              <b>{loc.name}</b>
              <br />
              {loc.city}
            </Popup>
          </Marker>
        ))}

      {/* 🔥 DESTINATION MAP → FILTERED */}
      {!isGlobal &&
        filteredLocations.map((loc, i) => (
          <Marker
            key={`filtered-${i}`}
            position={loc.coords}
            icon={loc.type === "hotel" ? blueIcon : greenIcon}
          >
            <Popup>
              <b>{loc.name}</b>
              <br />
              {loc.type}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}