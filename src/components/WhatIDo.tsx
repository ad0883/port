import { useEffect, useRef, useCallback } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Reusable Component for Skill Section
const SkillSection = ({
  title,
  subtitle,
  description,
  skills,
  index,
  setRef,
}: {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  index: number;
  setRef: (el: HTMLDivElement | null, index: number) => void;
}) => {
  return (
    <div
      className="what-content what-noTouch"
      ref={(el) => setRef(el, index)}
      role="button"
      aria-label={`${title} Section`}
    >
      <div className="what-border1">
        <svg height="100%">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="6,6"
          />
          <line
            x1="0"
            y1="100%"
            x2="100%"
            y2="100%"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="6,6"
          />
        </svg>
      </div>
      <div className="what-corner"></div>
      <div className="what-content-in">
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
        <p>{description}</p>
        <h5>Skillset & tools</h5>
        <div className="what-content-flex">
          {skills.map((skill, i) => (
            <div key={i} className="what-tags">
              {skill}
            </div>
          ))}
        </div>
        <div className="what-arrow"></div>
      </div>
    </div>
  );
};

// Main Component
const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  const handleClick = useCallback((container: HTMLDivElement) => {
    container.classList.toggle("what-content-active");
    container.classList.remove("what-sibling");
    if (container.parentElement) {
      const siblings = Array.from(container.parentElement.children);
      siblings.forEach((sibling) => {
        if (sibling !== container) {
          sibling.classList.remove("what-content-active");
          sibling.classList.toggle("what-sibling");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () =>
            handleClick(container)
          );
        }
      });
    };
  }, [handleClick]);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <SkillSection
            title="DEVELOP"
            subtitle="Skills"
            description="These are the advanced development skills that I possess."
            skills={[
              "JavaScript",
              "TypeScript",
              "MongoDB",
              "React",
              "CSS",
              "Node.js",
              "HTML",
              "MySQL",
              "Python",
            ]}
            index={0}
            setRef={setRef}
          />
          <SkillSection
            title="DESIGN"
            subtitle="Skills"
            description="These are the designing and editing skills that I possess."
            skills={[
              "Blender",
              "Zbrush",
              "UI Design",
              "Motion",
              "Rigging",
              "3D Animation",
              "Character Design",
              "Modeling",
            ]}
            index={1}
            setRef={setRef}
          />
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;