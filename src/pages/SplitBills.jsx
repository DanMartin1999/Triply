import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

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
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

IconBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

function DownloadIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </IconBase>
  );
}

DownloadIcon.propTypes = {
  className: PropTypes.string,
};

function ReceiptIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </IconBase>
  );
}

ReceiptIcon.propTypes = {
  className: PropTypes.string,
};

function UsersIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

UsersIcon.propTypes = {
  className: PropTypes.string,
};

function PercentIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M19 5 5 19" />
      <circle cx="7" cy="7" r="2" />
      <circle cx="17" cy="17" r="2" />
    </IconBase>
  );
}

PercentIcon.propTypes = {
  className: PropTypes.string,
};

function DollarIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H7" />
    </IconBase>
  );
}

DollarIcon.propTypes = {
  className: PropTypes.string,
};

function CalculatorIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h2" />
      <path d="M14 11h2" />
      <path d="M8 15h2" />
      <path d="M14 15h2" />
    </IconBase>
  );
}

CalculatorIcon.propTypes = {
  className: PropTypes.string,
};

function SparklesIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3Z" />
      <path d="M5 14l.8 1.7L7.5 17l-1.7.8L5 19.5l-.8-1.7L2.5 17l1.7-.8L5 14Z" />
      <path d="M19 14l.8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7Z" />
    </IconBase>
  );
}

SparklesIcon.propTypes = {
  className: PropTypes.string,
};

function parseMoney(value) {
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function parseCount(value) {
  const parsed = typeof value === "number" ? value : Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
}

function currency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(value) ? value : 0);
}

function buildCalculations({
  mode,
  subtotal,
  taxPercent,
  tipPercent,
  peopleCount,
  friends,
}) {
  const cleanPeople = parseCount(peopleCount);
  const cleanSubtotal = parseMoney(subtotal);
  const cleanTax = parseMoney(taxPercent);
  const cleanTip = parseMoney(tipPercent);

  const taxAmount = cleanSubtotal * (cleanTax / 100);
  const tipAmount = cleanSubtotal * (cleanTip / 100);
  const totalBill = cleanSubtotal + taxAmount + tipAmount;

  const normalizedFriends = Array.from({ length: cleanPeople }, (_, index) => {
    const friend = friends[index];
    return {
      id: friend?.id ?? index + 1,
      name: friend?.name?.trim() || `Friend ${index + 1}`,
      amount: friend?.amount ?? "0",
      numericAmount: parseMoney(friend?.amount ?? "0"),
    };
  });

  if (cleanPeople <= 0 || cleanSubtotal <= 0) {
    return {
      taxAmount,
      tipAmount,
      totalBill,
      customSubtotal: normalizedFriends.reduce(
        (sum, friend) => sum + friend.numericAmount,
        0,
      ),
      calculations: [],
    };
  }

  if (mode === "equal") {
    const eachPays = totalBill / cleanPeople;
    return {
      taxAmount,
      tipAmount,
      totalBill,
      customSubtotal: normalizedFriends.reduce(
        (sum, friend) => sum + friend.numericAmount,
        0,
      ),
      calculations: normalizedFriends.map((friend) => ({
        name: friend.name,
        ordered: cleanSubtotal / cleanPeople,
        taxShare: taxAmount / cleanPeople,
        tipShare: tipAmount / cleanPeople,
        total: eachPays,
        type: "equal",
      })),
    };
  }

  const customSubtotal = normalizedFriends.reduce(
    (sum, friend) => sum + friend.numericAmount,
    0,
  );

  if (customSubtotal <= 0) {
    return {
      taxAmount,
      tipAmount,
      totalBill,
      customSubtotal,
      calculations: [],
    };
  }

  return {
    taxAmount,
    tipAmount,
    totalBill,
    customSubtotal,
    calculations: normalizedFriends.map((friend) => {
      const ratio = friend.numericAmount / customSubtotal;
      const friendTax = taxAmount * ratio;
      const friendTip = tipAmount * ratio;

      return {
        name: friend.name,
        ordered: friend.numericAmount,
        taxShare: friendTax,
        tipShare: friendTip,
        total: friend.numericAmount + friendTax + friendTip,
        type: "custom",
      };
    }),
  };
}

function nearlyEqual(a, b) {
  return Math.abs(a - b) < 0.01;
}

const logicChecks = [
  {
    name: "Equal split sanity check",
    expected: "$65.00 each",
    passed: nearlyEqual(
      buildCalculations({
        mode: "equal",
        subtotal: 100,
        taxPercent: 10,
        tipPercent: 20,
        peopleCount: 2,
        friends: [
          { id: 1, name: "A", amount: "" },
          { id: 2, name: "B", amount: "" },
        ],
      }).calculations[0]?.total ?? 0,
      65,
    ),
  },
  {
    name: "Custom split sanity check",
    expected: "A pays $33.00, B pays $66.00",
    passed: (() => {
      const result = buildCalculations({
        mode: "custom",
        subtotal: 90,
        taxPercent: 10,
        tipPercent: 0,
        peopleCount: 2,
        friends: [
          { id: 1, name: "A", amount: "30" },
          { id: 2, name: "B", amount: "60" },
        ],
      });
      return (
        nearlyEqual(result.calculations[0]?.total ?? 0, 33) &&
        nearlyEqual(result.calculations[1]?.total ?? 0, 66)
      );
    })(),
  },
  {
    name: "Invalid subtotal guard",
    expected: "No calculations when subtotal is 0",
    passed:
      buildCalculations({
        mode: "equal",
        subtotal: 0,
        taxPercent: 10,
        tipPercent: 20,
        peopleCount: 2,
        friends: [],
      }).calculations.length === 0,
  },
  {
    name: "Custom empty amounts guard",
    expected: "No calculations when custom orders are empty",
    passed:
      buildCalculations({
        mode: "custom",
        subtotal: 100,
        taxPercent: 8,
        tipPercent: 15,
        peopleCount: 2,
        friends: [
          { id: 1, name: "A", amount: "" },
          { id: 2, name: "B", amount: "" },
        ],
      }).calculations.length === 0,
  },
];

function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-800">
      {children}
    </label>
  );
}

FieldLabel.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function TextInput({
  id,
  value,
  onChange,
  placeholder,
  className = "",
  type = "text",
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={`h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${className}`}
    />
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default function BillSplitPro() {
  const [mode, setMode] = useState("equal");
  const [subtotal, setSubtotal] = useState("100");
  const [taxPercent, setTaxPercent] = useState("8.875");
  const [tipPercent, setTipPercent] = useState("18");
  const [people, setPeople] = useState("4");
  const [friends, setFriends] = useState(initialFriends);
  const [lastCalculatedAt, setLastCalculatedAt] = useState("");
  const [notice, setNotice] = useState("");

  const subtotalValue = parseMoney(subtotal);
  const taxRate = parseMoney(taxPercent);
  const tipRate = parseMoney(tipPercent);
  const peopleCount = parseCount(people);

  const { taxAmount, tipAmount, totalBill, customSubtotal, calculations } =
    useMemo(
      () =>
        buildCalculations({
          mode,
          subtotal: subtotalValue,
          taxPercent: taxRate,
          tipPercent: tipRate,
          peopleCount,
          friends,
        }),
      [mode, subtotalValue, taxRate, tipRate, peopleCount, friends],
    );

  const validationMessage = useMemo(() => {
    if (peopleCount <= 0) return "Enter at least 1 person.";
    if (subtotalValue <= 0) return "Enter a valid subtotal.";
    if (mode === "custom" && customSubtotal <= 0)
      return "Enter each friend’s order amount for custom split.";
    if (calculations.length === 0)
      return "No payment results are available yet.";
    return "";
  }, [peopleCount, subtotalValue, mode, customSubtotal, calculations.length]);

  function updatePeople(value) {
    setPeople(value);
    const count = parseCount(value);

    setFriends((previousFriends) => {
      const nextFriends = [...previousFriends];

      while (nextFriends.length < count) {
        const nextNumber = nextFriends.length + 1;
        nextFriends.push({
          id: nextNumber,
          name: `Friend ${nextNumber}`,
          amount: "",
        });
      }

      return nextFriends.slice(0, count);
    });
  }

  function updateFriend(id, field, value) {
    setFriends((previousFriends) =>
      previousFriends.map((friend) =>
        friend.id === id ? { ...friend, [field]: value } : friend,
      ),
    );
  }

  function calculateNow() {
    if (validationMessage) {
      setNotice(validationMessage);
      return;
    }

    setNotice("Split calculated successfully.");
    setLastCalculatedAt(new Date().toLocaleString());
  }

  function buildReceiptText() {
    if (validationMessage || calculations.length === 0) {
      return "";
    }

    return [
      "BILLSPLIT PRO RECEIPT",
      "=====================",
      `Mode: ${mode === "equal" ? "Equal Split" : "Custom Split"}`,
      `Subtotal: ${currency(subtotalValue)}`,
      `Tax (${taxRate}%): ${currency(taxAmount)}`,
      `Tip (${tipRate}%): ${currency(tipAmount)}`,
      `Total Bill: ${currency(totalBill)}`,
      `People: ${peopleCount}`,
      "",
      "INDIVIDUAL PAYMENTS",
      "-------------------",
      ...calculations.map(
        (item, index) =>
          `${index + 1}. ${item.name}\n   Ordered: ${currency(item.ordered)}\n   Tax Share: ${currency(item.taxShare)}\n   Tip Share: ${currency(item.tipShare)}\n   Total Owed: ${currency(item.total)}`,
      ),
      "",
      `Generated: ${new Date().toLocaleString()}`,
    ].join("\n");
  }

  function downloadReceipt() {
    const receiptText = buildReceiptText();

    if (!receiptText) {
      setNotice(
        validationMessage ||
          "Add valid bill details before downloading a receipt.",
      );
      return;
    }

    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "billsplit-receipt.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setNotice("Receipt downloaded successfully.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-50 bg-white p-7 shadow-xl shadow-slate-100/60">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-50">
                Smart bill splitting
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                Bill Split Pro
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-50">
                Clean, compact controls for equal or custom splits. Enter the
                bill, set tax and tip, and see each person’s share instantly.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
                <p className="text-sm font-medium text-slate-50">People</p>
                <p className="mt-2 text-xl font-semibold text-slate-90">
                  {peopleCount}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-50 bg-slate-50 px-4 py-3 text-center">
                <p className="text-sm font-medium text-slate-500">Total bill</p>
                <p className="mt-2 text-xl font-semibold text-slate-100">
                  {currency(totalBill)}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-60 bg-slate-50 px-4 py-3 text-center">
                <p className="text-sm font-medium text-slate-100">
                  Last update
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {lastCalculatedAt ? lastCalculatedAt : "Not calculated yet"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900">Split Mode</h2>
            <select
              id="mode"
              value={mode}
              onChange={(event) => setMode(event.target.value)}
              className="mt-3 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-200 outline-none transition focus:border-blue-50 focus:ring-2 focus:ring-blue-10"
            >
              <option value="equal">Equal Split</option>
              <option value="custom">Custom Split By Order Amount</option>
            </select>

            <div className="mt-6 space-y-4">
              <div>
                <FieldLabel htmlFor="subtotal">Subtotal ($)</FieldLabel>
                <TextInput
                  id="subtotal"
                  value={subtotal}
                  onChange={setSubtotal}
                  placeholder="100"
                  className="mt-1"
                />
              </div>

              <div>
                <FieldLabel htmlFor="people">Number of People</FieldLabel>
                <TextInput
                  id="people"
                  value={people}
                  onChange={updatePeople}
                  placeholder="4"
                  className="mt-1"
                />
              </div>

              <div>
                <FieldLabel htmlFor="tax">Tax (%)</FieldLabel>
                <TextInput
                  id="tax"
                  value={taxPercent}
                  onChange={setTaxPercent}
                  placeholder="8.875"
                  className="mt-1"
                />
              </div>

              <div>
                <FieldLabel htmlFor="tip">Tip (%)</FieldLabel>
                <TextInput
                  id="tip"
                  value={tipPercent}
                  onChange={setTipPercent}
                  placeholder="18"
                  className="mt-1"
                />
              </div>
            </div>

            {mode === "custom" && (
              <div className="mt-6 space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Friend order details
                  </h3>
                  <p className="text-sm text-slate-500">
                    Add each person’s name and order amount for a fair split.
                  </p>
                </div>

                <div className="grid gap-3">
                  {friends.slice(0, peopleCount).map((friend, index) => (
                    <div
                      key={friend.id}
                      className="grid gap-3 sm:grid-cols-[1fr_160px]"
                    >
                      <TextInput
                        value={friend.name}
                        onChange={(value) =>
                          updateFriend(friend.id, "name", value)
                        }
                        placeholder={`Friend ${index + 1} name`}
                      />
                      <TextInput
                        value={friend.amount}
                        onChange={(value) =>
                          updateFriend(friend.id, "amount", value)
                        }
                        placeholder="Order amount"
                      />
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
                  Total orders:{" "}
                  <span className="font-semibold text-slate-900">
                    {currency(customSubtotal)}
                  </span>
                </div>
              </div>
            )}

            {validationMessage && (
              <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {validationMessage}
              </div>
            )}

            {notice && (
              <div className="mt-5 rounded-3xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                {notice}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={calculateNow}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-800"
              >
                Calculate split
              </button>
              <button
                type="button"
                onClick={downloadReceipt}
                disabled={
                  Boolean(validationMessage) || calculations.length === 0
                }
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download receipt
              </button>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Individual summary</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {mode === "equal"
                      ? "Everyone pays the same share of the total bill."
                      : "Each person pays for their order plus a fair share of tax and tip."}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-800 px-3 py-2 text-xs uppercase tracking-wide text-slate-300">
                  {mode === "equal" ? "Equal" : "Custom"}
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {calculations.length > 0 && !validationMessage ? (
                  calculations.map((item, index) => (
                    <article
                      key={`${item.name}-${index}`}
                      className="rounded-3xl border border-slate-800 bg-slate-900 p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {item.type === "equal"
                              ? "Equal split"
                              : "Custom split"}
                          </p>
                        </div>
                        <p className="text-2xl font-semibold text-emerald-300">
                          {currency(item.total)}
                        </p>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-3xl bg-slate-950 p-3 text-sm">
                          <p className="text-slate-400">Ordered</p>
                          <p className="mt-1 font-semibold text-white">
                            {currency(item.ordered)}
                          </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 p-3 text-sm">
                          <p className="text-slate-400">Tax share</p>
                          <p className="mt-1 font-semibold text-white">
                            {currency(item.taxShare)}
                          </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 p-3 text-sm">
                          <p className="text-slate-400">Tip share</p>
                          <p className="mt-1 font-semibold text-white">
                            {currency(item.tipShare)}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[28px] border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">
                    Add bill details to see the individual payment breakdown.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-900">
                Built-in checks
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Quick verification entries to confirm the calculation logic.
              </p>

              <div className="mt-5 space-y-3">
                {logicChecks.map((check) => (
                  <div
                    key={check.name}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {check.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Expected: {check.expected}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          check.passed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {check.passed ? "PASS" : "FAIL"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
