import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const flights = [
  { airline: "Skyline Air", tag: "BEST VALUE", depart: "8:40 AM", duration: "9h 20m", arrive: "6:00 PM", route: "JFK  •  Nonstop  •  LHR", price: 385 },
  { airline: "North Atlantic", tag: "LOWEST TOTAL", depart: "10:15 AM", duration: "8h 55m", arrive: "7:10 PM", route: "EWR  •  Nonstop  •  LHR", price: 402 },
  { airline: "United Wings", tag: "FASTEST", depart: "6:30 PM", duration: "7h 45m", arrive: "6:15 AM", route: "JFK  •  Nonstop  •  LGW", price: 418 }
];

const navItems = [
  ["home", "Home"],
  ["deals", "Deals"],
  ["trips", "Trips"],
  ["alerts", "Alerts"],
  ["profile", "Profile"]
];

function StatusBar() {
  return <div className="status"><b>9:41</b><span>5G　100%</span></div>;
}

function BottomNav({ active, go }) {
  return (
    <nav className="bottom-nav">
      {navItems.map(([id, label]) => (
        <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>
          <i />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Shell({ children, active, go, noNav = false, dark = false }) {
  return (
    <main className={`phone ${dark ? "dark" : ""}`}>
      {!dark && <StatusBar />}
      <section className={`screen ${noNav ? "no-nav" : ""}`}>{children}</section>
      {!noNav && <BottomNav active={active} go={go} />}
    </main>
  );
}

const Back = ({ onClick }) => <button className="back" aria-label="Go back" onClick={onClick}>‹</button>;
const Badge = ({ children, blue = false, amber = false }) => <span className={`badge ${blue ? "blue" : ""} ${amber ? "amber" : ""}`}>{children}</span>;

function Onboarding({ go }) {
  return (
    <Shell dark noNav>
      <div className="onboarding">
        <b className="brand">FAREWISE</b>
        <h1>Fly farther.<br />Pay less.</h1>
        <p>Compare fares, understand price trends, and book with confidence.</p>
        <div className="hero-fare">
          <div><b>NYC</b><b>LON</b></div>
          <strong>→</strong>
          <h2>$385</h2>
          <Badge>18% BELOW AVERAGE</Badge>
        </div>
        <div className="onboard-actions">
          <button className="primary" onClick={() => go("signin")}>Get started</button>
          <button className="text-light" onClick={() => go("signin")}>Already have an account?&nbsp; Sign in</button>
        </div>
      </div>
    </Shell>
  );
}

function SignIn({ go }) {
  return (
    <Shell noNav>
      <div className="page signin">
        <h1>Welcome back</h1>
        <p className="sub">Sign in to keep tracking the best fares.</p>
        <label htmlFor="email">EMAIL</label>
        <input id="email" type="email" autoComplete="email" defaultValue="alex@example.com" />
        <label htmlFor="password">PASSWORD</label>
        <input id="password" type="password" autoComplete="current-password" defaultValue="farewise1" />
        <button className="link right">Forgot password?</button>
        <button className="primary" onClick={() => go("home")}>Sign in</button>
        <div className="divider"><span>or continue with</span></div>
        <div className="socials"><button>Google</button><button>Apple</button></div>
        <p className="center muted">New to Farewise?&nbsp; Create account</p>
        <button className="link center-btn" onClick={() => go("home")}>Continue as guest</button>
      </div>
    </Shell>
  );
}

function Home({ go }) {
  return (
    <Shell active="home" go={go}>
      <div className="page">
        <div className="heading-row">
          <div><h1>Good morning, Alex</h1><p className="sub">Chicago, United States</p></div>
          <button className="notice">1</button>
        </div>
        <div className="search-card">
          <h2>Find your lowest fare</h2>
          <div className="tabs"><b>ROUND TRIP</b><span>ONE WAY</span></div>
          <label>FROM</label><strong>Chicago&nbsp; ORD</strong>
          <hr />
          <label>TO</label><strong>London&nbsp; LHR</strong>
          <button className="primary" onClick={() => go("results")}>Search lowest fares</button>
        </div>
        <div className="section-title"><h2>Today’s best deals</h2><button className="link" onClick={() => go("deals")}>See all</button></div>
        <div className="deal-grid">
          <DealCard tone="lavender" city="Paris" from="From Chicago" price="$429 round trip" />
          <DealCard tone="mint" city="Tokyo" from="From Los Angeles" price="$518 round trip" />
        </div>
        <h2 className="recent-title">Recent searches</h2>
      </div>
    </Shell>
  );
}

function DealCard({ tone, city, from, price }) {
  return <button className="deal-card"><span className={`image-block ${tone}`} /><b>{city}</b><small>{from}</small><strong>{price}</strong></button>;
}

function Results({ go }) {
  return (
    <Shell active="home" go={go}>
      <div className="page">
        <header className="title-with-back"><Back onClick={() => go("home")} /><div><h1>New York → London</h1><p className="sub">Jun 11–18 · 1 traveler</p></div></header>
        <div className="date-strip">
          <span>Jun 10<br /><b>$420</b></span><span className="selected">Jun 11<br /><b>$385</b></span><span>Jun 12<br /><b>$410</b></span><span>Jun 13<br /><b>$398</b></span>
        </div>
        <div className="result-meta"><span>24 flights found</span><button>Sort: Smart</button></div>
        <div className="flight-list">
          {flights.map((flight) => <FlightCard key={flight.airline} flight={flight} onClick={() => go("detail")} />)}
        </div>
      </div>
    </Shell>
  );
}

function FlightCard({ flight, onClick }) {
  return (
    <button className="flight-card" onClick={onClick}>
      <div className="card-top"><b>{flight.airline}</b><Badge>{flight.tag}</Badge></div>
      <div className="times"><strong>{flight.depart}</strong><b>{flight.duration}</b><strong>{flight.arrive}</strong></div>
      <p>{flight.route}</p>
      <div className="card-bottom"><b>Save $86</b><span><small>From</small> <strong>${flight.price}</strong></span></div>
    </button>
  );
}

function FlightDetail({ go }) {
  return (
    <Shell active="home" go={go}>
      <div className="page">
        <header className="title-with-back between"><div className="inline"><Back onClick={() => go("results")} /><h1>Flight details</h1></div><Badge>BEST VALUE</Badge></header>
        <div className="detail-card">
          <h3>Skyline Air&nbsp; SA 204</h3>
          <div className="route-time"><div><strong>8:40 AM</strong><b>JFK</b></div><span>9h 20m</span><div><strong>6:00 PM</strong><b>LHR</b></div></div>
          <p>Nonstop · Boeing 787 · Economy</p>
        </div>
        <button className="buy-card" onClick={() => go("forecast")}><h2>Buy now</h2><p>Current price is 18% below the 30-day average.</p><span>72% chance prices rise in the next 48 hours.</span></button>
        <h2>Fare summary</h2>
        <div className="fare-summary"><span>Ticket <b>$342</b></span><span>Taxes & fees <b>$43</b></span><hr /><strong>Total <b>$385</b></strong></div>
        <p className="muted">1 carry-on included · No checked bag</p>
        <button className="primary bottom-action" onClick={() => go("booking")}>Compare 6 booking sites</button>
      </div>
    </Shell>
  );
}

function Forecast({ go }) {
  return (
    <Shell active="alerts" go={go}>
      <div className="page">
        <header className="title-with-back"><Back onClick={() => go("detail")} /><div><h1>Price forecast</h1><p className="sub">NYC → LON · Jun 11–18</p></div></header>
        <div className="chart-card">
          <p>Current fare</p><div className="chart-price"><strong>$385</strong><Badge>−12% this week</Badge></div>
          <svg viewBox="0 0 300 150" role="img" aria-label="Price trend chart">
            <path className="grid" d="M10 35H290M10 82H290M10 129H290" />
            <path d="M15 102L58 120M58 83L100 72M100 93L145 128M145 58L190 46M190 68L235 112M235 24L285 5" />
            <g><circle cx="15" cy="102" r="4"/><circle cx="58" cy="83" r="4"/><circle cx="100" cy="93" r="4"/><circle cx="145" cy="58" r="4"/><circle cx="190" cy="68" r="4"/><circle cx="235" cy="24" r="4"/><circle cx="285" cy="42" r="4"/></g>
          </svg>
          <div className="chart-labels"><span>7 days ago</span><span>Today</span></div>
        </div>
        <h2>Smart recommendation</h2>
        <div className="recommend"><b>BOOK WITHIN 24 HOURS</b><h2>Good price for this route</h2><p>Historical low: $352　·　Average: $469</p><strong>Confidence 84%</strong></div>
        <div className="simple-card"><b>Flexible dates</b><span>Leave one day earlier and save $86</span></div>
      </div>
    </Shell>
  );
}

function Booking({ go }) {
  const sites = [
    ["Farewise Pick", "LOWEST TOTAL", "$385", "Includes taxes · Carry-on included"],
    ["Skyline Air", "AIRLINE DIRECT", "$397", "Includes taxes · Fees may apply"],
    ["TripJet", "FLEXIBLE REFUND", "$402", "Includes taxes · Fees may apply"],
    ["FlyNow", "POPULAR", "$409", "Includes taxes · Fees may apply"]
  ];
  return (
    <Shell active="home" go={go}>
      <div className="page">
        <header className="title-with-back"><Back onClick={() => go("detail")} /><div><h1>Compare booking sites</h1><p className="sub">Same flight · Total price comparison</p></div></header>
        <div className="site-list">
          {sites.map(([name, tag, price, desc], index) => <div className="site-card" key={name}><div><b>{name}</b><Badge blue={index > 0}>{tag}</Badge><p>{desc}</p></div><div><strong>{price}</strong><button className="link">View</button></div></div>)}
        </div>
        <div className="demo-note">Demo only: checkout is not available.</div>
      </div>
    </Shell>
  );
}

function Deals({ go }) {
  const deals = [
    ["lavender", "Lisbon, Portugal", "ORD → LIS", "$438 round trip", "SAVE 31%"],
    ["mint", "Cancún, Mexico", "ORD → CUN", "$212 round trip", "SAVE 26%"],
    ["purple", "Reykjavík, Iceland", "ORD → KEF", "$467 round trip", "SAVE 22%"]
  ];
  return (
    <Shell active="deals" go={go}>
      <div className="page">
        <h1>Explore deals</h1><p className="sub">Flexible destinations, surprisingly low fares.</p>
        <input className="search-input" placeholder="Search destinations or countries" />
        <div className="chips"><Badge blue>Weekend</Badge><Badge>Under $500</Badge><Badge amber>International</Badge></div>
        <div className="explore-list">{deals.map(([tone, city, route, price, save]) => <button className="explore-card" key={city}><span className={`image-block ${tone}`} /><span><b>{city}</b><small>{route}</small><strong>{price}</strong><Badge>{save}</Badge></span></button>)}</div>
      </div>
    </Shell>
  );
}

function Alerts({ go }) {
  const alerts = [
    ["Chicago → Tokyo", "$518", "Target $560", "DOWN $42"],
    ["New York → Paris", "$429", "Target $400", "$29 TO TARGET"],
    ["Los Angeles → Seoul", "$612", "Target $650", "DOWN $38"]
  ];
  return (
    <Shell active="alerts" go={go}>
      <div className="page">
        <h1>Price alerts</h1><p className="sub">We watch the fares so you do not have to.</p>
        <button className="primary">+ Create price alert</button>
        <div className="alert-list">{alerts.map(([route, price, target, delta]) => <button className="alert-card" key={route} onClick={() => go("forecast")}><b>{route}</b><div><span><small>Current</small><strong>{price}</strong></span><span>{target}</span><Badge>{delta}</Badge></div><small>Updated just now</small></button>)}</div>
      </div>
    </Shell>
  );
}

function Trips({ go }) {
  return (
    <Shell active="trips" go={go}>
      <div className="page">
        <h1>Trips</h1><p className="sub">Your saved and upcoming journeys.</p>
        <div className="empty-state"><div className="plane">✈</div><h2>No trips yet</h2><p>When you save or book a flight, it will appear here.</p><button className="primary" onClick={() => go("home")}>Find a flight</button></div>
      </div>
    </Shell>
  );
}

function Profile({ go }) {
  const rows = ["Saved flights", "Recent searches", "Traveler details", "Currency · USD", "Language · English", "Notifications", "Privacy & terms"];
  return (
    <Shell active="profile" go={go}>
      <div className="page">
        <h1>Profile</h1>
        <div className="profile-card"><span className="avatar">A</span><span><b>Alex Morgan</b><small>alex@example.com</small><Badge>$624 SAVED</Badge></span></div>
        <div className="settings">{rows.map((row) => <button key={row}>{row}<span>›</span></button>)}</div>
        <p className="prototype-note">Prototype uses mock flight and pricing data.</p>
      </div>
    </Shell>
  );
}

function App() {
  const [page, setPage] = useState("onboarding");
  const go = (next) => {
    setPage(next);
    window.scrollTo(0, 0);
  };
  const pages = {
    onboarding: <Onboarding go={go} />, signin: <SignIn go={go} />, home: <Home go={go} />,
    results: <Results go={go} />, detail: <FlightDetail go={go} />, forecast: <Forecast go={go} />,
    booking: <Booking go={go} />, deals: <Deals go={go} />, alerts: <Alerts go={go} />,
    trips: <Trips go={go} />, profile: <Profile go={go} />
  };
  return <div className="app">{pages[page]}</div>;
}

createRoot(document.getElementById("root")).render(<App />);
