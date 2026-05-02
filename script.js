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

  // ===== Animated stat counters =====
  const statNums = document.querySelectorAll(".stat-num[data-target]");

  const animateCounter = (el) => {
    const target = Number(el.dataset.target);
    const duration = 1800;
    const startTime = performance.now();

    const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.round(target * easeOutCubic(progress));

      el.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  statNums.forEach((el) => {
    counterObserver.observe(el);
  });

  // ===== Animated skill bars =====
  const skillProgressCards = document.querySelectorAll(".skill-progress-card[data-level]");

  const animateSkillBar = (card) => {
    const fill = card.querySelector(".skill-progress-fill");
    const value = card.querySelector(".skill-progress-value");
    const target = Number(card.dataset.level);
    const duration = 1800;
    const startTime = performance.now();

    const easeOutQuart = (progress) => 1 - Math.pow(1 - progress, 4);

    const updateBar = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(target * easedProgress);

      fill.style.width = `${target}%`;
      value.textContent = `${currentValue}%`;

      if (progress < 1) {
        requestAnimationFrame(updateBar);
      } else {
        value.textContent = `${target}%`;
      }
    };

    requestAnimationFrame(updateBar);
  };

  const skillBarsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateSkillBar(entry.target);
        skillBarsObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  skillProgressCards.forEach((card) => {
    const fill = card.querySelector(".skill-progress-fill");
    const value = card.querySelector(".skill-progress-value");

    if (fill) {
      fill.style.width = "0%";
    }

    if (value) {
      value.textContent = "0%";
    }

    skillBarsObserver.observe(card);
  });

});
