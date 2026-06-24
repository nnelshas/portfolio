/**
 * Video previews for project cards and publication previews.
 * - .project-card        → .project-card-video
 * - .pub-preview-wrapper → .pub-preview-video
 *
 * Behavior:
 * - Desktop (hover-capable): hover plays the video on a loop. In addition,
 *   the first time a card scrolls into view it plays through once and resets,
 *   so the user can tell at a glance that the thumbnail is actually a video.
 * - Mobile / touch (no hover): the video autoplays (looping) whenever the
 *   card is in view and pauses when it scrolls away.
 *
 * Videos use preload="auto" so they're ready by the time they're shown. The
 * poster stays up until a real frame is available, then an `is-playing` class
 * crossfades the poster out and the video in (no black flash).
 */
(function () {
  "use strict";

  var canHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function setup(container, videoSelector) {
    var video = container.querySelector(videoSelector);
    if (!video) return;

    // Whether we currently intend the video to be shown/playing. Gates the
    // reveal so load-time media events don't unhide an idle video.
    var active = false;

    function revealIfActive() {
      if (active) container.classList.add("is-playing");
    }
    video.addEventListener("playing", revealIfActive);
    video.addEventListener("loadeddata", revealIfActive);
    video.addEventListener("canplay", revealIfActive);

    function play(loop) {
      active = true;
      video.loop = loop;
      var p = video.play();
      if (p !== undefined) p.catch(function () {});
      if (video.readyState >= 2) revealIfActive();
    }

    function stop() {
      active = false;
      container.classList.remove("is-playing");
      video.pause();
      video.currentTime = 0;
    }

    var hasIO = "IntersectionObserver" in window;

    if (canHover) {
      // --- Desktop: hover to play (looping) ---
      container.addEventListener("mouseenter", function () {
        play(true);
      });
      container.addEventListener("mouseleave", stop);

      // Reset to the poster when the one-time intro playthrough ends (unless
      // the pointer is currently over the card, in which case keep looping).
      video.addEventListener("ended", function () {
        if (!container.matches(":hover")) stop();
      });

      // --- Desktop: play once when the card first enters view ---
      if (hasIO) {
        var demoed = false;
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting && !demoed) {
                demoed = true;
                io.unobserve(container);
                if (!container.matches(":hover")) play(false); // play through once
              }
            });
          },
          { threshold: 0.5 }
        );
        io.observe(container);
      }
    } else {
      // --- Mobile / touch: autoplay (looping) while in view ---
      if (hasIO) {
        var ioMobile = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) play(true);
              else stop();
            });
          },
          { threshold: 0.5 }
        );
        ioMobile.observe(container);
      } else {
        play(true);
      }
    }
  }

  function init() {
    document.querySelectorAll(".project-card").forEach(function (el) {
      setup(el, ".project-card-video");
    });
    document.querySelectorAll(".pub-preview-wrapper").forEach(function (el) {
      setup(el, ".pub-preview-video");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
