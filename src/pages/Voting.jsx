import "./Voting.css";

export default function Voting() {
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
    <div className="voting-container">
      <h1>Vote on Your Trip Plan – Panama 🇵🇦</h1>

      <div className="itinerary-grid">
        {itineraries.map((it) => (
          <div key={it.id} className="itinerary-card">
            <img src={it.img} className="itinerary-img" />

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
  );
}
