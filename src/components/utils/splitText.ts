import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  lines?: HTMLElement[];
  words?: HTMLElement[];
  chars?: HTMLElement[];
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 70%" : "30% 70%";
  const ToggleAction = "play none none none";

  const splitText = (element: ParaElement, type: "lines" | "words" | "chars") => {
    const splitResult: { lines?: HTMLElement[]; words?: HTMLElement[]; chars?: HTMLElement[] } = {};
    const content = element.textContent || "";
    element.innerHTML = ""; // Clear original content

    if (type === "lines" || type === "words" || type === "chars") {
      const lines = content.split("\n").map((line) => line.trim());
      const lineElements: HTMLElement[] = [];

      lines.forEach((line) => {
        const lineWrapper = document.createElement("div");
        lineWrapper.classList.add("split-line");
        lineWrapper.style.display = "block";

        if (type === "words" || type === "chars") {
          const words = line.split(" ");
          const wordElements: HTMLElement[] = [];

          words.forEach((word) => {
            const wordWrapper = document.createElement("span");
            wordWrapper.style.display = "inline-block";

            if (type === "chars") {
              const chars = word.split("").map((char) => {
                const charSpan = document.createElement("span");
                charSpan.textContent = char;
                charSpan.style.display = "inline-block";
                charSpan.style.transform = "translateY(0)"; // Align characters properly
                return charSpan;
              });
              wordWrapper.append(...chars);
              splitResult.chars = splitResult.chars || [];
              splitResult.chars.push(...chars);
            } else {
              wordWrapper.textContent = word;
            }

            wordElements.push(wordWrapper);
            splitResult.words = splitResult.words || [];
            splitResult.words.push(wordWrapper);
          });

          lineWrapper.append(...wordElements);
        } else {
          lineWrapper.textContent = line;
        }

        lineElements.push(lineWrapper);
        splitResult.lines = splitResult.lines || [];
        splitResult.lines.push(lineWrapper);
      });

      element.append(...lineElements);
    }

    return splitResult;
  };

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
    }
    const { words } = splitText(para, "words");
    para.words = words;

    para.anim = gsap.fromTo(
      words || [],
      { autoAlpha: 0, y: 100 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1.2,
        ease: "power2.out", // Smooth easing for better animation
        y: 0,
        stagger: 0.03, // Slightly increased stagger for smoother flow
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
    }
    const { chars } = splitText(title, "chars");
    title.chars = chars;

    title.anim = gsap.fromTo(
      chars || [],
      { autoAlpha: 0, y: 120, rotate: 15 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power2.inOut", // Smooth easing for characters
        y: 0,
        rotate: 0,
        stagger: 0.02, // Slightly faster stagger for characters
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}