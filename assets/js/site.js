gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  gsap.from("[data-hero-kicker], [data-hero-title], [data-hero-copy], [data-hero-cta]", {
    y: 26,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.12
  });

  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.95,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 84%"
      }
    });
  });

  gsap.utils.toArray("[data-stagger-group]").forEach((group) => {
    gsap.from(group.children, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: { trigger: group, start: "top 82%" }
    });
  });
}

document.querySelectorAll("[data-counter]").forEach((counter) => {
  const target = Number(counter.dataset.counter || 0);
  const data = { value: 0 };
  gsap.to(data, {
    value: target,
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: { trigger: counter, start: "top 86%" },
    onUpdate: () => {
      counter.textContent = `${Math.floor(data.value)}`;
    }
  });
});

const wizard = document.querySelector("[data-inquiry-wizard]");
if (wizard) {
  const steps = [...wizard.querySelectorAll(".wizard-step")];
  const progress = wizard.querySelector("[data-progress]");
  const nextBtns = wizard.querySelectorAll("[data-next]");
  const prevBtns = wizard.querySelectorAll("[data-prev]");
  const success = wizard.querySelector("[data-success]");
  let stepIndex = 0;

  const renderStep = () => {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === stepIndex));
    progress.style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
  };
  renderStep();

  nextBtns.forEach((btn) => btn.addEventListener("click", () => {
    if (stepIndex < steps.length - 1) {
      stepIndex += 1;
      renderStep();
    } else if (success) {
      success.hidden = false;
      wizard.querySelector("form").hidden = true;
    }
  }));
  prevBtns.forEach((btn) => btn.addEventListener("click", () => {
    stepIndex = Math.max(0, stepIndex - 1);
    renderStep();
  }));
}
