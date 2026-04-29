import React, { useState } from "react";

const styles = `
*{
  box-sizing:border-box;
}

body{
  margin:0;
  font-family:Arial,sans-serif;
  background:#f4f7fb;
}

.app{
  padding:30px;
  min-height:100vh;
}

.app h1{
  text-align:center;
  color:#0f172a;
  margin-bottom:30px;
  font-size:42px;
}

.details{
  max-width:1300px;
  margin:0 auto;
  background:#fff;
  border-radius:24px;
  padding:26px;
  box-shadow:0 10px 25px rgba(0,0,0,.08);
}

.hero-img{
  width:100%;
  height:420px;
  object-fit:cover;
  border-radius:18px;
}

.details h2{
  margin:18px 0;
  color:#0f172a;
  font-size:34px;
}

.btn,
.direction-link{
  display:inline-block;
  background:#2563eb;
  color:#fff;
  text-decoration:none;
  padding:12px 18px;
  border-radius:12px;
  margin:12px 0;
  font-weight:bold;
}

.section-title{
  margin-top:40px;
  margin-bottom:18px;
  color:#0f172a;
  font-size:28px;
}

.places-list{
  display:flex;
  flex-direction:column;
  gap:24px;
}

.place-card{
  display:flex;
  gap:22px;
  background:#f8fafc;
  border-radius:20px;
  overflow:hidden;
  border:1px solid #e2e8f0;
  min-height:230px;
}

.place-card img{
  width:340px;
  height:230px;
  object-fit:cover;
}

.place-card-content{
  padding:22px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  flex:1;
}

.place-card-content h4{
  margin:0 0 12px;
  font-size:25px;
  color:#0f172a;
}

.place-card-content p{
  color:#475569;
  font-size:15px;
  line-height:1.7;
  max-width:750px;
}

.direction-link{
  margin-top:16px;
  width:fit-content;
}

/* 🌴 DESTINATION SELECTOR (NEW - matches Japan simplicity) */
.selector{
  display:flex;
  justify-content:center;
  gap:10px;
  margin-bottom:25px;
  flex-wrap:wrap;
}

.selector button{
  padding:10px 18px;
  border-radius:999px;
  border:1px solid #ddd;
  background:#fff;
  cursor:pointer;
  font-weight:600;
}

.selector button.active{
  background:#111;
  color:#fff;
  border-color:#111;
}

@media(max-width:900px){
  .hero-img{
    height:250px;
  }

  .place-card{
    flex-direction:column;
  }

  .place-card img{
    width:100%;
    height:220px;
  }

  .app h1{
    font-size:30px;
  }

  .details h2{
    font-size:26px;
  }
}
`;

const trips = [
  {
    id: 1,
    title: "Bridgetown City Tour",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200",
    start: "Bridgetown",
    end: "George Washington House",
    activities: [
      {
        name: "Carlisle Bay Beach",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
        description: "Relax beach",
        location: "Carlisle Bay",
      },
    ],
    hotels: [
      {
        name: "Hilton Barbados",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
        description: "Luxury stay",
        location: "Hilton Barbados",
      },
    ],
    restaurants: [
      {
        name: "Harbour Lights",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900",
        description: "Beach dining",
        location: "Harbour Lights",
      },
    ],
  },

  {
    id: 2,
    title: "Beach Escape Tour",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    start: "Miami Beach",
    end: "Oistins Fish Market",
    activities: [
      {
        name: "Snorkeling",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900",
        description: "Clear water snorkeling",
        location: "Barbados Reef",
      },
    ],
    hotels: [
      {
        name: "Ocean View Resort",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900",
        description: "Beachfront hotel",
        location: "Barbados Coast",
      },
    ],
    restaurants: [
      {
        name: "Fish Pot",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900",
        description: "Fresh seafood",
        location: "St. James Barbados",
      },
    ],
  },
];

function mapLink(location) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

function PlaceSection({ title, items }) {
  return (
    <>
      <h3 className="section-title">{title}</h3>

      <div className="places-list">
        {items.map((item, i) => (
          <div className="place-card" key={i}>
            <img src={item.image} alt={item.name} />

            <div className="place-card-content">
              <h4>{item.name}</h4>
              <p>{item.description}</p>

              <a
                href={mapLink(item.location)}
                target="_blank"
                rel="noopener noreferrer"
                className="direction-link"
              >
                Get Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Barbados() {
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);

  return (
    <>
      <style>{styles}</style>

      <main className="app">
        <h1>🌴 Barbados</h1>

        {/* DESTINATION SELECTOR (Japan-style upgrade) */}
        <div className="selector">
          {trips.map((trip) => (
            <button
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className={selectedTrip.id === trip.id ? "active" : ""}
            >
              {trip.title}
            </button>
          ))}
        </div>

        <section className="details">
          <img
            className="hero-img"
            src={selectedTrip.image}
            alt={selectedTrip.title}
          />

          <h2>{selectedTrip.title}</h2>

          <p><strong>Start:</strong> {selectedTrip.start}</p>
          <p><strong>End:</strong> {selectedTrip.end}</p>

          <PlaceSection title="Activities" items={selectedTrip.activities} />
          <PlaceSection title="Hotels" items={selectedTrip.hotels} />
          <PlaceSection title="Restaurants" items={selectedTrip.restaurants} />
        </section>
      </main>
    </>
  );
}