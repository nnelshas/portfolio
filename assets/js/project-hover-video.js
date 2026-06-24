/**
 * Hover video previews for project cards and publication previews.
 * - .project-card  → plays .project-card-video on mouseenter
 * - .pub-preview-wrapper → plays .pub-preview-video on mouseenter
 *
 * The poster/thumbnail stays visible until the video actually begins
 * playing (the `playing` event), at which point an `is-playing` class is
 * added so CSS can crossfade the poster out and the video in. This avoids
 * the "black flash" you'd otherwise see while an uncached video is still
 * buffering after the poster has already faded away.
 */
(function () {
  "use strict";

  function attachHover(container, videoSelector) {
    var video = container.querySelector(videoSelector);
    if (!video) return;

    // Reveal the video only once frames are actually rendering.
    video.addEventListener("playing", function () {
      container.classList.add("is-playing");
    });

    container.addEventListener("mouseenter", function () {
      // Kick off the network fetch immediately so playback starts ASAP on
      // an uncached load.
      if (video.preload === "none") video.load();
      video.currentTime = 0;
      var p = video.play();
      if (p !== undefined) p.catch(function () {});
    });

    container.addEventListener("mouseleave", function () {
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
