/**
 * Hover video previews for project cards and publication previews.
 * - .project-card  → plays .project-card-video on mouseenter
 * - .pub-preview-wrapper → plays .pub-preview-video on mouseenter
 *
 * The videos use preload="auto" so they start downloading on page load and
 * every hover plays instantly. The poster/thumbnail stays visible until a
 * real frame is available, then an `is-playing` class crossfades the poster
 * out and the video in — so a still-buffering video never flashes black, and
 * (unlike a pure `playing`-event gate) a video that buffers slowly the first
 * time still reveals reliably.
 */
(function () {
  "use strict";

  function attachHover(container, videoSelector) {
    var video = container.querySelector(videoSelector);
    if (!video) return;

    var hovered = false;

    // Only reveal while the pointer is actually over the card — otherwise the
    // load-time `loadeddata`/`canplay` events would unhide every video at once.
    function revealIfHovered() {
      if (hovered) container.classList.add("is-playing");
    }

    // Any of these means at least one frame is ready to show.
    video.addEventListener("playing", revealIfHovered);
    video.addEventListener("loadeddata", revealIfHovered);
    video.addEventListener("canplay", revealIfHovered);

    container.addEventListener("mouseenter", function () {
      hovered = true;
      var p = video.play();
      if (p !== undefined) p.catch(function () {});
      // Already buffered (the common case with preload="auto") → reveal now.
      if (video.readyState >= 2) revealIfHovered();
    });

    container.addEventListener("mouseleave", function () {
      hovered = false;
      container.classList.remove("is-playing");
      video.pause();
      video.currentTime = 0;
    });
  }

  function init() {
    document.querySelectorAll(".project-card").forEach(function (el) {
      attachHover(el, ".project-card-video");
    });
    document.querySelectorAll(".pub-preview-wrapper").forEach(function (el) {
      attachHover(el, ".pub-preview-video");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
