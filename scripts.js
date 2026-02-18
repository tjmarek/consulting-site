// scripts.js

console.log("Consulting site loaded");

// Simple count-up animation for stats on the homepage
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("[data-countup]");
  const speed = 800; // total duration in ms

  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute("data-countup") || "0");
    const isPercent = counter.getAttribute("data-suffix") === "%";
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

    // Use IntersectionObserver so it only animates when visible
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
});
