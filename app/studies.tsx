"use client";

import { useId, useState } from "react";
import { Asset } from "./hero";

const studies = [
  {
    title: "Life flows a little easier.",
    caption: "A courtyard home / Design study",
    image: "courtyard-villa-design-ideas-for-privacy-light-ventilation1.png",
    alt: "A courtyard framed by timber pavilions, with a tree and reflecting pool at its centre",
    intro: "Wide openings and natural finishes blur the edges between the sheltered indoors and the garden just beyond.",
    closing: "Room to exhale",
    points: [
      { title: "The living courtyard", text: "A planted centre gives the rooms a shared outlook.", x: 52.6, y: 51.6 },
      { title: "The living pavilion", text: "Wide openings frame the garden from a sheltered living area.", x: 15.7, y: 61.3 },
      { title: "The reflecting pool", text: "Water catches the light and draws the eye across the courtyard.", x: 73, y: 77.4 },
    ],
  },
  {
    title: "Grounded in place",
    caption: "Nature close by / Design study",
    image: "natural-materials-in-modern-sustainable-architecture-aecord1.png",
    alt: "A timber-lined terrace and stone steps opening onto a planted garden",
    intro: "Timber with a natural warmth. Stone that anchors a room. Greenery that changes with the light. A quieter kind of luxury you can feel in the spaces you use every day.",
    closing: "Made to feel personal",
    points: [
      { title: "The resting backyard", text: "A sheltered terrace makes room to pause at the edge of the garden.", x: 29, y: 57.3 },
      { title: "The natural stone", text: "Stone brings texture to the threshold between house and garden.", x: 52.6, y: 83.1 },
      { title: "The nature area", text: "Planting softens the terrace and brings the garden close.", x: 87.9, y: 61.7 },
    ],
  },
];

function Study({ study, reverse }: { study: (typeof studies)[number]; reverse: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const id = useId();
  const toggle = (index: number) => setSelected(selected === index ? null : index);

  return (
    <article className="study-row" data-reverse={reverse} aria-labelledby={`${id}-title`}>
      <figure className="study-photo relative overflow-hidden">
        <Asset name={study.image} alt={study.alt} className="cover-image" />
        <figcaption>{study.caption}</figcaption>
        {study.points.map((point, index) => (
          <button type="button" key={point.title} className="study-pin"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            aria-label={point.title} aria-expanded={selected === index} aria-controls={`${id}-detail-${index}`}
            onClick={() => toggle(index)}>
            <Asset name={`ellipse${index + 1}.svg`} /><span aria-hidden="true">{index + 1}</span>
          </button>
        ))}
      </figure>
      <div className="study-copy">
        <p className="section-tag">A closer look</p>
        <h3 id={`${id}-title`}>{study.title}</h3>
        <p className="study-intro">{study.intro}</p>
        <div className="study-details">
          {study.points.map((point, index) => (
            <div className="study-detail" key={point.title}>
              <button type="button" aria-expanded={selected === index} aria-controls={`${id}-detail-${index}`}
                onClick={() => toggle(index)}>
                <span>{String(index + 1).padStart(2, "0")} {point.title}</span>
                <Asset name="vector2.svg" className="turn-forward" />
              </button>
              <p id={`${id}-detail-${index}`} hidden={selected !== index}>{point.text}</p>
            </div>
          ))}
        </div>
        <p className="study-closing"><em>{study.closing}</em></p>
      </div>
    </article>
  );
}

export function DesignStudies() {
  return (
    <section id="design-studies" tabIndex={-1} className="studies" aria-labelledby="studies-title">
      <div className="wide-shell">
        <header className="studies-heading flex items-end justify-between">
          <h2 id="studies-title"><em>Follow the feeling</em></h2>
          <p>Little details.<br />A different kind of everyday</p>
        </header>
        <div className="study-grid">
          {studies.map((study, index) => <Study key={study.title} study={study} reverse={index === 1} />)}
        </div>
      </div>
    </section>
  );
}
