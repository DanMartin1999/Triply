import React from "react";

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

const trip = {
  title: "Tokyo City Lights Tour",
  image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200",
  start: "Shibuya Crossing, Tokyo, Japan",
  end: "Tokyo Tower, Tokyo, Japan",

  hotels: [
    {
      name: "Park Hotel Tokyo",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
      description: "Modern luxury hotel with skyline views, elegant rooms, and close train station access for easy exploring.",
      location: "Park Hotel Tokyo, Japan"
    },
    {
      name: "Shinjuku Granbell Hotel",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900",
      description: "A trendy stay located in the middle of shopping, nightlife, restaurants, and the fast-paced city atmosphere.",
      location: "Shinjuku Granbell Hotel, Tokyo, Japan"
    },
    {
      name: "Prince Park Tower Tokyo",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900",
      description: "Upscale luxury hotel beside Tokyo Tower with spa amenities and breathtaking skyline views.",
      location: "Prince Park Tower Tokyo, Japan"
    }
  ],

  restaurants: [
    {
      name: "Ichiran Ramen",
      image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=900",
      description: "Tokyo’s iconic private booth ramen dining experience and a must-visit for authentic comfort food lovers.",
      location: "Ichiran Shibuya, Tokyo, Japan"
    },
    {
      name: "Gonpachi Nishiazabu",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900",
      description: "Traditional Japanese dining with sushi, skewers, lantern lighting, and a cinematic samurai feel.",
      location: "Gonpachi Nishiazabu, Tokyo, Japan"
    },
    {
      name: "Tsukiji Itadori",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900",
      description: "Fresh sushi and seafood straight from Tokyo’s famous fish market district.",
      location: "Tsukiji Itadori, Tokyo, Japan"
    }
  ],

  activities: [
    {
      name: "Akihabara Electric Town",
      image: "https://www.findingmidnight.com/images/Akihabara-Japan-Rooftopping-Street-View.jpg",
      description: "Anime stores, gaming arcades, collectibles, themed cafés, and nonstop neon nightlife energy.",
      location: "Akihabara, Tokyo, Japan"
    },
    {
      name: "Senso-ji Temple",
      image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=900",
      description: "Tokyo’s oldest Buddhist temple surrounded by cultural shopping streets and traditional foods.",
      location: "Senso-ji Temple, Tokyo, Japan"
    },
    {
      name: "Ueno Park",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900",
      description: "Scenic gardens, museums, cherry blossom photo spots, and beautiful daytime walking paths.",
      location: "Ueno Park, Tokyo, Japan"
    }
  ]
};

function mapLink(location) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}&travelmode=driving`;
}

function tripRouteLink() {
  const origin = encodeURIComponent(trip.start);
  const destination = encodeURIComponent(trip.end);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
}

function PlaceSection({ title, items }) {
  return (
    <section>
      <h3 className="section-title">{title}</h3>
      <div className="places-list">
        {items.map((item, index) => (
          <article className="place-card" key={index}>
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
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Japan() {
  return (
    <>
      <style>{styles}</style>

      <main className="app">
        <h1>🗾 Japan</h1>

        <section className="details">
          <img className="hero-img" src={trip.image} alt={trip.title} />
          <h2>{trip.title}</h2>

          <a
            href={tripRouteLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            🚗 Start Trip Navigation
          </a>

          <PlaceSection title="Hotels" items={trip.hotels} />
          <PlaceSection title="Restaurants" items={trip.restaurants} />
          <PlaceSection title="Activities" items={trip.activities} />
        </section>
      </main>
    </>
  );
}