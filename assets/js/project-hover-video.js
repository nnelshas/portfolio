/**
 * Hover video previews for project cards and publication previews.
 * - .project-card  → plays .project-hover-video on mouseenter
 * - .pub-preview-wrapper → plays .pub-preview-video on mouseenter
 */
(function () {
  "use strict";

  function attachHover(container, videoSelector) {
    var video = container.querySelector(videoSelector);
    if (!video) return;

    container.addEventListener("mouseenter", function () {
      video.currentTime = 0;
      var p = video.play();
      if (p !== undefined) p.catch(function () {});
    });

    container.addEventListener("mouseleave", function () {
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
