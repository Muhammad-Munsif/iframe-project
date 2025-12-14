
    // iFrame Loading Animation
    function hideLoading() {
      document.getElementById('iframeLoading').style.display = 'none';
      // Simulate loading time calculation
      document.getElementById('loadTime').textContent = (Math.random() * 2 + 1.5).toFixed(1);
    }

    function refreshIframe() {
      const iframe = document.getElementById('mainIframe');
      const loading = document.getElementById('iframeLoading');
      loading.style.display = 'flex';
      iframe.src = iframe.src;
    }

    function openInNewTab() {
      window.open(document.getElementById('mainIframe').src, '_blank');
    }

    // Form Submission
    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      // Validate form
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }

      // Show success message
      const successMessage = document.getElementById('successMessage');
      successMessage.style.display = 'block';

      // Animate stats
      animateStats();

      // Reset form after 3 seconds
      setTimeout(() => {
        this.reset();
        successMessage.style.display = 'none';
      }, 3000);

      // Simulate sending data (in a real app, you would use fetch/axios)
      console.log('Form submitted:', { name, email, subject, message });
    });

    // Animate stats on page load
    function animateStats() {
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const finalValue = parseFloat(stat.textContent);
        let current = 0;
        const increment = finalValue / 20;

        const timer = setInterval(() => {
          current += increment;
          if (current >= finalValue) {
            stat.textContent = finalValue.toFixed(stat.id === 'loadTime' ? 1 : 0);
            clearInterval(timer);
          } else {
            stat.textContent = current.toFixed(stat.id === 'loadTime' ? 1 : 0);
          }
        }, 50);
      });
    }

    // URL Input for iFrame (optional feature)
    function changeIframeUrl() {
      const newUrl = prompt('Enter new URL for iFrame:', 'https://www.example.com');
      if (newUrl && newUrl.startsWith('http')) {
        document.getElementById('mainIframe').src = newUrl;
        document.getElementById('urlDisplay').textContent = newUrl;
        document.getElementById('iframeLoading').style.display = 'flex';
      }
    }

    // Make URL display clickable to change URL
    document.getElementById('urlDisplay').addEventListener('click', changeIframeUrl);

    // Initialize animations
    window.addEventListener('load', () => {
      // Add animation delay to cards
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });

      // Animate stats on page load
      animateStats();

      // Simulate responsive score
      const responsiveScore = document.getElementById('responsiveScore');
      let score = 85;
      const scoreTimer = setInterval(() => {
        score += 1;
        responsiveScore.textContent = score;
        if (score >= 98) clearInterval(scoreTimer);
      }, 50);
    });

    // Add hover effect to form inputs
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
      });

      input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
      });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + R to refresh iframe
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshIframe();
      }

      // Ctrl/Cmd + Enter to submit form
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('contactForm');
        if (form.checkValidity()) {
          form.dispatchEvent(new Event('submit'));
        }
      }
    });
  