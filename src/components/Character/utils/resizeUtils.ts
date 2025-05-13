import * as THREE from "three";
import { gsap } from "gsap";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) {
    console.warn("CanvasDiv reference is missing. Skipping resize handling.");
    return;
  }

  // Update renderer and camera dimensions based on canvas size
  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width;
  const height = canvas3d.height;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Kill all ScrollTriggers to reset animations, but retain specific triggers if necessary
  // Removed unused 'workTrigger' declaration
  gsap.globalTimeline.clear(); // Clear any GSAP timelines if applicable

  // Reinitialize timelines for character and other animations
  if (character && camera) {
    setCharTimeline(character, camera);
  } else {
    console.warn("Character or camera is missing.");
  }

  setAllTimeline();
}