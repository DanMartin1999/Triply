import { useState } from "react";
import "./Home.css";

// Tabs (categories)
const categories = ["Voting", "Bill Splitting", "Support", "Trips", "Map"];

// Data for cards
const data = {
  Voting: [
    {
      name: "Panama",
      region: "Central America",
      price: "$120",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      tag: "Island escape",
    },
    {
      name: "Barbados",
      region: "Caribbean",
      price: "$260",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      tag: "Caribbean calm",
    },
    {
      name: "Puerto Rico",
      region: "Caribbean",
      price: "$190",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      tag: "Coastal culture",
    },
    {
      name: "Hawaii",
      region: "United States",
      price: "$355",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      tag: "Tropical calm",
    },
  ],
};



  export default function Home() {
  const [active, setActive] = useState("Beach"); // 🔥 REQUIRED

  return (
    <div className="container">
      {/* Top Section */}
      <div className="top-section">
        <h1>Stays for every travel style</h1>

        {/* Tabs */}
        <div className="tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={active === cat ? "active" : ""}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid">
        {data[active]?.map((place, i) => (
          <div className="card" key={i}>
            <div className="image">
              <img src={place.image} alt={place.name} />
              <span className="tag">{place.tag}</span>
            </div>

            <h3>{place.name}</h3>
            <p>{place.region}</p>
            <strong>{place.price} avg per night</strong>
          </div>
        ))}
      </div>
    </div>
  );
}