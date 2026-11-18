"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const desktopMotionQuery = "(min-width: 801px) and (prefers-reduced-motion: no-preference)";
const assetRoot = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets`;

const links = [
  ["Our approach", "#approach"],
  ["Explore Homes", "#homes"],
  ["Design Studies", "#design-studies"],
  ["Projects", "#projects"],
];

export function Asset({ name, alt = "", className, eager = false, priority = false }: {
  name: string; alt?: string; className?: string; eager?: boolean; priority?: boolean;
}) {
  return <img src={`${assetRoot}/${name}`} alt={alt} className={className}
    decoding="async" fetchPriority={priority ? "high" : undefined} loading={eager ? "eager" : "lazy"} />;
}

function useSectionScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrolling: gsap.core.Tween | undefined;

    const followLink = (event: MouseEvent) => {
      if (reducedMotion.matches || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.target || link.hasAttribute("download") ||
        link.classList.contains("skip-link")) return;

      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(url.hash.slice(1));
      if (!target) return;

      event.preventDefault();
      if (url.href !== location.href) window.history.pushState(null, "", url);
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const destination = url.hash === "#top" ? 0 : Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);
      const distance = Math.abs(window.scrollY - destination);
      scrolling?.kill();
      scrolling = gsap.to(window, {
        scrollTo: { y: destination, autoKill: true },
        duration: gsap.utils.clamp(0.45, 1.2, distance / 1400),
        ease: "power3.inOut",
        onComplete: () => target.focus({ preventScroll: true }),
      });
    };

    function stop() { scrolling?.kill(); }
    document.addEventListener("click", followLink);
    window.addEventListener("popstate", stop);
    reducedMotion.addEventListener("change", stop);
    return () => {
      stop();
      document.removeEventListener("click", followLink);
      window.removeEventListener("popstate", stop);
      reducedMotion.removeEventListener("change", stop);
    };
  }, []);
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  useSectionScroll();

  useEffect(() => {
    const desktopMotion = window.matchMedia(desktopMotionQuery);
    const update = () => setScrolled(!desktopMotion.matches && window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const desktop = window.matchMedia("(min-width: 801px)");
    const close = () => setOpen(false);
    desktop.addEventListener("change", close);
    desktopMotion.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      desktop.removeEventListener("change", close);
      desktopMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled} data-open={open}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuToggle.current?.focus();
        }
      }}>
      <nav className="nav-inner relative mx-auto flex items-center justify-between" aria-label="Main navigation">
        <a href="#top" className="wordmark" aria-label="AVORA Residences, back to top" onClick={() => setOpen(false)}>avora</a>
        <button ref={menuToggle} className="menu-toggle" aria-controls="site-links" aria-expanded={open}
          onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
        <div id="site-links" className="site-links flex items-center">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </div>
        <a href="#enquiry" className="nav-enquiry inline-flex items-center" onClick={() => setOpen(false)}>
          Let’s talk <Asset name="vector1.svg" eager />
        </a>
      </nav>
    </header>
  );
}

export function Hero() {
  const scene = useRef<HTMLDivElement>(null);

  const stage = useRef<HTMLDivElement>(null);
  const cutout = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const sequence = scene.current;
    const frame = stage.current;
    const house = cutout.current;
    const photo = frame?.querySelector<HTMLImageElement>(".reveal-photo");
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!sequence || !frame || !house || !photo || !header) return;

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add(desktopMotionQuery, () => {
      sequence.dataset.motion = "true";
      header.dataset.heroDock = "true";

      // Both house assets share the same canvas. Match the photo's centred cover crop.
      const houseScale = () => Math.max(photo.offsetWidth / house.offsetWidth, photo.offsetHeight / house.offsetHeight);
      const houseOffset = (axis: "x" | "y") => axis === "x"
        ? (frame.clientWidth - house.offsetWidth) / 2 - house.offsetLeft
        : (frame.clientHeight - house.offsetHeight) / 2 - house.offsetTop;

      const revealText = ".reveal-kicker, .reveal-line, .reveal-description";
      const revealActions = ".reveal-link, .reveal-signature";
      gsap.set(".cloud-wisp, .cloud-veil", { opacity: 0 });
      gsap.set(".reveal-content", { autoAlpha: 0 });
      gsap.set(revealText, { y: 26, opacity: 0 });
      gsap.set(revealActions, { y: 12, autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sequence,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      })
        .to(".sky-wordmark", { yPercent: -36, duration: 0.43, ease: "sine.inOut" }, 0)
        .to(".wordmark-mist", { yPercent: -17, xPercent: 5, duration: 0.78, ease: "sine.inOut" }, 0.05)
        .addLabel("clouds", 0.24)
        .to(".cloud-veil", { opacity: 0.86, duration: 0.38, ease: "sine.inOut" }, "clouds+=0.15")
        .to(house, { "--cutout-feather": "30%", duration: 0.39, ease: "sine.inOut" }, "clouds+=0.2")
        .to(".cloud-veil", { yPercent: 10, scale: 1.12, duration: 1.12, ease: "sine.inOut" }, "clouds+=0.15")
        .to(".cloud-back", { xPercent: -15, yPercent: -11, autoAlpha: 0, duration: 0.59, ease: "sine.inOut" }, "clouds")
        .to(".cloud-middle", { xPercent: 28, yPercent: 8, autoAlpha: 0, duration: 0.62, ease: "sine.inOut" }, "clouds+=0.04")
        .to(".cloud-extension", { yPercent: 8, scale: 1.04, autoAlpha: 0, duration: 0.62, ease: "sine.inOut" }, "clouds+=0.14")
        .to(".cloud-left", { xPercent: -32, yPercent: 11, scale: 1.06, autoAlpha: 0, duration: 0.66, ease: "sine.inOut" }, "clouds+=0.06")
        .to(".cloud-right", { xPercent: 32, yPercent: 13, scale: 1.08, autoAlpha: 0, duration: 0.65, ease: "sine.inOut" }, "clouds+=0.07")
        .to(".cloud-wisp-left", { xPercent: -23, yPercent: 16, scale: 1.16, duration: 1.18, ease: "sine.inOut" }, "clouds+=0.25")
        .to(".cloud-wisp-right", { xPercent: 23, yPercent: 19, scale: 1.19, duration: 1.09, ease: "sine.inOut" }, "clouds+=0.32")
        .to(".cloud-wisp-left", { opacity: 0.39, duration: 0.4, ease: "sine.inOut" }, "clouds+=0.25")
        .to(".cloud-wisp-right", { opacity: 0.32, duration: 0.38, ease: "sine.inOut" }, "clouds+=0.32")
        .to(".cloud-wisp-centre", { yPercent: 12, scale: 1.22, duration: 1.08, ease: "sine.inOut" }, "clouds+=0.36")
        .to(".cloud-wisp-centre", { opacity: 0.37, duration: 0.36, ease: "sine.inOut" }, "clouds+=0.36")
        .addLabel("dock", 0.89)
        .to(header, { paddingBlock: "8px", backgroundColor: "#092f43f5", duration: 0.31, ease: "sine.inOut" }, "dock")
        .addLabel("house", "dock+=0.16")
        .to(house, {
          x: () => houseOffset("x"), y: () => houseOffset("y"), scale: houseScale,
          duration: 0.64, ease: "sine.inOut",
        }, "house")
        // Move the background photo in registration with the cutout during the dissolve.
        .fromTo(".reveal-photo-frame", {
          x: () => -houseOffset("x"), y: () => -houseOffset("y"), scale: () => 1 / houseScale(), "--photo-edge": "16%",
        }, {
          x: 0, y: 0, scale: 1, "--photo-edge": "0%", duration: 0.64, ease: "sine.inOut", immediateRender: false,
        }, "house")
        .to(".sky-gradient, .sky-wordmark, .wordmark-mist", { opacity: 0, duration: 0.56, ease: "sine.inOut" }, "house")
        .to(".cloud-veil", { opacity: 0, duration: 0.38, ease: "sine.inOut" }, "house+=0.25")
        .to(".cloud-wisp", { opacity: 0, duration: 0.49, stagger: 0.035, ease: "sine.inOut" }, "house+=0.1")
        .to(house, { autoAlpha: 0, duration: 0.24, ease: "sine.inOut" }, "house+=0.47")
        .to(".reveal-content", { autoAlpha: 1, duration: 0.19, ease: "sine.out" }, "house+=0.54")
        .to(revealText, {
          y: 0, opacity: 1, duration: 0.23, stagger: 0.04, ease: "sine.out",
        }, "house+=0.57")
        .to(revealActions, {
          y: 0, autoAlpha: 1, duration: 0.19, ease: "sine.out",
        }, "house+=0.72")
        .to({}, { duration: 0.16 }, "house+=0.95");

      return () => {
        delete sequence.dataset.motion;
        delete header.dataset.heroDock;
      };
    }, scene);
    return () => motion.revert();
  }, []);

  return (
    <div ref={scene} className="hero-sequence">
      <div ref={stage} className="hero-stage">
        <section className="sky relative isolate overflow-hidden" aria-labelledby="avora-title">
          <div className="sky-gradient" aria-hidden="true" />
          <div className="cloud cloud-back" aria-hidden="true"><Asset name="avora-cloud-distant.webp" eager priority /></div>
          <div className="wordmark-mist" aria-hidden="true" />
          <h1 id="avora-title" className="sky-wordmark wordmark"><span aria-hidden="true">avora</span><span className="sr-only">AVORA Residences</span></h1>
          <div className="cloud cloud-middle" aria-hidden="true"><Asset name="avora-cloud-distant.webp" eager priority /></div>
          <img ref={cutout} src={`${assetRoot}/modern-villa-at-golden-hour-background-removed1.png`}
            className="hero-cutout" alt="" fetchPriority="high" decoding="async" />
          <div className="cloud-extension" aria-hidden="true" />
          <div className="cloud cloud-front cloud-left" aria-hidden="true"><Asset name="avora-cloud-foreground.webp" eager priority /></div>
          <div className="cloud cloud-front cloud-right" aria-hidden="true"><Asset name="avora-cloud-foreground.webp" eager priority /></div>
          <div className="cloud-veil" aria-hidden="true" />
          <div className="cloud-wisp cloud-wisp-left" aria-hidden="true" />
          <div className="cloud-wisp cloud-wisp-right" aria-hidden="true" />
          <div className="cloud-wisp cloud-wisp-centre" aria-hidden="true" />
        </section>
        <section className="architectural-reveal relative isolate overflow-hidden" aria-labelledby="hero-heading">
          <div className="reveal-photo-frame">
            <Asset name="modern-villa-at-golden-hour1.png" alt="A modern villa set in a garden at golden hour" className="reveal-photo cover-image" eager />
          </div>
          <div className="reveal-content shell">
            <p className="reveal-kicker">BUILT WITH INTENTION</p>
            <h2 id="hero-heading"><span className="reveal-line">Come Home</span><span className="reveal-line">to <em>your nature</em></span></h2>
            <p className="reveal-description">Thoughtful homes shaped by light, landscape, and the life within.</p>
            <a href="#approach" className="pill reveal-link">Our approach <Asset name="vector.svg" className="turn-right" /></a>
            <span className="wordmark reveal-signature" aria-hidden="true">avora</span>
          </div>
        </section>
      </div>
    </div>
  );
}
