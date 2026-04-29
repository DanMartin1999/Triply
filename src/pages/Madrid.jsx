import React, { useState } from "react";

const styles = `
*{box-sizing:border-box}
body{margin:0;font-family:Arial,sans-serif;background:#f4f7fb}
.app{padding:24px;min-height:100vh}
.app h1{text-align:center;color:#0f172a}
.container{display:grid;grid-template-columns:320px 1fr;gap:24px;max-width:1400px;margin:0 auto}
.sidebar{display:grid;gap:16px}
.card{border:none;background:#fff;border-radius:18px;padding:0;overflow:hidden;cursor:pointer;text-align:left;box-shadow:0 10px 25px rgba(0,0,0,.08)}
.card.active{outline:3px solid #2563eb}
.card img{width:100%;height:170px;object-fit:cover}
.card h3,.card p{padding:0 14px}
.card h3{margin:14px 0 8px}
.card p{margin:0 0 14px;color:#475569}
.details{background:#fff;border-radius:20px;padding:22px;box-shadow:0 10px 25px rgba(0,0,0,.08)}
.hero-img{width:100%;height:320px;object-fit:cover;border-radius:16px}
.btn,.direction-link{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 16px;border-radius:12px;margin:12px 0}
.section-title{margin-top:28px;color:#0f172a}
.places-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.place-card{background:#f8fafc;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0}
.place-card img{width:100%;height:160px;object-fit:cover}
.place-card-content{padding:14px}
.place-card-content h4{margin:0 0 8px}
.place-card-content p{color:#475569;font-size:14px}
`;

const trips = [
  {
    id: 1,
    title: "Madrid City Experience",
    image: "https://images.unsplash.com/photo-1543785734-4b0d8f1cbb91?w=1200",
    start: "Puerta del Sol, Madrid",
    end: "Royal Palace of Madrid",
    stops: [
      { name: "Plaza Mayor", image: "https://images.unsplash.com/photo-1558370781-d6196949e317?w=600", location: "Plaza Mayor Madrid" },
      { name: "Royal Palace", image: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=600", location: "Royal Palace of Madrid" },
    ],
    activities: [
      { name: "Retiro Park", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=900", description: "Relax in Madrid’s most famous park", location: "El Retiro Park Madrid" },
      { name: "Prado Museum", image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=900", description: "Explore world-class art", location: "Museo del Prado Madrid" },
    ],
    hotels: [
      { name: "Hotel Riu Plaza España", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900", description: "Luxury hotel with skyline views", location: "Hotel Riu Plaza España Madrid" },
    ],
    restaurants: [
      { name: "Sobrino de Botín", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900", description: "Famous historic Spanish restaurant", location: "Sobrino de Botín Madrid" },
    ],
  }
];

// helper
function mapLink(location) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

function PlaceSection({ title, items }) {
  return (
    <>
      <h3>{title}</h3>
      <div className="places-grid">
        {items.map((item, i) => (
          <div className="place-card" key={i}>
            <img src={item.image} alt={item.name} />
            <div className="place-card-content">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <a href={mapLink(item.location)} target="_blank" rel="noreferrer" className="direction-link">
                Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Madrid() {
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);

  return (
    <>
      <style>{styles}</style>

      <div className="app">
        <h1>🇪🇸 Madrid</h1>

        <div className="container">
          {/* LEFT */}
          <div className="sidebar">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className={`card ${trip.id === selectedTrip.id ? "active" : ""}`}
                onClick={() => setSelectedTrip(trip)}
              >
                <img src={trip.image} alt={trip.title} />
                <h3>{trip.title}</h3>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="details">
            <img className="hero-img" src={selectedTrip.image} alt="" />

            <h2>{selectedTrip.title}</h2>

            <p><strong>Start:</strong> {selectedTrip.start}</p>
            <p><strong>End:</strong> {selectedTrip.end}</p>

            <PlaceSection title="Activities" items={selectedTrip.activities} />
            <PlaceSection title="Hotels" items={selectedTrip.hotels} />
            <PlaceSection title="Restaurants" items={selectedTrip.restaurants} />
          </div>
        </div>
      </div>
    </>
  );
}