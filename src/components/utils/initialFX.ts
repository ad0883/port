import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Simple text splitting implementation
  function splitText(selector: string, wrapperClass: string) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      const text = el.textContent || "";
      el.textContent = ""; // Clear the original content
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Handle spaces
        span.className = wrapperClass;
        el.appendChild(span);
      });
    });
  }

  splitText(".landing-info h3, .landing-intro h2, .landing-intro h1", "split-char");
  splitText(".landing-h2-info", "split-char");

  gsap.fromTo(
    ".split-char",
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  splitText(".landing-h2-info-1", "split-char");
  splitText(".landing-h2-1", "split-char");
  splitText(".landing-h2-2", "split-char");

  const landingText2 = document.querySelectorAll(".landing-h2-info .split-char");
  const landingText3 = document.querySelectorAll(".landing-h2-info-1 .split-char");
  const landingText4 = document.querySelectorAll(".landing-h2-1 .split-char");
  const landingText5 = document.querySelectorAll(".landing-h2-2 .split-char");

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: NodeListOf<Element>, Text2: NodeListOf<Element>) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}