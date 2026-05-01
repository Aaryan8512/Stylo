/* =========================
   STYLO - script.js
   Premium Frontend Interactions
   ========================= */

/* ==================================================
   UPDATED script.js
   Adds About button functionality + auto create section
   Replace your current JS with this
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  createAboutSection();   // creates last section if not present
  initNavbarShadow();
  initSmoothScroll();
  initScrollReveal();
  initTypingEffect();
  initGeneratorButton();
  initUploadPreview();
  initTrendCards();
});

/* =========================
   CREATE ABOUT SECTION
   ========================= */
function createAboutSection() {
  const footer = document.querySelector(".footer");

  if (!footer) return;

  const old = document.querySelector("#about");
  if (old) return;

  const section = document.createElement("section");
  section.id = "about";
  section.className = "panel";

  section.innerHTML = `
    <h2>About STYLO</h2>
    <p style="line-height:1.8;color:#d1d5db;font-size:16px;">
      STYLO is an AI-powered fashion platform built for the next generation.
      Upload your image, describe your desired vibe, and let AI generate a styled avatar based on your look.
      We also help you discover matching fashion products from platforms like Amazon, Myntra, Flipkart and Ajio.
      <br><br>
      Our mission is simple:
      make personal styling faster, smarter and more stylish.
    </p>
  `;

  footer.before(section);
}

/* =========================
   Sticky Navbar Shadow
   ========================= */
function initNavbarShadow() {
  const nav = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
      nav.style.background = "rgba(0,0,0,0.75)";
    } else {
      nav.style.boxShadow = "none";
      nav.style.background = "rgba(0,0,0,0.45)";
    }
  });
}

/* =========================
   Smooth Scroll Nav Links
   ========================= */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

/* =========================
   Reveal On Scroll
   ========================= */
function initScrollReveal() {
  const items = document.querySelectorAll(".panel, .card, .hero-text, .hero-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "all 0.8s ease";
    observer.observe(item);
  });
}

/* =========================
   Hero Typing Effect
   ========================= */
function initTypingEffect() {
  const heading = document.querySelector(".hero-text h1");
  if (!heading) return;

  const text = "Redefine Your Style with STYLO";
  heading.textContent = "";

  let i = 0;

  const timer = setInterval(() => {
    heading.textContent += text.charAt(i);
    i++;

    if (i >= text.length) clearInterval(timer);
  }, 45);
}

/* =========================
   Generate Look Button
   ========================= */
function initGeneratorButton() {
  const btn = document.querySelector(".panel .gold");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const oldText = btn.innerText;

    btn.innerText = "Generating...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    setTimeout(() => {
      btn.innerText = "Look Ready ✓";
      btn.style.opacity = "1";

      setTimeout(() => {
        btn.innerText = oldText;
        btn.disabled = false;
      }, 1800);

    }, 2500);
  });
}

/* =========================
   Image Upload Preview
   ========================= */
function initUploadPreview() {
  const fileInput = document.querySelector('input[type="file"]');
  const heroCard = document.querySelector(".hero-card");

  if (!fileInput || !heroCard) return;

  fileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
      heroCard.style.background = `
        linear-gradient(rgba(255,255,255,.04),rgba(255,255,255,.02)),
        url('${event.target.result}') center/cover
      `;
    };

    reader.readAsDataURL(file);
  });
}

/* =========================
   Product Card Hover Glow
   ========================= */
function initTrendCards() {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 20px 40px rgba(56,189,248,0.18)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 20px 40px rgba(0,0,0,.45)";
    });
  });
}

/* ==================================================
   ANIME PARALLAX EFFECT ADD-ON
   Paste at VERY BOTTOM of script.js
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initAnimeParallax();
});

/* =========================
   Anime Parallax Motion
   ========================= */
function initAnimeParallax() {
  const hero = document.querySelector(".hero");
  const heroText = document.querySelector(".hero-text");
  const heroCard = document.querySelector(".hero-card");
  const navbar = document.querySelector(".navbar");

  if (!hero || !heroText || !heroCard) return;

  /* Mouse movement parallax */
  hero.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 35;
    const y = (window.innerHeight / 2 - e.clientY) / 35;

    heroText.style.transform =
      `translate(${x}px, ${y}px)`;

    heroCard.style.transform =
      `translate(${-x}px, ${-y}px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });

  /* Reset smoothly */
  hero.addEventListener("mouseleave", () => {
    heroText.style.transform = "translate(0,0)";
    heroCard.style.transform = "translate(0,0) rotateY(0deg) rotateX(0deg)";
  });

  /* Scroll parallax */
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    hero.style.backgroundPositionY = `${scrollY * 0.4}px`;

    heroCard.style.transform += ` translateY(${scrollY * 0.03}px)`;

    if (navbar) {
      navbar.style.backdropFilter = `blur(${10 + scrollY * 0.02}px)`;
    }
  });

  /* Floating animation pulse */
  setInterval(() => {
    heroCard.animate(
      [
        { transform: "translateY(0px)" },
        { transform: "translateY(-8px)" },
        { transform: "translateY(0px)" }
      ],
      {
        duration: 2600,
        easing: "ease-in-out"
      }
    );
  }, 2600);
}


/* ==================================================
   ANIME INTRO VFX (Thunder Entrance Screen)
   Paste at VERY BOTTOM of script.js
   Full screen intro then website appears
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initAnimeIntroVFX();
});

/* =========================
   Intro Screen
   ========================= */
function initAnimeIntroVFX() {

  /* Hide website scroll during intro */
  document.body.style.overflow = "hidden";

  /* Create intro overlay */
  const intro = document.createElement("div");
  intro.id = "animeIntro";

  intro.innerHTML = `
    <div class="storm-bg"></div>
    <div class="lightning"></div>
    <div class="intro-logo">STYLO</div>
    <div class="intro-text">Awakening Style Energy...</div>
  `;

  document.body.appendChild(intro);

  /* Add styles dynamically */
  const style = document.createElement("style");
  style.innerHTML = `
    #animeIntro{
      position:fixed;
      inset:0;
      z-index:99999;
      background:#02030a;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      overflow:hidden;
    }

    .storm-bg{
      position:absolute;
      inset:0;
      background:
        radial-gradient(circle at 20% 30%, rgba(56,189,248,.12), transparent 20%),
        radial-gradient(circle at 80% 20%, rgba(139,92,246,.10), transparent 20%),
        linear-gradient(180deg,#000,#070b18,#000);
      animation:stormMove 4s linear infinite;
    }

    @keyframes stormMove{
      0%{transform:scale(1);}
      50%{transform:scale(1.08);}
      100%{transform:scale(1);}
    }

    .lightning{
      position:absolute;
      width:6px;
      height:100vh;
      background:white;
      box-shadow:
        0 0 12px white,
        0 0 30px #38bdf8,
        0 0 60px #ffffff;
      transform:skewX(-18deg);
      top:-100%;
      left:55%;
      opacity:0;
      animation:thunderStrike 1.2s ease-out 2;
    }

    @keyframes thunderStrike{
      0%{
        top:-100%;
        opacity:0;
      }
      20%{
        top:0;
        opacity:1;
      }
      30%{
        opacity:.2;
      }
      40%{
        opacity:1;
      }
      100%{
        top:100%;
        opacity:0;
      }
    }

    .intro-logo{
      position:relative;
      z-index:2;
      font-size:72px;
      font-weight:900;
      letter-spacing:5px;
      background:linear-gradient(90deg,#fff,#38bdf8,#8b5cf6,#ff0055);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      text-shadow:
        0 0 12px rgba(56,189,248,.18),
        0 0 30px rgba(139,92,246,.18);
      animation:logoPop 1.4s ease;
    }

    .intro-text{
      position:relative;
      z-index:2;
      margin-top:14px;
      color:#d1d5db;
      font-size:18px;
      letter-spacing:1px;
      animation:fadeText 2s ease infinite alternate;
    }

    @keyframes logoPop{
      0%{
        transform:scale(.4);
        opacity:0;
      }
      100%{
        transform:scale(1);
        opacity:1;
      }
    }

    @keyframes fadeText{
      from{opacity:.4;}
      to{opacity:1;}
    }

    .screen-flash{
      position:absolute;
      inset:0;
      background:white;
      opacity:0;
      animation:flashBang .25s ease 2;
    }

    @keyframes flashBang{
      0%{opacity:0;}
      50%{opacity:.9;}
      100%{opacity:0;}
    }

    @media(max-width:600px){
      .intro-logo{
        font-size:46px;
      }

      .intro-text{
        font-size:14px;
      }
    }
  `;
  document.head.appendChild(style);

  /* Add white flash with thunder */
  const flash = document.createElement("div");
  flash.className = "screen-flash";
  intro.appendChild(flash);

  /* Remove intro after animation */
  setTimeout(() => {
    intro.style.transition = "all .8s ease";
    intro.style.opacity = "0";
    intro.style.transform = "scale(1.05)";

    setTimeout(() => {
      intro.remove();
      document.body.style.overflow = "auto";
    }, 800);

  }, 3200);
}