import React, { useState } from "react";

const styles = `*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:#f4f7fb}.app{padding:24px;min-height:100vh}.app h1{text-align:center;color:#0f172a}.container{display:grid;grid-template-columns:320px 1fr;gap:24px;max-width:1400px;margin:0 auto}.sidebar{display:grid;gap:16px}.card{border:none;background:#fff;border-radius:18px;padding:0;overflow:hidden;cursor:pointer;text-align:left;box-shadow:0 10px 25px rgba(0,0,0,.08)}.card.active{outline:3px solid #2563eb}.card img{width:100%;height:170px;object-fit:cover}.card h3,.card p{padding:0 14px}.card h3{margin:14px 0 8px}.card p{margin:0 0 14px;color:#475569}.details{background:#fff;border-radius:20px;padding:22px;box-shadow:0 10px 25px rgba(0,0,0,.08)}.hero-img{width:100%;height:320px;object-fit:cover;border-radius:16px}.btn,.direction-link{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 16px;border-radius:12px;margin:12px 0}.section-title{margin-top:28px;color:#0f172a}.places-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.place-card{background:#f8fafc;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0}.place-card img{width:100%;height:160px;object-fit:cover}.place-card-content{padding:14px}.place-card-content h4{margin:0 0 8px}.place-card-content p{color:#475569;font-size:14px;line-height:1.45}.direction-link{margin-top:10px;padding:10px 14px}.details h2{margin:14px 0;color:#0f172a}@media(max-width:900px){.container{grid-template-columns:1fr}.hero-img{height:240px}}`;

const trips = [
  {
    id: 1,
    title: "Tokyo City Lights Tour",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
    start: "Shibuya Crossing, Tokyo, Japan",
    end: "Tokyo Tower, Tokyo, Japan",
    stops: [
      { name: "Shibuya Crossing", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600", location: "Shibuya Crossing, Tokyo, Japan" },
      { name: "Meiji Shrine", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600", location: "Meiji Shrine, Tokyo, Japan" },
      { name: "Tokyo Tower", image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600", location: "Tokyo Tower, Tokyo, Japan" },
    ],
    activities: [
      { name: "Akihabara Electric Town", image: "https://images.unsplash.com/photo-1526481280695-3c4691f7d2d6?w=900", description: "Explore anime shops, arcades, gaming stores, and neon nightlife.", location: "Akihabara, Tokyo, Japan" },
      { name: "Senso-ji Temple", image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=900", description: "Visit Tokyo’s oldest Buddhist temple and famous market street.", location: "Senso-ji Temple, Tokyo, Japan" },
      { name: "Ueno Park", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900", description: "Beautiful park perfect for sightseeing and museums.", location: "Ueno Park, Tokyo, Japan" },
    ],
    hotels: [
      { name: "Park Hotel Tokyo", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900", description: "Modern luxury hotel with skyline views.", location: "Park Hotel Tokyo, Japan" },
      { name: "Shinjuku Granbell Hotel", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900", description: "Stylish hotel close to shopping and nightlife.", location: "Shinjuku Granbell Hotel, Tokyo, Japan" },
      { name: "Prince Park Tower Tokyo", image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900", description: "Upscale stay near Tokyo Tower.", location: "Prince Park Tower Tokyo, Japan" },
    ],
    restaurants: [
      { name: "Ichiran Ramen", image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=900", description: "Famous solo booth ramen dining.", location: "Ichiran Shibuya, Tokyo, Japan" },
      { name: "Gonpachi", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900", description: "Traditional Japanese dining experience.", location: "Gonpachi Nishiazabu, Tokyo, Japan" },
      { name: "Tsukiji Itadori", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900", description: "Fresh sushi and seafood.", location: "Tsukiji Itadori, Tokyo, Japan" },
    ],
  }
];

function mapLink(location) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}&travelmode=driving`;
}

function tripRouteLink(trip) {
  const origin = encodeURIComponent(trip.start);
  const destination = encodeURIComponent(trip.end);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
}

function PlaceSection({ title, items }) {
  return (
    <section>
      <h3 className="section-title">{title}</h3>
      <div className="places-grid">
        {items.map((item, index) => (
          <article className="place-card" key={index}>
            <img src={item.image} alt={item.name} />
            <div className="place-card-content">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <a href={mapLink(item.location)} target="_blank" rel="noopener noreferrer" className="direction-link">
                Get Directions
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Japan() {
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);

  return (
    <>
      <style>{styles}</style>
      <main className="app">
        <h1>🗾 Japan</h1>

        <div className="container">
          <aside className="sidebar">
            {trips.map((trip) => (
              <button
                key={trip.id}
                className={`card ${trip.id === selectedTrip.id ? "active" : ""}`}
                onClick={() => setSelectedTrip(trip)}
              >
                <img src={trip.image} alt={trip.title} />
                <h3>{trip.title}</h3>
              </button>
            ))}
          </aside>

          <section className="details">
            <img className="hero-img" src={selectedTrip.image} alt={selectedTrip.title} />
            <h2>{selectedTrip.title}</h2>

            <a href={tripRouteLink(selectedTrip)} target="_blank" rel="noopener noreferrer" className="btn">
              🚗 Start Trip Navigation
            </a>

            <PlaceSection title="Activities" items={selectedTrip.activities} />
            <PlaceSection title="Hotels" items={selectedTrip.hotels} />
            <PlaceSection title="Restaurants" items={selectedTrip.restaurants} />
          </section>
        </div>
      </main>
    </>
  );
}