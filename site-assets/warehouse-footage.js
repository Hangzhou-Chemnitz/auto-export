(() => {
  'use strict';
  // Keep real video sources in HTML for native controls and no-JS use. Only
  // start muted previews when visible; do not download all clips at page load.
  const videos = [...document.querySelectorAll('#warehouse-footage video')];
  if (!videos.length || !('IntersectionObserver' in window)) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const visible = new Set();
  const manuallyControlled = new WeakSet();
  function sync(video) {
    if (!visible.has(video) || document.hidden) { if (!video.paused) video.pause(); return; }
    if (video.preload === 'none') { video.preload = 'metadata'; video.load(); }
    if (reducedMotion.matches || navigator.connection?.saveData || manuallyControlled.has(video)) return;
    video.muted = true;
    const result = video.play();
    if (result) result.catch(() => {}); // Native controls remain usable if blocked.
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.35) visible.add(entry.target);
      else visible.delete(entry.target);
      sync(entry.target);
    }
  }, { threshold: 0.35 });
  for (const video of videos) {
    video.addEventListener('pointerdown', () => manuallyControlled.add(video));
    video.addEventListener('keydown', () => manuallyControlled.add(video));
    observer.observe(video);
  }
  document.addEventListener('visibilitychange', () => videos.forEach(sync));
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) videos.forEach(video => { if (!video.paused) video.pause(); });
    else videos.forEach(sync);
  });
})();
