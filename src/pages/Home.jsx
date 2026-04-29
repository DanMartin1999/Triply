import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const categories = ["Home", "Voting", "Bill Splitting", "Support", "Map"];
  const [active, setActive] = useState("Home");
  const [homeTab, setHomeTab] = useState("Beach");

  // 👤 USER (SAFE)
  const user = JSON.parse(localStorage.getItem("triplyUser"));

  // 🔥 BEACH PLACES
  const beachPlaces = [
    {
      name: "Panama",
      location: "Central America",
      price: "$120",
      route: "/panama",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      tag: "Island escape",
    },
    {
      name: "Barbados",
      location: "Caribbean",
      price: "$260",
      route: "/barbados",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      tag: "Caribbean calm",
    },
    {
      name: "Japan",
      location: "Tokyo",
      price: "$200",
      route: "/japan",
      image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1200&auto=format&fit=crop",
      tag: "Street food & nightlife",
    },
    {
      name: "Hawaii",
      location: "United States",
      price: "$355",
      route: "/hawaii",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
      tag: "Tropical calm",
    },
  ];

  // 🔥 CULTURE PLACES
  const culturePlaces = [
    {
      name: "Madrid",
      location: "Spain",
      price: "$150",
      route: "/madrid",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
      tag: "Art & culture",
    },
    {
      name: "Tokyo",
      location: "Japan",
      price: "$200",
      route: "/japan",
      image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=1200&auto=format&fit=crop",
      tag: "Street food & nightlife",
    },
  ];

  const displayedPlaces =
    homeTab === "Culture" ? culturePlaces : beachPlaces;

  return (
    <div className="container">

      {/* TOP */}
      <div className="top-section">
        <h1 className="slogan">
          Plan Together. Travel Together. Laugh Together.
        </h1>

        {/* CATEGORY TABS */}
        <div className="tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={active === cat ? "active" : ""}
              onClick={() => {
                setActive(cat);

                if (cat === "Voting") navigate("/voting");
                if (cat === "Support") navigate("/support");
                if (cat === "Map") navigate("/map");
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* HOME CONTENT */}
      {active === "Home" && (
        <div>

          {/* 👤 WELCOME FIX (NEW) */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2>
              Welcome {user?.firstName || "Traveler"} 📌
            </h2>
            <p>Your next trip starts here</p>
          </div>

          <h2 style={{ textAlign: "center" }}>Explore stays</h2>

          {/* BEACH / CULTURE TOGGLE */}
          <div className="tabs" style={{ justifyContent: "center" }}>
            <button
              className={homeTab === "Beach" ? "active" : ""}
              onClick={() => setHomeTab("Beach")}
            >
              Beach
            </button>

            <button
              className={homeTab === "Culture" ? "active" : ""}
              onClick={() => setHomeTab("Culture")}
            >
              Culture
            </button>
          </div>

          {/* GRID */}
          <div className="grid">
            {displayedPlaces.map((place, i) => (
              <div
                className="card"
                key={i}
                onClick={() => navigate(place.route)}
              >
                <div className="image">
                  <img
                    src={place.image}
                    alt={place.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400";
                    }}
                  />
                  <span className="tag">{place.tag}</span>
                </div>

                <h3>{place.name}</h3>
                <p>{place.location}</p>
                <strong>{place.price} avg per night</strong>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OTHER TABS */}
      {active !== "Home" && active !== "Map" && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>{active}</h2>
          <p style={{ color: "gray" }}>
            This feature is under development.
          </p>
        </div>
      )}
    </div>
  );
}