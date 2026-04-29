import React, { useEffect, useState } from "react";
import { doc, setDoc, onSnapshot, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Voting() {
  const [selectedTrip, setSelectedTrip] = useState("Panama");
  const [liveVotes, setLiveVotes] = useState({});
  const [userVote, setUserVote] = useState(null);

  // 🆕 CREATE STATE
  const [newTitle, setNewTitle] = useState("");
  const [newItems, setNewItems] = useState("");

  const getUser = () => JSON.parse(localStorage.getItem("triplyUser"));

  // ✅ ORIGINAL DATA (UNCHANGED)
  const baseData = {
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

  // 🆕 FIREBASE ADDED ITINERARIES
  const [customData, setCustomData] = useState({
    Panama: [],
    Japan: [],
  });

  // 🔥 LOAD CUSTOM ITINERARIES
  useEffect(() => {
    const ref = collection(db, "itineraries", selectedTrip, "list");

    const unsub = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCustomData((prev) => ({
        ...prev,
        [selectedTrip]: data,
      }));
    });

    return () => unsub();
  }, [selectedTrip]);

  // 🔥 MERGE DEFAULT + CUSTOM
  const itineraries = [
    ...(baseData[selectedTrip] || []),
    ...(customData[selectedTrip] || []),
  ];

  const destinations = Object.keys(baseData);

  // 🔥 VOTES REALTIME
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

  // 🔥 VOTE FUNCTION
  async function handleVote(index) {
    const user = getUser();

    if (!user) {
      alert("You must be logged in to vote");
      return;
    }

    const voteRef = doc(db, "votes", selectedTrip, "users", user.email);

    await setDoc(voteRef, {
      option: index,
      timestamp: Date.now(),
    });
  }

  // 🆕 CREATE ITINERARY (ADDS TO FIREBASE ONLY)
  async function createItinerary() {
    if (!newTitle || !newItems) return alert("Fill all fields");

    const ref = collection(db, "itineraries", selectedTrip, "list");

    await addDoc(ref, {
      title: newTitle,
      img:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
      items: newItems.split(",").map((i) => i.trim()),
    });

    setNewTitle("");
    setNewItems("");
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

      {/* 🆕 CREATE BOX (ADDED ONLY, NOTHING REMOVED) */}
      <div style={styles.createBox}>
        <h3>Create New Itinerary</h3>

        <input
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Items (comma separated)"
          value={newItems}
          onChange={(e) => setNewItems(e.target.value)}
          style={styles.input}
        />

        <button onClick={createItinerary} style={styles.createBtn}>
          Add Itinerary
        </button>
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
                  {it.items?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div style={styles.voteCount}>Votes: {votes}</div>

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
    </div>
  );
}

/* 🎨 STYLES (UNCHANGED STYLE STRUCTURE) */
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
    marginBottom: "20px",
  },

  destButton: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },

  createBox: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  createBtn: {
    padding: "10px",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  cardRow: {
    display: "flex",
    gap: "15px",
    overflowX: "auto",
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
};