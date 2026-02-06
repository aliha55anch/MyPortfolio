//Section 1

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  
  // Fade out preloader
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 500); // 1 second delay for aesthetic
});



// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Scroll Reveal Logic (For Education & Skills) ---
  const observerOptions = {
    threshold: 0.15, // Triggers when 15% of the section is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, no need to observe anymore
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  // Apply to sections (Education & Skills)
  // Ensure you add the class "reveal" to these sections in your HTML
  const sectionsToAnimate = document.querySelectorAll('#education, #skills, .skill-card');
  sectionsToAnimate.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
  });

  // --- 2. Mobile Menu Auto-Close ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.checked = false;
    });
  });

  // --- 3. Header Background Change on Scroll ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(10, 10, 10, 0.95)";
      header.style.padding = "10px 0";
    } else {
      header.style.background = "rgba(15, 15, 15, 0.8)";
      header.style.padding = "15px 0";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay for each card to create a staggered effect
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); 
                
                // Stop observing once the animation is done
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply to Expertise section header and individual cards
    const elementsToReveal = document.querySelectorAll('.expertise .section-title, .expertise .section-subtitle, .service-card');
    
    elementsToReveal.forEach(el => {
        el.classList.add('reveal'); // Ensure the base class is present
        revealObserver.observe(el);
    });
});


document.addEventListener("DOMContentLoaded", () => {
  // Apply reveal class to all service cards
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, index) => {
    card.classList.add('reveal');
    // Staggered delay effect
    card.style.transitionDelay = `${index * 0.1}s`; 
    observer.observe(card);
  });
});

//My Skills Section


document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.querySelectorAll('.skill-card');

    const skillObserverOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add the 'reveal' class if not already there, then 'active'
                entry.target.classList.add('reveal');
                
                // Staggered effect: multiply index by 100ms
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);

                // Stop observing once animated
                skillObserver.unobserve(entry.target);
            }
        });
    }, skillObserverOptions);

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });
});


//Education Section
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const bentoCards = document.querySelectorAll('.bento-card');

    const bentoObserverOptions = {
        threshold: 0.1, // Trigger early so user sees the rise effect
        rootMargin: "0px 0px -50px 0px"
    };

    const bentoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the reveal class if you haven't added it to HTML
                entry.target.classList.add('reveal');
                
                // Trigger the active state
                entry.target.classList.add('active');
                
                // Optional: Unobserve after animation plays once
                bentoObserver.unobserve(entry.target);
            }
        });
    }, bentoObserverOptions);

    bentoCards.forEach(card => {
        bentoObserver.observe(card);
    });
});
//projects

document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Switch active class
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.getAttribute("data-target");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (target === "all" || category === target) {
          card.style.display = "block";
          // Add a small fade animation
          card.style.animation = "fadeIn 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // --- 1. Filter Logic ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Change active button style
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Show all or match category
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // --- 2. Scroll Animation (Intersection Observer) ---
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered appearance
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                // Optional: stop observing once seen
                // projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.classList.add('reveal'); // Ensure base state is applied
        projectObserver.observe(card);
    });
});

// Achievement 

document.addEventListener("DOMContentLoaded", () => {
  const certCards = document.querySelectorAll(".cert-card");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Staggered delay: 0ms for first, 200ms for second
        setTimeout(() => {
          entry.target.classList.add("reveal");
        }, index * 200);
        
        // Stop watching once it has appeared
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Trigger when 15% of the card is visible
  });

  certCards.forEach(card => revealObserver.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
    const certCards = document.querySelectorAll('.cert-card');

    const certObserverOptions = {
        threshold: 0.1, // Trigger as soon as the top of the card enters
        rootMargin: "0px 0px -50px 0px"
    };

    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered reveal for a high-end feel
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 150);
                
                // Stop observing once it has appeared
                certObserver.unobserve(entry.target);
            }
        });
    }, certObserverOptions);

    certCards.forEach(card => {
        certObserver.observe(card);
    });
});

//contact 

document.addEventListener("DOMContentLoaded", () => {
    const contactMsg = document.querySelector(".contact-message");
    const infoItems = document.querySelectorAll(".info-item");

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Animate main message
                if (entry.target.classList.contains('contact-message')) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateX(0)";
                } 
                // Animate info cards with delay
                else if (entry.target.classList.contains('info-item')) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateX(0)";
                }
            }
        });
    }, { threshold: 0.15 });

    // Initial Hidden States
    if (contactMsg) {
        contactMsg.style.opacity = "0";
        contactMsg.style.transform = "translateX(-50px)";
        contactMsg.style.transition = "all 0.8s ease-out";
        contactObserver.observe(contactMsg);
    }

    infoItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(50px)";
        item.style.transition = `all 0.5s ease-out ${index * 0.15}s`;
        contactObserver.observe(item);
    });
});


// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
function newFunction() {
    const observerOptionsEdu = {
        threshold: 0.2
    };

    const eduObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0)";
            }
        });
    }, observerOptionsEdu);

    document.querySelectorAll('.edu-card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateX(-50px)";
        card.style.transition = "all 0.6s ease-out";
        eduObserver.observe(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const contactItems = document.querySelectorAll('.contact-message, .info-item');

  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Adds a staggered delay for the info cards
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 150);
        
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  contactItems.forEach(item => {
    contactObserver.observe(item);
  });
});
