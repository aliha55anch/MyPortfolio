document.addEventListener("DOMContentLoaded", () => {

  // ===== Preloader =====
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => { preloader.style.display = "none"; }, 500);
    }, 500);
  });

  // ===== Scroll Reveal =====
  // All elements with class "reveal" animate in when they enter the viewport.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger each element slightly for a cascading effect
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // ===== Header shrink on scroll =====
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(10, 10, 10, 0.97)";
    } else {
      header.style.background = "rgba(15, 15, 15, 0.8)";
    }
  });

  // ===== Mobile menu: close when a link is clicked =====
  const menuToggle = document.getElementById("menu-toggle");
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.checked = false;
    });
  });

  // ===== Project filter =====
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const selected = this.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const matches = selected === "all" || category === selected;

        if (matches) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => { card.style.display = "none"; }, 300);
        }
      });
    });
  });

  // ===== Smooth scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

});
