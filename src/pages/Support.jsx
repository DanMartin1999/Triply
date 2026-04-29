import { useState, useEffect } from "react";

export default function Support() {
  const styles = `
  .support-container {
    max-width: 900px;
    margin: auto;
    padding: 40px 20px;
    font-family: "Inter", sans-serif;
  }

  .support-title {
    text-align: center;
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .support-subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
  }

  /* Search Bar */
  .support-search {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 25px;
  }

  .support-search input {
    width: 60%;
    padding: 14px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
  }

  .support-search button {
    padding: 14px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .support-search button:hover {
    background: #005fcc;
  }

  /* Typing Indicator */
  .typing-indicator {
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    background: #007bff;
    border-radius: 50%;
    margin: 0 4px;
    animation: typing 1s infinite ease-in-out;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0% { opacity: 0.2; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-4px); }
    100% { opacity: 0.2; transform: translateY(0); }
  }

  /* FAQ Results */
  .faq-results {
    margin-top: 20px;
  }

  .faq-item {
    background: #f8f8f8;
    padding: 18px;
    border-radius: 12px;
    margin-bottom: 15px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }

  .faq-item h3 {
    margin-bottom: 6px;
  }

  /* Contact Support */
  .contact-support {
    margin-top: 50px;
  }

  .contact-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 15px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .contact-card {
    background: #f3f3f3;
    padding: 18px;
    border-radius: 12px;
    width: 260px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  }
  `;

  const [query, setQuery] = useState("");
  const [showTyping, setShowTyping] = useState(false);

  const faqData = {
    voting: [
      { q: "Why can't I submit my vote?", a: "Make sure you are logged in and part of the trip group. Each user can only vote once." },
      { q: "How do I see the voting results?", a: "Results appear automatically after you submit your vote. If not, refresh the page." },
      { q: "Can I change my vote?", a: "Currently, votes cannot be changed once submitted." }
    ],
    planning: [
      { q: "How do I add activities to the trip?", a: "Go to your trip page and click 'Add Activity'. Other members will see it instantly." },
      { q: "Can everyone edit the itinerary?", a: "Yes! All group members can add, remove, or vote on activities." }
    ],
    bills: [
      { q: "How does bill splitting work?", a: "Enter the total cost and select who participated. Triply will calculate each person's share." },
      { q: "Can I track who paid?", a: "Yes, each bill shows who has paid and who still owes." }
    ]
  };

  const getResults = () => {
    const text = query.toLowerCase();

    if (text.includes("vote")) return faqData.voting;
    if (text.includes("trip") || text.includes("plan")) return faqData.planning;
    if (text.includes("bill") || text.includes("split")) return faqData.bills;

    return [];
  };

  const results = getResults();

  useEffect(() => {
    if (query.length > 0) {
      setShowTyping(true);
      const timer = setTimeout(() => setShowTyping(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [query]);

  return (
    <>
      <style>{styles}</style>

      <div className="support-container">

        <h1 className="support-title">How can we help?</h1>
        <p className="support-subtitle">Search for answers or browse common topics.</p>

        <div className="support-search">
          <input
            type="text"
            placeholder="Type your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button>Search</button>
        </div>

        {showTyping && (
          <div className="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        )}

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
    </>
  );
}