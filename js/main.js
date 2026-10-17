/**
 * StoryCast — Main JavaScript (Vanilla, Accessible, No Frameworks)
 * Handles mobile navigation disclosure, story category filtering, and accessible feedback forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // 1. Accessible Mobile Navigation Disclosure (WCAG 2.1 AA)
  // ---------------------------------------------------------------------------
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const primaryNav = document.getElementById('primary-navigation');

  if (navToggleBtn && primaryNav) {
    navToggleBtn.addEventListener('click', () => {
      const isExpanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
      navToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('is-open');

      if (!isExpanded) {
        // Focus the first navigation link when opened
        const firstLink = primaryNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        navToggleBtn.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
        navToggleBtn.focus();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Story Category Filtering (Home Page)
  // ---------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.c-filters__pill');
  const storiesCollection = document.getElementById('stories-collection');
  const storyCountDisplay = document.getElementById('story-count');

  if (filterPills.length > 0 && storiesCollection) {
    const storyCards = storiesCollection.querySelectorAll('.c-story-card-wrapper');

    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        // Update aria-pressed states
        filterPills.forEach((p) => p.setAttribute('aria-pressed', 'false'));
        pill.setAttribute('aria-pressed', 'true');

        const filterValue = pill.getAttribute('data-filter');
        let visibleCount = 0;

        storyCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = '';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (storyCountDisplay) {
          storyCountDisplay.textContent = String(visibleCount);
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Accessible Feedback Form Handling (About Page)
  // ---------------------------------------------------------------------------
  const feedbackForm = document.getElementById('accessibility-feedback-form');
  const feedbackStatus = document.getElementById('feedback-status');

  if (feedbackForm && feedbackStatus) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      feedbackStatus.textContent = 'Thank you! Your accessibility report has been logged and forwarded to our editorial team.';
      feedbackForm.reset();
      setTimeout(() => {
        feedbackStatus.textContent = '';
      }, 7000);
    });
  }
});
