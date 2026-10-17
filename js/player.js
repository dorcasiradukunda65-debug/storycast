/**
 * StoryCast — Media Player & Synchronized Transcript Controller
 * Handles WCAG 2.1 AA accessible media controls, caption toggle, and live transcript seeking.
 */

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('story-video');
  const audio = document.getElementById('story-audio');
  const playBtn = document.getElementById('vid-play-btn');
  const rewindBtn = document.getElementById('vid-rewind-btn');
  const forwardBtn = document.getElementById('vid-forward-btn');
  const speedSelect = document.getElementById('vid-speed-select');
  const captionsBtn = document.getElementById('vid-captions-btn');

  const transcriptCues = document.querySelectorAll('.c-transcript__cue');
  const transcriptSearch = document.getElementById('transcript-search');
  const transcriptAnnouncer = document.getElementById('transcript-announcer');
  const matchCountDisplay = document.getElementById('transcript-match-count');

  // Currently active media (defaults to video, or audio if user interacted with audio)
  let activeMedia = video || audio;

  // ---------------------------------------------------------------------------
  // 1. Accessible Video Control Bar Handlers
  // ---------------------------------------------------------------------------
  if (video && playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused || video.ended) {
        video.play();
        playBtn.innerHTML = `
          <svg class="c-btn__icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <span>Pause</span>`;
        playBtn.setAttribute('aria-label', 'Pause video');
      } else {
        video.pause();
        playBtn.innerHTML = `
          <svg class="c-btn__icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>Play</span>`;
        playBtn.setAttribute('aria-label', 'Play video');
      }
    });

    video.addEventListener('play', () => {
      activeMedia = video;
      if (audio && !audio.paused) audio.pause();
      if (playBtn) {
        playBtn.innerHTML = `
          <svg class="c-btn__icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <span>Pause</span>`;
      }
    });

    video.addEventListener('pause', () => {
      if (playBtn) {
        playBtn.innerHTML = `
          <svg class="c-btn__icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>Play</span>`;
      }
    });

    if (rewindBtn) {
      rewindBtn.addEventListener('click', () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
      });
    }

    if (forwardBtn) {
      forwardBtn.addEventListener('click', () => {
        video.currentTime = Math.min(video.duration || 100, video.currentTime + 10);
      });
    }

    if (speedSelect) {
      speedSelect.addEventListener('change', () => {
        const speed = parseFloat(speedSelect.value);
        video.playbackRate = speed;
        if (audio) audio.playbackRate = speed;
      });
    }

    if (captionsBtn) {
      captionsBtn.addEventListener('click', () => {
        const textTracks = video.textTracks;
        if (textTracks && textTracks.length > 0) {
          const track = textTracks[0];
          const isShowing = track.mode === 'showing';
          track.mode = isShowing ? 'hidden' : 'showing';
          captionsBtn.setAttribute('aria-pressed', String(!isShowing));
          captionsBtn.textContent = !isShowing ? 'CC On' : 'CC Off';
        }
      });
    }
  }

  if (audio) {
    audio.addEventListener('play', () => {
      activeMedia = audio;
      if (video && !video.paused) video.pause();
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Synchronized Transcript Highlight & Auto-Scroll
  // ---------------------------------------------------------------------------
  function syncTranscript(currentTime) {
    transcriptCues.forEach((cue) => {
      const start = parseFloat(cue.getAttribute('data-start'));
      const end = parseFloat(cue.getAttribute('data-end'));

      if (currentTime >= start && currentTime < end) {
        if (!cue.classList.contains('is-active')) {
          transcriptCues.forEach((c) => c.classList.remove('is-active'));
          cue.classList.add('is-active');

          // Smoothly scroll active cue into view within the scroll container
          cue.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }

  if (video) {
    video.addEventListener('timeupdate', () => {
      syncTranscript(video.currentTime);
    });
  }

  if (audio) {
    audio.addEventListener('timeupdate', () => {
      syncTranscript(audio.currentTime);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Clickable Seek Timestamp Buttons
  // ---------------------------------------------------------------------------
  const seekButtons = document.querySelectorAll('[data-seek]');
  seekButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTime = parseFloat(btn.getAttribute('data-seek'));
      const media = activeMedia || video || audio;

      if (media) {
        media.currentTime = targetTime;
        media.play();
        syncTranscript(targetTime);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Accessible Real-Time Transcript Search Filter
  // ---------------------------------------------------------------------------
  if (transcriptSearch && transcriptAnnouncer) {
    transcriptSearch.addEventListener('input', () => {
      const query = transcriptSearch.value.trim().toLowerCase();
      let matchCount = 0;

      transcriptCues.forEach((cue) => {
        const text = cue.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          cue.style.display = '';
          matchCount++;
        } else {
          cue.style.display = 'none';
        }
      });

      if (matchCountDisplay) {
        matchCountDisplay.textContent = `${matchCount} of ${transcriptCues.length} segments`;
      }

      // Announce filter results to assistive technologies
      transcriptAnnouncer.textContent = query
        ? `Found ${matchCount} transcript segments matching "${query}".`
        : `Showing all ${transcriptCues.length} transcript segments.`;
    });
  }
});
