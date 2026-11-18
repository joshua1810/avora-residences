import { Suspense } from "react";
import { Asset, Hero, Navigation } from "./hero";
import { DesignStudies } from "./studies";
import { EnquiryForm } from "./enquiry";
import { SelectedProjects } from "./projects";

const categories = [
  { title: "Villas", description: "Private homes with space, light and greenery.", image: "golden-hour-modern-villa-retreat1.png", beds: "3–5 BHK", location: "Sarjapur Road, Bengaluru", icon: "vector5.svg" },
  { title: "Apartments", description: "Contemporary living with thoughtful amenities.", image: "avora-apartments1.png", beds: "2–4 BHK", location: "Whitefield, Bengaluru", icon: "vector6.svg" },
  { title: "Row Houses", description: "The comfort of a home with a sense of community.", image: "avora-row-houses1.png", beds: "3–4 BHK", location: "North Bengaluru", icon: "vector3.svg" },
];

function Approach() {
  return (
    <section id="approach" tabIndex={-1} className="approach ivory" aria-labelledby="approach-title">
      <div className="shell">
        <header className="section-top flex justify-between">
          <p>01 / Our Approach</p><p>Built around the everyday</p>
        </header>
        <div className="approach-main editorial-grid">
          <h2 id="approach-title" className="editorial-heading"><span>Space to slow down</span> <em>Room to feel more</em></h2>
          <div className="approach-copy">
            <p>AVORA brings architecture and nature into the same conversation. We imagine homes around the rituals of daily life: morning light, a breeze through the courtyard, and a place to gather without hurry.</p>
            <a className="text-link" href="#homes">Find your home <Asset name="vector2.svg" className="turn-forward" /></a>
          </div>
        </div>
        <ul className="approach-values">
          {["Open-air living", "Honest materials", "Grounded in Nature", "Made for Living"].map((value) => <li key={value}>{value}</li>)}
        </ul>
      </div>
    </section>
  );
}

function ExploreHomes() {
  return (
    <section id="homes" tabIndex={-1} className="homes relative isolate overflow-hidden" aria-labelledby="homes-title">
      <Asset name="golden-courtyard-garden-retreat11.png" className="cover-image homes-background" />
      <p className="shell section-top">02 / Explore Homes</p>
      <div className="wide-shell">
        <h2 id="homes-title"><em>Find your home</em></h2>
        <div className="home-grid grid">
          {categories.map((home, index) => (
            <article key={home.title} className="home-card">
              <div className="home-card-heading">
                <p className="home-index" aria-hidden="true">0{index + 1}</p>
                <h3>{home.title}</h3>
                <p>{home.description}</p>
              </div>
              <a href={`?interest=${encodeURIComponent(home.title)}#enquiry`} className="home-photo relative block overflow-hidden"
                aria-label={`Enquire about ${home.title.toLowerCase()}`}>
                <Asset name={home.image} className="cover-image" />
                <Asset name="frame16.svg" className="home-arrow" />
              </a>
              <div className="home-meta flex flex-wrap items-center">
                <span><Asset name={home.icon} /> {home.beds}</span>
                <span><Asset name="vector4.svg" /> {home.location}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignStudiesIntro() {
  return (
    <section className="studies-intro relative isolate overflow-hidden" aria-labelledby="studies-intro-title">
      <Asset name="changs-villa-atropical-courtyard-house-in-goa1.png" className="cover-image"
        alt="A tropical courtyard house with warmly lit rooms around a reflecting pool at dusk" />
      <header className="shell section-top flex justify-between">
        <h2 id="studies-intro-title">03 / Design Studies</h2>
        <p>The way we build</p>
      </header>
      <a href="#design-studies" className="pill studies-intro-link">Step inside <Asset name="vector7.svg" className="turn-right" /></a>
    </section>
  );
}

function Enquiry() {
  return (
    <>
      <section className="conversation relative isolate overflow-hidden" aria-labelledby="conversation-title">
        <span className="conversation-mark wordmark" aria-hidden="true">a</span>
        <div className="shell">
          <p>A GOOD HOME STARTS WITH A CONVERSATION</p>
          <h2 id="conversation-title">What does a home <em>feel like to you?</em></h2>
          <a href="#enquiry" className="text-link">Tell us what you’re imagining <Asset name="frame17.svg" /></a>
        </div>
      </section>
      <section id="enquiry" tabIndex={-1} className="enquiry ivory" aria-labelledby="enquiry-title">
        <div className="shell">
          <header className="section-top flex justify-between"><p>Start somewhere</p><p>Let’s talk</p></header>
          <div className="editorial-grid enquiry-grid">
            <div>
              <h2 id="enquiry-title" className="editorial-heading">Let’s imagine <em>what’s possible.</em></h2>
              <p className="enquiry-description">Share a little about what you have in mind. We’ll make space for the details.</p>
            </div>
            <Suspense fallback={<p>Loading enquiry form…</p>}><EnquiryForm /></Suspense>
          </div>
          <footer className="footer flex flex-wrap items-center">
            <a href="#top" className="wordmark" aria-label="AVORA Residences, back to top">avora</a>
            <p>Homes shaped by nature</p>
            <a href="#top" className="text-link">Back to top <Asset name="vector2.svg" className="turn-up" /></a>
          </footer>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" tabIndex={-1} />
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Approach />
        <ExploreHomes />
        <DesignStudiesIntro />
        <DesignStudies />
        <SelectedProjects />
        <Enquiry />
      </main>
    </>
  );
}
