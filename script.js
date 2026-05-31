document.addEventListener("DOMContentLoaded", () => {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");
  const interactables = document.querySelectorAll(
    "a, button, .project-card, .gallery-item, .contact-form input, .contact-form textarea",
  );

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Animate dot instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" },
    );
  });

  interactables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      cursorOutline.classList.remove("cursor-hover");
    });
  });

  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#9D4EDD", "#C77DFF", "#7B2FBE"] },
        shape: { type: "circle" },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#9D4EDD",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "window",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    });
  }

  const navbar = document.getElementById("navbar");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("toggle");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("toggle");
    });
  });

  const textStrs = [
    "Étudiant Ingénieur Informatique",
    "Développeur Web",
    "Graphic Designer",
  ];
  let typeIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpan = document.querySelector(".typing-text");
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const delayBetweenWord = 2000;

  function typeEffect() {
    const currentStr = textStrs[typeIndex];

    if (isDeleting) {
      typingSpan.textContent = currentStr.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingSpan.textContent = currentStr.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentStr.length) {
      speed = delayBetweenWord;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      typeIndex = (typeIndex + 1) % textStrs.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  // Start typing effect
  if (typingSpan) setTimeout(typeEffect, 1000);

  const animateStat = (el) => {
    const target = +el.getAttribute("data-target");
    let current = 0;
    const increment = target / 30;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        el.innerText = Math.ceil(current);
        setTimeout(updateCount, 40);
      } else {
        el.innerText = target;
      }
    };
    updateCount();
  };

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        if (entry.target.classList.contains("skill-card")) {
          const bars = entry.target.querySelectorAll(".progress");
          bars.forEach((bar) => {
            bar.style.width = bar.getAttribute("data-width");
          });
        }

        if (
          entry.target.id === "about" ||
          entry.target.classList.contains("about-text")
        ) {
          const statNumbers = document.querySelectorAll(".stat-number");
          statNumbers.forEach((stat) => {
            if (!stat.classList.contains("counted")) {
              animateStat(stat);
              stat.classList.add("counted");
            }
          });
        }
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".reveal, .timeline-item")
    .forEach((el) => observer.observe(el));

  const timelineSection = document.getElementById("timeline");
  const timelineProgress = document.getElementById("timeline-progress");

  window.addEventListener("scroll", () => {
    if (timelineSection && timelineProgress) {
      const rect = timelineSection.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrolled = window.innerHeight - rect.top;
        const percent = Math.min(
          Math.max((scrolled / rect.height) * 100, 0),
          100,
        );
        timelineProgress.style.height = `${percent}%`;
      }
    }
  });

  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href").includes(current)) {
        a.classList.add("active");
      }
    });
  });

  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.classList.add("show");
        } else {
          item.classList.remove("show");
        }
      });
    });
  });

  const copyBtn = document.getElementById("copy-btn");
  const emailText = document.getElementById("email-text");

  if (copyBtn && emailText) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard
        .writeText(emailText.textContent)
        .then(() => {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
          copyBtn.style.background = "var(--accent-color)";
          copyBtn.style.color = "#fff";

          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = "";
            copyBtn.style.color = "";
          }, 2000);
        })
        .catch((err) => {
          console.error("Erreur lors de la copie", err);
        });
    });
  }

  const contactForm = document.getElementById("contact-form");
  const formMsg = document.getElementById("form-msg");

  emailjs.init("8j5HngbcIBzkb3b_B");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const btnSubmit = document.querySelector(".btn-submit");
      const originalText = btnSubmit.innerHTML;

      btnSubmit.innerHTML =
        'Envoi... <i class="fa-solid fa-spinner fa-spin"></i>';

      const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      emailjs
        .send("service_wc5stkk", "template_0ts7t6h", params)
        .then(() => {
          contactForm.reset();
          btnSubmit.innerHTML = originalText;

          formMsg.textContent = "Message envoyé avec succès ! ";
          formMsg.style.display = "block";
        })
        .catch((error) => {
          btnSubmit.innerHTML = originalText;

          formMsg.textContent = "Erreur lors de l'envoi ";
          formMsg.style.display = "block";
          console.error(error);
        });

      setTimeout(() => {
        formMsg.style.display = "none";
      }, 4000);
    });
  }
});
