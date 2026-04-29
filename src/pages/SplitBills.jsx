import React, { useMemo, useState } from "react";

const initialFriends = [
  { id: 1, name: "Alex", amount: "22" },
  { id: 2, name: "Jordan", amount: "31" },
  { id: 3, name: "Taylor", amount: "27" },
  { id: 4, name: "Morgan", amount: "40" },
];

function IconBase({ className = "h-5 w-5", children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function DownloadIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </IconBase>
  );
}

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
  const [friends, setFriends] = useState(initialFriends);

  const subtotalValue = parseMoney(subtotal);
  const tax = subtotalValue * (parseMoney(taxPercent) / 100);
  const tip = subtotalValue * (parseMoney(tipPercent) / 100);
  const total = subtotalValue + tax + tip;

  const peopleCount = parseCount(people);

  const perPerson = peopleCount > 0 ? total / peopleCount : 0;

  return (
    <div style={{ padding: 30 }}>
      <h1>Split Bills</h1>

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="equal">Equal</option>
        <option value="custom">Custom</option>
      </select>

      <div>
        <input
          value={subtotal}
          onChange={(e) => setSubtotal(e.target.value)}
          placeholder="Subtotal"
        />
        <input
          value={taxPercent}
          onChange={(e) => setTaxPercent(e.target.value)}
          placeholder="Tax %"
        />
        <input
          value={tipPercent}
          onChange={(e) => setTipPercent(e.target.value)}
          placeholder="Tip %"
        />
        <input
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="People"
        />
      </div>

      <h2>Total: {currency(total)}</h2>

      {mode === "equal" && (
        <h3>Each pays: {currency(perPerson)}</h3>
      )}
    </div>
  );
}