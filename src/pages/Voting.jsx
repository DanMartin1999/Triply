import React from "react";

export default function Voting() {
  const styles = `
  .voting-container {
    max-width: 1100px;
    margin: auto;
    padding: 40px 20px;
    text-align: center;
    font-family: "Inter", sans-serif;
  }

  .itinerary-grid {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
    flex-wrap: wrap;
  }

  .itinerary-card {
    background: white;
    border-radius: 14px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform .2s ease;
  }

  .itinerary-card:hover {
    transform: translateY(-4px);
  }

  .itinerary-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 12px;
  }

  .itinerary-card h2 {
    margin-top: 15px;
    font-size: 20px;
    font-weight: 600;
  }

  .itinerary-card ul {
    text-align: left;
    margin: 15px 0;
    padding-left: 20px;
  }

  .vote-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-weight: 600;
  }

  .vote-btn {
    margin-top: 15px;
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
  }

  .vote-btn:hover {
    background: #005fcc;
  }

  .footer-note {
    margin-top: 40px;
    font-size: 18px;
    font-weight: 600;
  }

  .footer-sub {
    margin-top: 5px;
    color: #666;
  }
  `;

  const itineraries = [
    {
      id: "A",
      title: "Relax & Beach",
      img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      items: ["Beach Day (San Blas)", "Boat Tour", "Sunset Dinner"],
      votes: 2,
      percent: 50,
    },
    {
      id: "B",
      title: "Explore the City",
      img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200&auto=format&fit=crop",
      items: ["Casco Viejo Tour", "Museum Visit", "Local Food Tour"],
      votes: 1,
      percent: 25,
    },
    {
      id: "C",
      title: "Adventure",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
      items: ["Monkey Island Tour", "Jungle Hiking", "Ziplining"],
      votes: 1,
      percent: 25,
    },
  ];

  return (
    <>
      <style>{styles}</style>

      <div className="voting-container">
        <h1>Vote on Your Trip Plan – Panama 🇵🇦</h1>

        <div className="itinerary-grid">
          {itineraries.map((it) => (
            <div key={it.id} className="itinerary-card">
              <img src={it.img} className="itinerary-img" alt={it.title} />

              <h2>{`Itinerary ${it.id} – ${it.title}`}</h2>

              <ul>
                {it.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="vote-stats">
                <span className="vote-count">{it.votes} votes</span>
                <span className="vote-percent">{it.percent}%</span>
              </div>

              <button className="vote-btn">Vote</button>
            </div>
          ))}
        </div>

        <p className="footer-note">
          The itinerary with the most votes will be our official plan!
        </p>
        <p className="footer-sub">Members voted: 4 / 6</p>
      </div>
    </>
  );
}