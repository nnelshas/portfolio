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
    <p><i class="fa-brands fa-github"></i> <a href="https://github.com/nnelshas" target="_blank">nnelshas</a></p>
    <p><i class="fa-brands fa-linkedin"></i> <a href="https://linkedin.com/in/neelshah8" target="_blank">neelshah8</a></p>
    <p><i class="fa-solid fa-file-pdf"></i> <a href="/portfolio/resume/">Resume</a></p>

selected_papers: false
social: true

announcements:
  enabled: false

latest_posts:
  enabled: false
---

I’m a **Robotics PhD candidate at Georgia Tech** (NSF-GRFP Fellow, expected May 2027) building **real-time sensing and control for highly dynamic, uncertain physical systems** — at the intersection of **rigorous control theory, hardware-grounded sensing, and learning**. My thesis fuses multi-physics sensing, provably-stable adaptive control, and ML for metal additive manufacturing; in parallel I work with **Los Alamos National Laboratory** on perception and inspection for autonomous NDE. I’m most excited by high-stakes deployment problems — autonomous vehicles, inspection robotics, and manufacturing automation.

---

### Research Highlights

<div class="row mt-2 mb-3">
  <div class="col-sm-4">
    <div class="card p-3 h-100" style="border-top: 3px solid var(--global-theme-color);">
      <h6><strong><i class="fa-solid fa-wave-square"></i> Adaptive Control</strong></h6>
      <p class="small mb-0">MRAC with <strong>Lyapunov-stable parameter adaptation</strong> for feedforward control of nonlinear systems with large delays. Derived from first principles — stability guaranteed.</p>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card p-3 h-100" style="border-top: 3px solid var(--global-theme-color);">
      <h6><strong><i class="fa-solid fa-satellite-dish"></i> Multi-Physics Sensing</strong></h6>
      <p class="small mb-0">Designed 3 novel in-line sensors (piezoelectric, triboelectric, optical) with <strong>Bayesian fusion</strong> for robust state estimation under noise and disturbances.</p>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card p-3 h-100" style="border-top: 3px solid var(--global-theme-color);">
      <h6><strong><i class="fa-solid fa-brain"></i> Learning-Based Systems</strong></h6>
      <p class="small mb-0">VLA foundation model UQ (99.2% on LIBERO), deep RL for nonlinear control, PLSR multi-material sensing, and sensor distillation via <strong>cross-modal knowledge transfer</strong>.</p>
    </div>
  </div>
</div>

---

### Projects

<p class="text-center" style="margin-top: -4px; margin-bottom: 1.2rem; opacity: 0.85;">
  <i class="fa-solid fa-circle-play" style="color: var(--global-theme-color);"></i>
  <strong>Hover any card to play a short demo</strong> · click to dive in.
</p>

<div class="projects">
  <div class="row row-cols-1 row-cols-md-3">
    {% assign sorted_projects = site.projects | sort: "importance" %}
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
