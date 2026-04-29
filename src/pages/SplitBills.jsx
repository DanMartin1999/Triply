import React, { useState } from "react";

const initialFriends = [
  { id: 1, name: "Alex", amount: "22" },
  { id: 2, name: "Jordan", amount: "31" },
  { id: 3, name: "Taylor", amount: "27" },
  { id: 4, name: "Morgan", amount: "40" },
];

// ----------------------
// UTIL FUNCTIONS
// ----------------------

function parseMoney(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function parseCount(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function currency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value || 0);
}

// ----------------------
// MAIN COMPONENT
// ----------------------

export default function SplitBills() {
  const [mode, setMode] = useState("equal");
  const [subtotal, setSubtotal] = useState("100");
  const [taxPercent, setTaxPercent] = useState("8");
  const [tipPercent, setTipPercent] = useState("18");
  const [people, setPeople] = useState("4");
  const [friends] = useState(initialFriends);

  const subtotalValue = parseMoney(subtotal);
  const tax = subtotalValue * (parseMoney(taxPercent) / 100);
  const tip = subtotalValue * (parseMoney(tipPercent) / 100);
  const total = subtotalValue + tax + tip;

  const peopleCount = parseCount(people);
  const perPerson = peopleCount > 0 ? total / peopleCount : 0;

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>💸 Split Bills</h1>

      {/* MODE TOGGLE */}
      <div style={styles.modeRow}>
        <button
          onClick={() => setMode("equal")}
          style={mode === "equal" ? styles.activeBtn : styles.btn}
        >
          Equal Split
        </button>

        <button
          onClick={() => setMode("custom")}
          style={mode === "custom" ? styles.activeBtn : styles.btn}
        >
          Custom
        </button>
      </div>

      {/* INPUT CARD */}
      <div style={styles.card}>
        <h3>Trip Expenses</h3>

        <div style={styles.grid}>

          <div>
            <label style={styles.label}>Subtotal ($)</label>
            <input
              value={subtotal}
              onChange={(e) => setSubtotal(e.target.value)}
              placeholder="e.g. 100"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Tax (%)</label>
            <input
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              placeholder="e.g. 8"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Tip (%)</label>
            <input
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              placeholder="e.g. 18"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>People</label>
            <input
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              placeholder="e.g. 4"
              style={styles.input}
            />
          </div>

        </div>
      </div>

      {/* BREAKDOWN */}
      <div style={styles.breakdown}>
        <h3>Breakdown</h3>

        <div style={styles.row}>
          <span>Subtotal</span>
          <span>{currency(subtotalValue)}</span>
        </div>

        <div style={styles.row}>
          <span>Tax</span>
          <span>{currency(tax)}</span>
        </div>

        <div style={styles.row}>
          <span>Tip</span>
          <span>{currency(tip)}</span>
        </div>

        <hr />

        <div style={{ ...styles.row, fontWeight: "bold" }}>
          <span>Total</span>
          <span>{currency(total)}</span>
        </div>

        {mode === "equal" && (
          <div style={styles.perPerson}>
            Each person pays: <strong>{currency(perPerson)}</strong>
          </div>
        )}
      </div>

      {/* FRIENDS PREVIEW */}
      <div style={styles.friendCard}>
        <h3>Trip Friends</h3>
        <div style={styles.friendRow}>
          {friends.map((f) => (
            <div key={f.id} style={styles.friendPill}>
              {f.name}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ----------------------
// STYLES
// ----------------------

const styles = {
  page: {
    fontFamily: "Inter",
    padding: "30px",
    maxWidth: "900px",
    margin: "auto",
    background: "#f4f7fb",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },

  modeRow: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  btn: {
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
  },

  activeBtn: {
    padding: "10px 16px",
    borderRadius: 999,
    border: "1px solid #111",
    background: "#111",
    color: "white",
    cursor: "pointer",
  },

  card: {
    background: "white",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginTop: 10,
  },

  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "6px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
  },

  breakdown: {
    background: "white",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
  },

  perPerson: {
    marginTop: 15,
    padding: 12,
    background: "#f1f5f9",
    borderRadius: 10,
    textAlign: "center",
  },

  friendCard: {
    marginTop: 20,
    background: "white",
    padding: 15,
    borderRadius: 16,
  },

  friendRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },

  friendPill: {
    padding: "6px 12px",
    background: "#e2e8f0",
    borderRadius: 999,
    fontSize: 13,
  },
};