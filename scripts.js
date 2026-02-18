// scripts.js

console.log("Consulting site loaded");

document.addEventListener("DOMContentLoaded", () => {
  // Simple count-up animation for stats on the homepage
  const counters = document.querySelectorAll("[data-countup]");
  const speed = 800; // total duration in ms

  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute("data-countup") || "0");
    const suffix = counter.getAttribute("data-suffix") || "";
    const decimals = counter.getAttribute("data-decimals")
      ? parseInt(counter.getAttribute("data-decimals"), 10)
      : 0;

    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / speed, 1);
      const value = target * progress;
      counter.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.requestAnimationFrame(step);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(counter);
  });

  // Mobile nav toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMobile.style.display === "flex";
      if (isOpen) {
        navMobile.style.display = "none";
        navToggle.classList.remove("is-open");
      } else {
        navMobile.style.display = "flex";
        navToggle.classList.add("is-open");
      }
    });
  }

  // Scroll reveal for premium-feel sections
  const revealElements = document.querySelectorAll(
    ".hero, .section, .stat-card, .card, .inline-strip, .two-column"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
});
