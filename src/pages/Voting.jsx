import React, { useEffect, useState } from "react";
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Voting() {
  const [selectedTrip, setSelectedTrip] = useState("Panama");
  const [liveVotes, setLiveVotes] = useState({});
  const [userVote, setUserVote] = useState(null);

  // 👤 GET USER FROM LOCALSTORAGE (FIXED)
  const getUser = () =>
    JSON.parse(localStorage.getItem("triplyUser"));

  const data = {
    Panama: [
      {
        title: "Relax & Beach 🌴",
        img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
        items: ["Beach Day", "Boat Tour", "Sunset Dinner"],
      },
      {
        title: "City Explore 🏙️",
        img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
        items: ["Old Town", "Museum", "Food Tour"],
      },
    ],

    Japan: [
      {
        title: "Tokyo Nights 🌃",
        img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
        items: ["Shibuya", "Arcades", "Street Food"],
      },
      {
        title: "Cultural Day 🎎",
        img: "https://images.unsplash.com/photo-1526481280695-3c687fd643ed",
        items: ["Temples", "Tea Ceremony", "Museums"],
      },
    ],
  };

  const destinations = Object.keys(data);
  const itineraries = data[selectedTrip];

  // 🔥 LIVE VOTES
  useEffect(() => {
    const ref = collection(db, "votes", selectedTrip, "users");

    const unsub = onSnapshot(ref, (snapshot) => {
      const votes = {};
      const user = getUser();

      let myVote = null;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();

        votes[data.option] = (votes[data.option] || 0) + 1;

        if (user && docSnap.id === user.email) {
          myVote = data.option;
        }
      });

      setLiveVotes(votes);
      setUserVote(myVote);
    });

    return () => unsub();
  }, [selectedTrip]);

  // 🔥 VOTE (ONE PER USER)
  async function handleVote(index) {
    const user = getUser();

    if (!user) {
      alert("You must be logged in to vote");
      return;
    }

    const voteRef = doc(
      db,
      "votes",
      selectedTrip,
      "users",
      user.email // ✅ FIXED (no uid needed)
    );

    await setDoc(voteRef, {
      option: index,
      timestamp: Date.now(),
    });
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Vote Your Trip ✈️</h1>

      {/* DESTINATION SELECTOR */}
      <div style={styles.selector}>
        {destinations.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedTrip(d)}
            style={{
              ...styles.destButton,
              background: selectedTrip === d ? "#111" : "#fff",
              color: selectedTrip === d ? "#fff" : "#111",
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div style={styles.cardRow}>
        {itineraries.map((it, i) => {
          const votes = liveVotes[i] || 0;

          return (
            <div key={i} style={styles.card}>
              <img src={it.img} alt="" style={styles.image} />

              <div style={styles.cardBody}>
                <h3>{it.title}</h3>

                <ul>
                  {it.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div style={styles.voteCount}>
                  Votes: {votes}
                </div>

                <button
                  onClick={() => handleVote(i)}
                  style={{
                    ...styles.voteButton,
                    background: userVote === i ? "#4CAF50" : "#111",
                  }}
                >
                  {userVote === i ? "Voted ✓" : "Vote"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p style={styles.footer}>
        One vote per user • Live updates across all users 🌍
      </p>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    fontFamily: "Inter",
    padding: "30px",
    maxWidth: "1100px",
    margin: "auto",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  selector: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "25px",
  },

  destButton: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },

  cardRow: {
    display: "flex",
    gap: "15px",
    overflowX: "auto",
    paddingBottom: "10px",
  },

  card: {
    minWidth: "260px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
  },

  cardBody: {
    padding: "12px",
  },

  voteCount: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#666",
  },

  voteButton: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    marginTop: "20px",
    color: "#666",
  },
};