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
  display:inline-block;
  background:#2563eb;
  color:#fff;
  text-decoration:none;
  padding:12px 18px;
  border-radius:12px;
  margin-top:16px;
  width:fit-content;
  font-weight:bold;
}

/* 🌴 selector (same system as Barbados/Japan upgrade) */
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
    title: "Panama City Highlights",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1400",
    start: "Panama City",
    end: "Casco Viejo",

    activities: [
      {
        name: "Panama Canal Tour",
        image:
          "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900",
        description:
          "Watch massive ships pass through one of the most important engineering feats in the world.",
        location: "Panama Canal, Panama",
      },
      {
        name: "Casco Viejo Walk",
        image:
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=900",
        description:
          "Historic streets, colorful buildings, cafes, and nightlife in the old city.",
        location: "Casco Viejo, Panama City",
      },
    ],

    hotels: [
      {
        name: "Waldorf Astoria Panama",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
        description:
          "Luxury stay in the heart of Panama City with skyline views and premium service.",
        location: "Waldorf Astoria Panama",
      },
      {
        name: "American Trade Hotel",
        image:
          "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=900",
        description:
          "Boutique hotel inside Casco Viejo with historic charm and modern design.",
        location: "American Trade Hotel, Panama",
      },
    ],

    restaurants: [
      {
        name: "Maito",
        image:
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900",
        description:
          "One of Panama’s top restaurants blending Latin American flavors with modern cuisine.",
        location: "Maito Panama City",
      },
      {
        name: "Donde José",
        image:
          "https://images.unsplash.com/photo-1541542684-4a4c6d14f8c7?w=900",
        description:
          "Tasting menu experience inspired by Panamanian culture and ingredients.",
        location: "Donde José, Panama",
      },
    ],
  },

  {
    id: 2,
    title: "Beach & Nature Escape",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400",
    start: "San Blas Islands",
    end: "Bocas del Toro",

    activities: [
      {
        name: "San Blas Islands",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
        description:
          "Crystal clear water, untouched islands, and full tropical escape.",
        location: "San Blas Islands, Panama",
      },
    ],

    hotels: [
      {
        name: "La Coralina Island House",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
        description:
          "Luxury eco-resort surrounded by jungle and ocean views.",
        location: "Bocas del Toro",
      },
    ],

    restaurants: [
      {
        name: "El Ultimo Refugio",
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900",
        description:
          "Fresh seafood and local flavors by the ocean.",
        location: "Bocas del Toro",
      },
    ],
  },
];

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
                className="direction-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  item.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
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

export default function Panama() {
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);

  return (
    <>
      <style>{styles}</style>

      <main className="app">
        <h1>🇵🇦 Panama</h1>

        {/* DESTINATION SELECTOR */}
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