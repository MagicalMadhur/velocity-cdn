/**
 * =============================================================================
 * Velocity Download Manager — Interactive Front-End Script
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initBenchmarkSimulation();
  fetchGitHubStats();
});

// Interactive Speed Benchmark Animation
function initBenchmarkSimulation() {
  const browserBar = document.getElementById('browser-bar');
  const velocityBar = document.getElementById('velocity-bar');
  const browserSpeed = document.getElementById('browser-speed');
  const velocitySpeed = document.getElementById('velocity-speed');

  if (!browserBar || !velocityBar) return;

  let browserProgress = 0;
  let velocityProgress = 0;

  function runCycle() {
    browserProgress = 0;
    velocityProgress = 0;
    browserBar.style.width = '0%';
    velocityBar.style.width = '0%';

    const interval = setInterval(() => {
      // Browser advances slowly (1x single thread)
      browserProgress += 0.8;
      // Velocity advances rapidly (32 threads parallel)
      velocityProgress += 3.8;

      if (browserBar) browserBar.style.width = Math.min(browserProgress, 100) + '%';
      if (velocityBar) velocityBar.style.width = Math.min(velocityProgress, 100) + '%';

      // Dynamic speed fluctuations
      if (browserSpeed && browserProgress < 100) {
        const jitter = (2.2 + Math.random() * 0.4).toFixed(1);
        browserSpeed.textContent = `1 Stream • ${jitter} MB/s (Throttled)`;
      }

      if (velocitySpeed && velocityProgress < 100) {
        const jitter = (16.2 + Math.random() * 1.8).toFixed(1);
        velocitySpeed.textContent = `32 Parallel Threads • ${jitter} MB/s (Saturated)`;
      }

      if (velocityProgress >= 100 && browserProgress >= 28) {
        if (velocitySpeed) velocitySpeed.textContent = `✅ Completed in 3.1s! (32 Threads)`;
        clearInterval(interval);
        setTimeout(runCycle, 4000); // Restart simulation after pause
      }
    }, 100);
  }

  runCycle();
}

// Fetch live GitHub Stars
async function fetchGitHubStats() {
  try {
    const res = await fetch('https://api.github.com/repos/MagicalMadhur/velocity-cdn');
    if (!res.ok) return;
    const data = await res.json();
    if (data.stargazers_count !== undefined) {
      const starText = document.querySelector('.btn-github .btn-sub');
      if (starText) {
        starText.textContent = `⭐ ${data.stargazers_count} Stars on GitHub`;
      }
    }
  } catch (e) {
    // Silent fallback
  }
}

