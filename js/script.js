// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Demo Tabs
const demoButtons = document.querySelectorAll(".demo-tab");
const tabContents = document.querySelectorAll(".tab-content");

demoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and contents
    demoButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    // Show corresponding content
    const tabId = button.dataset.tab;
    document.getElementById(`${tabId}-tab`).classList.add("active");
  });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector("i");

    // Toggle active class
    answer.classList.toggle("active");

    // Rotate icon
    icon.style.transform = answer.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  });
});

// Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Show success message
  alert(
    `Thank you ${name}! We've received your message and will contact you at ${email} soon.`
  );

  // Reset form
  contactForm.reset();
});

// Scroll to Top
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// iFrame Functions
function refreshIframe() {
  const iframe = document.querySelector(".iframe-container iframe");
  iframe.src = iframe.src;
}

function toggleFullscreen() {
  const iframeContainer = document.querySelector(".iframe-container");
  if (!document.fullscreenElement) {
    iframeContainer.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

function openInNewTab() {
  window.open("https://www.example.com", "_blank");
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight - 20,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Initialize animations
window.addEventListener("DOMContentLoaded", () => {
  // Add animation delays to feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});
