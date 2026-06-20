---
layout: about
title: about
permalink: /
subtitle: >
  Robotics PhD Candidate · Georgia Tech &nbsp;|&nbsp;
  <a href="mailto:nshah@gatech.edu">nshah@gatech.edu</a> &nbsp;|&nbsp;
  NSF-GRFP Fellow

profile:
  align: right
  image: meLinked.jpg
  image_circular: false
  more_info: >
    <p><i class="fa-solid fa-location-dot"></i> Atlanta, GA</p>
    <p><i class="fa-solid fa-envelope"></i> <a href="mailto:nshah@gatech.edu">nshah@gatech.edu</a></p>
    <p><i class="fa-brands fa-linkedin"></i> <a href="https://linkedin.com/in/neelshah8" target="_blank">neelshah8</a></p>
    <p><i class="fa-solid fa-file-pdf"></i> <a href="/portfolio/resume/">Resume</a></p>

selected_papers: false
social: true

announcements:
  enabled: false

latest_posts:
  enabled: false
---

I’m a **Robotics PhD candidate at Georgia Tech** (NSF-GRFP Fellow, graduating May 2027). I build **real-time sensing and control systems for noisy, fast-moving hardware**, combining control theory, physical sensors, and machine learning. My thesis unites all three to monitor and control metal 3D printing as it happens; in parallel, I work with **Los Alamos National Laboratory** on perception for robots that inspect structures for hidden damage. I’m drawn to safety-critical autonomy — self-driving vehicles, inspection robotics, and manufacturing automation — where reliability is non-negotiable.

---

### Research Highlights

<div class="row mt-2 mb-3">
  <div class="col-sm-4">
    <div class="card p-3 h-100" style="border-top: 3px solid var(--global-theme-color);">
      <h6><strong><i class="fa-solid fa-wave-square"></i> Adaptive Control</strong></h6>
      <p class="small mb-0">Controllers that <strong>tune themselves online</strong> to steer nonlinear systems with long delays — with stability proven mathematically (Lyapunov-based MRAC), not just tuned by hand.</p>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card p-3 h-100" style="border-top: 3px solid var(--global-theme-color);">
      <h6><strong><i class="fa-solid fa-satellite-dish"></i> Multi-Physics Sensing</strong></h6>
      <p class="small mb-0">Three custom sensors (piezoelectric, triboelectric, optical) whose readings are <strong>fused statistically</strong> into one reliable measurement that holds up under heavy noise.</p>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card p-3 h-100" style="border-top: 3px solid var(--global-theme-color);">
      <h6><strong><i class="fa-solid fa-brain"></i> Learning-Based Systems</strong></h6>
      <p class="small mb-0">Uncertainty estimates for robot foundation models (99.2% on the LIBERO benchmark), deep reinforcement learning for control, and <strong>teaching cheap sensors to imitate expensive ones</strong> via cross-modal knowledge transfer.</p>
    </div>
  </div>
</div>

---

### Selected Works

<p class="text-center" style="margin-top: -4px; margin-bottom: 1.2rem; opacity: 0.85;">
  <i class="fa-solid fa-circle-play" style="color: var(--global-theme-color);"></i>
  <strong>Hover any card to play a short demo</strong> · click for the full write-up.
</p>

<div class="projects">
  <div class="row row-cols-1 row-cols-md-3">
    {% assign sorted_projects = site.projects | sort: "importance" %}
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
