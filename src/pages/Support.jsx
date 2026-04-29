import { useState, useEffect } from "react";
import "./Support.css";

export default function Support() {
  const [query, setQuery] = useState("");
  const [showTyping, setShowTyping] = useState(false);

  const faqData = {
    voting: [
      {
        q: "Why can't I submit my vote?",
        a: "Make sure you are logged in and part of the trip group. Each user can only vote once."
      },
      {
        q: "How do I see the voting results?",
        a: "Results appear automatically after you submit your vote. If not, refresh the page."
      },
      {
        q: "Can I change my vote?",
        a: "Currently, votes cannot be changed once submitted."
      }
    ],
    planning: [
      {
        q: "How do I add activities to the trip?",
        a: "Go to your trip page and click 'Add Activity'. Other members will see it instantly."
      },
      {
        q: "Can everyone edit the itinerary?",
        a: "Yes! All group members can add, remove, or vote on activities."
      }
    ],
    bills: [
      {
        q: "How does bill splitting work?",
        a: "Enter the total cost and select who participated. Triply will calculate each person's share."
      },
      {
        q: "Can I track who paid?",
        a: "Yes, each bill shows who has paid and who still owes."
      }
    ]
  };

  const getResults = () => {
    const text = query.toLowerCase();

    if (text.includes("vote") || text.includes("voting")) return faqData.voting;
    if (text.includes("trip") || text.includes("plan")) return faqData.planning;
    if (text.includes("bill") || text.includes("split")) return faqData.bills;

    return [];
  };

  const results = getResults();

  // Typing animation trigger
  useEffect(() => {
    if (query.length > 0) {
      setShowTyping(true);
      const timer = setTimeout(() => setShowTyping(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [query]);

  return (
    <div className="support-container">

      {/* Header */}
      <h1 className="support-title">How can we help?</h1>
      <p className="support-subtitle">Search for answers or browse common topics.</p>

      {/* Search Bar */}
      <div className="support-search">
        <input
          type="text"
          placeholder="Type your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* Typing Indicator */}
      {showTyping && (
        <div className="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      )}

      {/* FAQ Results */}
      {query.length > 0 && (
        <div className="faq-results">
          <h2>Results</h2>

          {results.length > 0 ? (
            results.map((item, i) => (
              <div key={i} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))
          ) : (
            <p>No results found. Try searching “voting”, “trip planning”, or “bill splitting”.</p>
          )}
        </div>
      )}

      {/* Contact Support */}
      <div className="contact-support">
        <h2>Contact Support</h2>
        <p>If you still need help, reach out to one of us:</p>

        <div className="contact-list">

          <div className="contact-card">
            <h3>Amari Cephas</h3>
            <p>Email: cephasam@kean.edu</p>
            <p>Major: Information Technology</p>
          </div>

          <div className="contact-card">
            <h3>Daniel Martinez</h3>
            <p>Email: martind2@kean.edu</p>
            <p>Major: Information Technology</p>
          </div>

          <div className="contact-card">
            <h3>Alka Vergeon</h3>
            <p>Email: vergeona@kean.edu</p>
            <p>Major: Information Technology</p>
          </div>

          <div className="contact-card">
            <h3>Michael Orenaiya</h3>
            <p>Email: orenaiym@kean.edu</p>
            <p>Major: Information Technology</p>
          </div>

        </div>
      </div>

    </div>
  );
}
