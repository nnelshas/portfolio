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
    <p><i class="fa-solid fa-file-pdf"></i> <a href="/portfolio/assets/pdf/resume.pdf" target="_blank">Resume (PDF)</a></p>

selected_papers: true
social: true

announcements:
  enabled: false

latest_posts:
  enabled: false
---

I’m a **Robotics PhD candidate at Georgia Tech** (NSF-GRFP Fellow 2024, expected May 2027) researching **real-time sensing and control for highly dynamic, uncertain physical systems**. My PhD thesis — *"Multi-material Mass Flow Monitoring and Control for Powder-Blown Directed Energy Deposition"* — combines multi-physics sensor fusion, provably-stable adaptive control, and machine learning for next-generation metal additive manufacturing. In parallel, I collaborate with **Los Alamos National Laboratory** on perception and inspection algorithms for autonomous NDE.

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

### Selected Work

- **MRAC + Lyapunov Adaptive Control** *(Stebner Lab)*: Derived Lyapunov-stable adaptation laws for Model Reference Adaptive Control of powder transport with 10–60s delays; **70% fluctuation mitigation** demonstrated. FPGA-deployed.

- **Multi-Physics Sensor Array** *(Stebner Lab)*: Designed and validated 3 novel in-line sensors (piezoelectric, triboelectric, optical) with Bayesian fusion for real-time mass flow monitoring in PB-DED. **5 patents pending** (GT) · **1 patent pending** (LANL).

- **Deformable Convolution for Curved-Surface NDE** *(LANL)*: Invented deformable kernel wavenumber filtering for accurate full-field thickness estimation on arbitrary curved geometries. Patent pending, targeting *MSSP 2026*.

- **Ultrasonic Inspection UQ** *(LANL)*: Theoretical UQ framework propagating measurement uncertainty through full inspection pipelines. Published at **IWSHM 2023**, presented at **AIVELA 2025**.

- **Vision-Language Action Models** *(CS 8803)*: Bayesian LoRA + Laplace approximation for OOD uncertainty quantification on OpenVLA; **99.2% success on LIBERO** via confidence-based action allocation with ~2× inference speedup.

---

### Background

Before Georgia Tech, I studied Mechanical Engineering at Drexel University and co-founded **VitalEyes** — a computer vision startup deployed in 5 GT research labs. I manage Georgia Tech's Rapid Prototyping & Electronics Lab (55+ students trained) and volunteer with Atlanta-area STEM outreach.

I'm broadly excited about robotics problems that sit at the intersection of **rigorous control theory, hardware-grounded sensing, and learning** — especially in high-stakes deployment contexts like autonomous vehicles, inspection robotics, and manufacturing automation.
