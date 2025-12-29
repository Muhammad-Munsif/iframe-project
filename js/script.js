<script>
    // Enhanced Website Functionality with Dark/Light Mode
    document.addEventListener("DOMContentLoaded", function () {
      // ====== THEME TOGGLE ======
      const themeToggle = document.getElementById("themeToggle");
      const themeIcon = themeToggle.querySelector("i");

      // Check for saved theme or system preference
      const savedTheme = localStorage.getItem("responsivepro-theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.className = "fas fa-sun";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.className = "fas fa-moon";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
      }

      themeToggle.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");

        if (currentTheme === "dark") {
          document.documentElement.setAttribute("data-theme", "light");
          themeIcon.className = "fas fa-moon";
          localStorage.setItem("responsivepro-theme", "light");
          themeToggle.setAttribute("aria-label", "Switch to dark mode");
          showToast("Light mode activated");
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
          themeIcon.className = "fas fa-sun";
          localStorage.setItem("responsivepro-theme", "dark");
          themeToggle.setAttribute("aria-label", "Switch to light mode");
          showToast("Dark mode activated");
        }
      });

      // ====== MOBILE MENU TOGGLE ======
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const navLinks = document.getElementById("navLinks");
      const mobileMenuIcon = mobileMenuBtn.querySelector("i");

      mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        mobileMenuIcon.className = navLinks.classList.contains("active")
          ? "fas fa-times"
          : "fas fa-bars";

        // Update aria-label for accessibility
        mobileMenuBtn.setAttribute(
          "aria-expanded",
          navLinks.classList.contains("active")
        );
        mobileMenuBtn.setAttribute(
          "aria-label",
          navLinks.classList.contains("active") ? "Close menu" : "Open menu"
        );
      });

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          navLinks.classList.remove("active");
          mobileMenuIcon.className = "fas fa-bars";
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          mobileMenuBtn.setAttribute("aria-label", "Open menu");
        }
      });

      // Close mobile menu when clicking a link
      document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("active");
          mobileMenuIcon.className = "fas fa-bars";
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          mobileMenuBtn.setAttribute("aria-label", "Open menu");
        });
      });

      // ====== DEMO TABS ======
      const demoButtons = document.querySelectorAll(".demo-tab");
      const tabContents = document.querySelectorAll(".tab-content");

      demoButtons.forEach((button) => {
        button.addEventListener("click", () => {
          // Remove active class from all buttons and contents
          demoButtons.forEach((btn) => {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
          });
          tabContents.forEach((content) => {
            content.classList.remove("active");
            content.setAttribute("aria-hidden", "true");
          });

          // Add active class to clicked button
          button.classList.add("active");
          button.setAttribute("aria-selected", "true");

          // Show corresponding content
          const tabId = button.dataset.tab;
          const targetTab = document.getElementById(`${tabId}-tab`);
          targetTab.classList.add("active");
          targetTab.setAttribute("aria-hidden", "false");
        });
      });

      // ====== FAQ ACCORDION ======
      const faqQuestions = document.querySelectorAll(".faq-question");

      faqQuestions.forEach((question) => {
        question.addEventListener("click", () => {
          const answer = question.nextElementSibling;
          const icon = question.querySelector(".faq-icon");

          // Toggle active class
          question.classList.toggle("active");
          answer.classList.toggle("active");

          // Update aria-expanded for accessibility
          const isExpanded = question.classList.contains("active");
          question.setAttribute("aria-expanded", isExpanded);
          answer.setAttribute("aria-hidden", !isExpanded);
        });
      });

      // ====== FORM SUBMISSION ======
      const contactForm = document.getElementById("contactForm");

      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        // Show success message
        showToast(
          `Thank you ${name}! We've received your message and will contact you at ${email} soon.`
        );

        // Reset form
        contactForm.reset();
      });

      // ====== SCROLL TO TOP ======
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

      // ====== SMOOTH SCROLLING ======
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

            // Update active nav link
            document.querySelectorAll(".nav-links a").forEach(link => {
              link.classList.remove("active");
            });
            this.classList.add("active");
          }
        });
      });

      // ====== SCROLL ANIMATIONS ======
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      // Observe all elements with fade-in class
      document.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
      });

      // ====== TOAST NOTIFICATION ======
      function showToast(message) {
        // Create toast element
        const toast = document.createElement("div");
        toast.className = "toast-notification";
        toast.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <span>${message}</span>
        `;

        // Add styles
        Object.assign(toast.style, {
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "var(--gradient-primary)",
          color: "white",
          padding: "var(--space-md) var(--space-lg)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: "9999",
          opacity: "0",
          transform: "translateX(100%)",
          transition: "all var(--transition-normal)",
          maxWidth: "400px",
          fontFamily: "inherit"
        });

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
          Object.assign(toast.style, {
            opacity: "1",
            transform: "translateX(0)"
          });
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
          Object.assign(toast.style, {
            opacity: "0",
            transform: "translateX(100%)"
          });
          setTimeout(() => {
            if (toast.parentNode) {
              toast.parentNode.removeChild(toast);
            }
          }, 300);
        }, 3000);
      }

      // ====== DEMO FUNCTIONS ======
      window.simulateMobile = function () {
        showToast("Mobile view simulated - Container width adjusted");
        const demoContainer = document.querySelector('.iframe-container > div');
        if (demoContainer) {
          demoContainer.style.maxWidth = "320px";
          demoContainer.style.transition = "all var(--transition-normal)";
        }
      };

      window.simulateTablet = function () {
        showToast("Tablet view simulated - Container width adjusted");
        const demoContainer = document.querySelector('.iframe-container > div');
        if (demoContainer) {
          demoContainer.style.maxWidth = "768px";
          demoContainer.style.transition = "all var(--transition-normal)";
        }
      };

      window.simulateDesktop = function () {
        showToast("Desktop view simulated - Container width reset");
        const demoContainer = document.querySelector('.iframe-container > div');
        if (demoContainer) {
          demoContainer.style.maxWidth = "400px";
          demoContainer.style.transition = "all var(--transition-normal)";
        }
      };

      // ====== SET CURRENT YEAR ======
      document.getElementById("currentYear").textContent = new Date().getFullYear();

      // ====== ADD KEYBOARD SHORTCUTS ======
      document.addEventListener("keydown", (e) => {
        // Ctrl/Cmd + / for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.key === "/") {
          e.preventDefault();
          themeToggle.click();
        }

        // Escape key closes mobile menu
        if (e.key === "Escape" && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuIcon.className = "fas fa-bars";
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          mobileMenuBtn.setAttribute("aria-label", "Open menu");
        }
      });

      // ====== PERFORMANCE OBSERVER ======
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log(`LCP candidate: ${entry.startTime}`, entry);
          }
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // ====== RESPONSIVE IMAGES ======
      // This would typically be handled with srcset attributes in real images
      // For demo purposes, we're using inline SVG and icons

      // ====== LAZY LOADING ======
      // Add loading="lazy" to images if they were present
      // document.querySelectorAll('img').forEach(img => {
      //   img.loading = 'lazy';
      // });

      // ====== PWA READINESS ======
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
              console.log('ServiceWorker registration failed:', error);
            });
        });
      }

      // ====== OFFLINE DETECTION ======
      window.addEventListener('online', () => {
        showToast('You are back online!');
      });

      window.addEventListener('offline', () => {
        showToast('You are offline. Some features may not work.');
      });
    });

    // ====== ADDITIONAL GLOBAL FUNCTIONS ======
    window.refreshIframe = function () {
      showToast("Page refreshed - This would reload an actual iframe");
    };

    window.toggleFullscreen = function () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    window.openInNewTab = function () {
      window.open("https://example.com", "_blank");
    };
  </script>