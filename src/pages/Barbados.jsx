import React, { useState } from "react";
import PropTypes from "prop-types";
// Barbados trip page component
const styles = `*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:#f4f7fb}.app{padding:24px;min-height:100vh}.app h1{text-align:center;color:#0f172a}.container{display:grid;grid-template-columns:320px 1fr;gap:24px;max-width:1400px;margin:0 auto}.sidebar{display:grid;gap:16px}.card{border:none;background:#fff;border-radius:18px;padding:0;overflow:hidden;cursor:pointer;text-align:left;box-shadow:0 10px 25px rgba(0,0,0,.08)}.card.active{outline:3px solid #2563eb}.card img{width:100%;height:170px;object-fit:cover}.card h3,.card p{padding:0 14px}.card h3{margin:14px 0 8px}.card p{margin:0 0 14px;color:#475569}.details{background:#fff;border-radius:20px;padding:22px;box-shadow:0 10px 25px rgba(0,0,0,.08)}.hero-img{width:100%;height:320px;object-fit:cover;border-radius:16px}.btn,.direction-link{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:12px 16px;border-radius:12px;margin:12px 0}.section-title{margin-top:28px;color:#0f172a}.places-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.place-card{background:#f8fafc;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0}.place-card img{width:100%;height:160px;object-fit:cover}.place-card-content{padding:14px}.place-card-content h4{margin:0 0 8px}.place-card-content p{color:#475569;font-size:14px;line-height:1.45}.direction-link{margin-top:10px;padding:10px 14px}.details ul{padding-left:20px}.details li{margin:6px 0}.details h2{margin:14px 0;color:#0f172a}.trip-stops{list-style:disc}@media(max-width:900px){.container{grid-template-columns:1fr}.hero-img{height:240px}}`;

const trips = [
  {
    id: 1,
    title: "Bridgetown City Tour",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200",
    start: "Independence Square, Barbados",
    end: "George Washington House, Barbados",
    stops: [
      {
        name: "Independence Square",
        image:
          "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600",
        location: "Independence Square, Barbados",
      },
      {
        name: "Bay Street",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
        location: "Bay Street, Barbados",
      },
      {
        name: "George Washington House",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600",
        location: "George Washington House, Barbados",
      },
    ],
    activities: [
      {
        name: "Carlisle Bay Beach",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
        description:
          "Relax on the beach, swim, and enjoy scenic coastal views.",
        location: "Carlisle Bay, Barbados",
      },
      {
        name: "Barbados Museum",
        image:
          "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900",
        description: "Explore local history and heritage near Bridgetown.",
        location: "Barbados Museum, Barbados",
      },
      {
        name: "Pebbles Beach",
        image:
          "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=900",
        description:
          "Popular nearby beach for walking, photos, and ocean views.",
        location: "Pebbles Beach, Barbados",
      },
    ],
    hotels: [
      {
        name: "Hilton Barbados Resort",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900",
        description: "Luxury beachfront hotel close to Bridgetown attractions.",
        location: "Hilton Barbados Resort, Barbados",
      },
      {
        name: "Radisson Aquatica Resort",
        image:
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900",
        description: "Oceanfront stay with easy access to city and beach.",
        location: "Radisson Aquatica Resort Barbados",
      },
      {
        name: "Sugar Bay Barbados",
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900",
        description: "All-inclusive hotel near historic and coastal sites.",
        location: "Sugar Bay Barbados",
      },
    ],
    restaurants: [
      {
        name: "Harbour Lights",
        image:
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900",
        description: "Beachfront dining and entertainment near Bridgetown.",
        location: "Harbour Lights Barbados",
      },
      {
        name: "Buzo Osteria Italiana",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900",
        description:
          "Stylish restaurant with pasta, seafood, and waterfront views.",
        location: "Buzo Osteria Italiana Barbados",
      },
      {
        name: "Cuz's Fish Shack",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?w=900",
        description: "Famous local stop for fish cutters and quick meals.",
        location: "Cuz's Fish Shack Barbados",
      },
    ],
  },
  {
    id: 2,
    title: "Cave Adventure",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    start: "Harrison's Cave, Barbados",
    end: "Welchman Hall Gully, Barbados",
    stops: [
      {
        name: "Harrison's Cave",
        image:
          "https://images.unsplash.com/photo-1511497584788-876760111969?w=600",
        location: "Harrison's Cave, Barbados",
      },
      {
        name: "Welchman Hall Gully",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
        location: "Welchman Hall Gully, Barbados",
      },
    ],
    activities: [
      {
        name: "Harrison's Cave Tour",
        image:
          "https://images.unsplash.com/photo-1511497584788-876760111969?w=900",
        description:
          "Underground tram tour through caves and crystal formations.",
        location: "Harrison's Cave, Barbados",
      },
      {
        name: "Welchman Hall Gully Walk",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
        description: "Nature walk with tropical plants and green scenery.",
        location: "Welchman Hall Gully, Barbados",
      },
      {
        name: "Monkey Viewing Area",
        image:
          "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=900",
        description: "Spot green monkeys in the nearby natural environment.",
        location: "Welchman Hall Gully, Barbados",
      },
    ],
    hotels: [
      {
        name: "Apes Hill Barbados",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900",
        description: "Upscale resort area with beautiful inland views.",
        location: "Apes Hill Barbados",
      },
      {
        name: "Sugar Cane Club Hotel",
        image:
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900",
        description: "Quiet resort stay with relaxing atmosphere.",
        location: "Sugar Cane Club Hotel And Spa, Barbados",
      },
      {
        name: "The Orange Hill Beach Inn",
        image:
          "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900",
        description:
          "Comfortable stay within driving distance of cave attractions.",
        location: "Orange Hill Beach Inn Barbados",
      },
    ],
    restaurants: [
      {
        name: "The Mill Café",
        image:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900",
        description: "Casual café option after exploring the cave area.",
        location: "The Mill Cafe Barbados",
      },
      {
        name: "Open Kitchen",
        image:
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900",
        description: "Modern dining choice with varied menu options.",
        location: "Open Kitchen Barbados",
      },
      {
        name: "Chefette Warrens",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900",
        description: "Popular quick meal stop near central inland routes.",
        location: "Chefette Warrens Barbados",
      },
    ],
  },
  {
    id: 3,
    title: "Beach Experience",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",
    start: "Boardwalk, Barbados",
    end: "Mount Gay, Barbados",
    stops: [
      {
        name: "Boardwalk",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
        location: "Richard Haynes Boardwalk, Barbados",
      },
      {
        name: "Atlantis Submarine",
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
        location: "Atlantis Submarines Barbados",
      },
      {
        name: "Mount Gay",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600",
        location: "Mount Gay, Barbados",
      },
    ],
    activities: [
      {
        name: "Boardwalk Walk",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
        description: "Beautiful oceanfront stroll with nearby beach access.",
        location: "Richard Haynes Boardwalk, Barbados",
      },
      {
        name: "Atlantis Submarines",
        image:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900",
        description: "Underwater sightseeing experience in Barbados waters.",
        location: "Atlantis Submarines Barbados",
      },
      {
        name: "Mount Gay Visitor Centre",
        image:
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900",
        description: "Tour the famous rum distillery and enjoy tastings.",
        location: "Mount Gay Visitor Centre, Barbados",
      },
    ],
    hotels: [
      {
        name: "Accra Beach Hotel",
        image:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900",
        description: "Beachfront hotel ideal for a coastal stay.",
        location: "Accra Beach Hotel & Spa, Barbados",
      },
      {
        name: "South Gap Hotel",
        image:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900",
        description: "Stylish hotel close to beaches, dining, and nightlife.",
        location: "South Gap Hotel Barbados",
      },
      {
        name: "Butterfly Beach Hotel",
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900",
        description: "Relaxing coastal hotel with sea views.",
        location: "Butterfly Beach Hotel Barbados",
      },
    ],
    restaurants: [
      {
        name: "Champers",
        image:
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900",
        description:
          "Well-known oceanfront restaurant with local and international dishes.",
        location: "Champers Restaurant Barbados",
      },
      {
        name: "Blakey's on the Boardwalk",
        image:
          "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=900",
        description: "Casual seaside dining right by the boardwalk.",
        location: "Blakey's On The Boardwalk Barbados",
      },
      {
        name: "Tapas",
        image:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900",
        description: "Popular waterfront dining spot for lunch and dinner.",
        location: "Tapas Barbados",
      },
    ],
  },
];

const SECTION_TITLES = {
  activities: "3 Nearby Activities",
  hotels: "3 Nearby Hotels",
  restaurants: "3 Nearby Restaurants",
};

function mapLink(location) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}&travelmode=driving`;
}

function tripRouteLink(trip) {
  const origin = encodeURIComponent(trip.start);
  const destination = encodeURIComponent(trip.end);
  const waypoints = trip.stops
    .slice(1, -1)
    .map((stop) => encodeURIComponent(stop.location))
    .join("|");

  const waypointPart = waypoints ? `&waypoints=${waypoints}` : "";

  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointPart}&travelmode=driving`;
}

function PlaceSection({ title, items }) {
  return (
    <section>
      <h3 className="section-title">{title}</h3>
      <div className="places-grid">
        {items.map((item, index) => (
          <article className="place-card" key={`${title}-${index}`}>
            <img src={item.image} alt={item.name} />
            <div className="place-card-content">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
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

PlaceSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default function Barbados() {
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);

  return (
    <>
      <style>{styles}</style>
      <main className="app">
        <h1>🌴 Barbados </h1>

        <div className="container">
          <aside className="sidebar">
            {trips.map((trip) => (
              <button
                key={trip.id}
                type="button"
                className={`card ${trip.id === selectedTrip.id ? "active" : ""}`}
                onClick={() => setSelectedTrip(trip)}
                aria-current={trip.id === selectedTrip.id ? "true" : "false"}
                aria-label={`Select trip: ${trip.title}`}
              >
                <img src={trip.image} alt={trip.title} />
                <h3>{trip.title}</h3>
                <p>
                  {trip.start} → {trip.end}
                </p>
              </button>
            ))}
          </aside>

          <section className="details">
            <img
              className="hero-img"
              src={selectedTrip.image}
              alt={selectedTrip.title}
            />
            <h2>{selectedTrip.title}</h2>

            <p>
              <strong>Start:</strong> {selectedTrip.start}
            </p>
            <p>
              <strong>End:</strong> {selectedTrip.end}
            </p>

            <h3>Trip Stops</h3>
            <div className="places-grid">
              {selectedTrip.stops.map((stop) => (
                <article className="place-card" key={stop.name}>
                  <img src={stop.image} alt={stop.name} />
                  <div className="place-card-content">
                    <h4>{stop.name}</h4>
                    <a
                      href={mapLink(stop.location)}
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

            <a
              href={tripRouteLink(selectedTrip)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              🚗 Start Trip Navigation
            </a>

            <PlaceSection
              title={SECTION_TITLES.activities}
              items={selectedTrip.activities}
            />
            <PlaceSection
              title={SECTION_TITLES.hotels}
              items={selectedTrip.hotels}
            />
            <PlaceSection
              title={SECTION_TITLES.restaurants}
              items={selectedTrip.restaurants}
            />
          </section>
        </div>
      </main>
    </>
  );
}
