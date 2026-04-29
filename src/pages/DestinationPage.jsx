import { useParams } from "react-router-dom";
import MapPage from "./Map";

export default function DestinationPage() {
  const { city } = useParams();

  // convert URL format → normal text
  const formattedCity = city.replace(/-/g, " ");

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        {formattedCity.toUpperCase()}
      </h1>

      <MapPage selectedCity={formattedCity} mode="destination" />
    </div>
  );
}