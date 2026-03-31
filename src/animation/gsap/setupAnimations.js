import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupPageAnimations(root) {
  const mm = gsap.matchMedia();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const q = gsap.utils.selector(root);
  gsap.from(q(".hero-kicker, .hero-title, .hero-copy-p, .hero-actions > *"), {
    y: 26,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    stagger: 0.12
  });

  mm.add("(min-width: 768px)", () => {
    gsap.utils.toArray(q(".reveal")).forEach((el) => {
      gsap.from(el, {
        y: 42,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 82%" }
      });
    });

    gsap.utils.toArray(q(".stagger-group")).forEach((group) => {
      gsap.from(group.children, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: group, start: "top 84%" }
      });
    });
  });

  gsap.utils.toArray(q("[data-counter]")).forEach((node) => {
    const target = Number(node.getAttribute("data-counter") || 0);
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: node, start: "top 85%" },
      onUpdate: () => {
        node.textContent = Math.floor(obj.value);
      }
    });
  });

  gsap.to(q(".cta-pulse"), {
    letterSpacing: "0.27em",
    repeat: -1,
    yoyo: true,
    duration: 1.6,
    ease: "sine.inOut"
  });

  return () => {
    mm.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
