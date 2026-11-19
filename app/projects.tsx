"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Asset } from "./hero";

const privateVillas = {
  type: "Private Villas",
  location: "Sarjapur Road · 3–5 BHK",
  focus: "Privacy and indoor–outdoor living",
};

const projects = [
  {
    name: "Maison",
    image: "modern-villa-at-golden-hour1.png",
    description: "Sophisticated, residential",
    ...privateVillas,
  },
  {
    name: "Eden",
    image: "avora-solace-landscaped-villa.png",
    description: "Nature-inspired, exclusive",
    ...privateVillas,
  },
  {
    name: "Solace",
    image: "avora-solace-courtyard.png",
    type: "Private Villa",
    location: privateVillas.location,
    description: "An intimate collection of private villas designed for openness, greenery, and relaxed everyday living.",
    focus: "Privacy and indoor–outdoor connection",
  },
  {
    name: "Lumina",
    image: "avora-solace-apartments.png",
    description: "Light-filled, elegant, contemporary",
    type: "Apartments",
    location: "Whitefield · 2–4 BHK",
    focus: "Natural light and connected living",
  },
  {
    name: "Alden",
    image: "avora-solace-row-houses.png",
    description: "Timeless, grounded, residential",
    type: "Row Houses",
    location: "North Bengaluru · 3–4 BHK",
    focus: "Community and privacy",
  },
];

const initialProjectIndex = projects.findIndex((project) => project.name === "Solace");
const projectCount = projects.length;
const galleryProjects = [...projects, ...projects, ...projects];

function cardCenter(card: HTMLButtonElement) {
  return card.offsetLeft + card.offsetWidth / 2;
}

function scrollToProject(gallery: HTMLDivElement, index: number, behavior: ScrollBehavior) {
  const card = gallery.querySelectorAll("button")[index];
  if (card) gallery.scrollTo({ left: cardCenter(card) - gallery.clientWidth / 2, behavior });
}

function nearestCardIndex(gallery: HTMLDivElement) {
  const center = gallery.scrollLeft + gallery.clientWidth / 2;
  let nearestIndex = 0;
  let nearestDistance = Infinity;

  gallery.querySelectorAll("button").forEach((card, index) => {
    const distance = Math.abs(cardCenter(card) - center);
    if (distance < nearestDistance) {
      nearestIndex = index;
      nearestDistance = distance;
    }
  });

  return nearestIndex;
}

function middleCardIndex(index: number) {
  return projectCount + index % projectCount;
}

export function SelectedProjects() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapTimer = useRef<number | undefined>(undefined);
  const [selectedIndex, setSelectedIndex] = useState(initialProjectIndex);
  const selected = projects[selectedIndex];

  useLayoutEffect(() => {
    if (galleryRef.current) scrollToProject(galleryRef.current, middleCardIndex(initialProjectIndex), "instant");
    return () => window.clearTimeout(wrapTimer.current);
  }, []);

  function selectProject(index: number) {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollToProject(gallery, index, reducedMotion ? "instant" : "smooth");
  }

  function stepProject(direction: -1 | 1) {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const currentIndex = nearestCardIndex(gallery);
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < galleryProjects.length) {
      selectProject(nextIndex);
      return;
    }

    const middleIndex = middleCardIndex(currentIndex);
    scrollToProject(gallery, middleIndex, "instant");
    selectProject(middleIndex + direction);
  }

  function updateSelectedProject(gallery: HTMLDivElement) {
    window.clearTimeout(wrapTimer.current);
    const index = nearestCardIndex(gallery);
    const middleIndex = middleCardIndex(index);
    setSelectedIndex(index % projectCount);
    if (index === middleIndex) return;

    // Recenter on the identical card after scrolling settles, or immediately at a physical edge.
    const atEdge = gallery.scrollLeft <= 1 || gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 1;
    if (atEdge) scrollToProject(gallery, middleIndex, "instant");
    else wrapTimer.current = window.setTimeout(() => scrollToProject(gallery, middleIndex, "instant"), 150);
  }

  return (
    <section id="projects" tabIndex={-1} className="solace" aria-labelledby="solace-title">
      <div className="solace-inner">
        <header className="solace-header shell">
          <p>04 / Projects</p>
          <h2 id="solace-title"><em>avora</em> {selected.name}</h2>
          <p>Bengaluru, India</p>
        </header>
        <div className="solace-copy">
          <p className="solace-type">{selected.type}</p>
          <p className="solace-location">{selected.location}</p>
          <p className="solace-description">{selected.description}</p>
          <p className="solace-focus">Design focus: {selected.focus}</p>
        </div>
        <p className="sr-only" role="status">AVORA {selected.name}. {selected.type}. {selected.location}.</p>
        <div className="solace-carousel" role="group" aria-label="Select a project">
          <div id="project-gallery" className="solace-gallery" ref={galleryRef}
            onScroll={(event) => updateSelectedProject(event.currentTarget)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              stepProject(event.key === "ArrowLeft" ? -1 : 1);
            }}>
            {galleryProjects.map((project, index) => {
              const duplicate = index !== middleCardIndex(index);
              const isSelected = index % projectCount === selectedIndex;
              return (
                <button type="button" className="solace-view" data-project={project.name} data-current={isSelected}
                  key={`${project.name}-${index}`} aria-label={`AVORA ${project.name}`}
                  aria-hidden={duplicate || undefined} aria-pressed={duplicate ? undefined : isSelected}
                  tabIndex={duplicate ? -1 : undefined} onMouseDown={(event) => { if (duplicate) event.preventDefault(); }}
                  onClick={() => selectProject(index)}>
                  <span className="solace-photo"><Asset name={project.image} /></span>
                </button>
              );
            })}
          </div>
          <button type="button" className="solace-arrow solace-arrow--previous" aria-label="Previous project"
            aria-controls="project-gallery" onClick={() => stepProject(-1)} />
          <button type="button" className="solace-arrow solace-arrow--next" aria-label="Next project"
            aria-controls="project-gallery" onClick={() => stepProject(1)} />
        </div>
      </div>
    </section>
  );
}
