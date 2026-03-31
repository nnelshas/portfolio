---
layout: page
title: Uncertainty Quantification for Ultrasonic NDE Inspection
description: Rigorous theoretical UQ framework for full-field ultrasonic thickness estimation pipelines — published at IWSHM 2023 and AIVELA 2025.
img: assets/img/proj_inspection.jpg
importance: 6
category: research
---

## Overview

Full-field ultrasonic inspection generates rich thickness maps of structural components, but the uncertainty of those estimates is rarely quantified rigorously. This project develops a **comprehensive theoretical uncertainty quantification (UQ) framework** for ultrasonic inspection pipelines — from raw waveform acquisition through signal processing to final thickness output.

The work was conducted collaboratively with **Los Alamos National Laboratory (LANL)** and published at the **International Workshop for Structural Health Monitoring (IWSHM 2023)**; an extended version was later presented at **AIVELA 2025**.

---

## Motivation

Without calibrated uncertainty estimates, inspection results are difficult to interpret reliably:
- Is a thinned region a real defect or measurement noise?
- How many repeat measurements reduce error to an acceptable threshold?
- Where in the pipeline is error introduced — transducer placement, wave velocity assumptions, or signal processing?

This framework answers these questions systematically.

---

## UQ Framework

### End-to-End Error Propagation

We propagate measurement uncertainty through each stage of the inspection pipeline:

<div class="row mt-3">
  <div class="col-sm-12">
    <div class="card p-3" style="background: var(--global-bg-color);">
      <div class="row text-center align-items-center">
        <div class="col-sm-2">
          <i class="fa-solid fa-wave-square fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="small mt-2 mb-0"><strong>Acquisition</strong><br>transducer noise, positioning error</p>
        </div>
        <div class="col-sm-1">→</div>
        <div class="col-sm-2">
          <i class="fa-solid fa-filter fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="small mt-2 mb-0"><strong>Preprocessing</strong><br>filtering, time-of-flight estimation</p>
        </div>
        <div class="col-sm-1">→</div>
        <div class="col-sm-2">
          <i class="fa-solid fa-chart-area fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="small mt-2 mb-0"><strong>Wavenumber estimation</strong><br>spectral uncertainty</p>
        </div>
        <div class="col-sm-1">→</div>
        <div class="col-sm-2">
          <i class="fa-solid fa-ruler fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="small mt-2 mb-0"><strong>Thickness map</strong><br>calibrated confidence intervals</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Key Findings

- **Dominant error source identified**: Transducer positioning uncertainty and wave velocity estimation dominate the final thickness error budget, not electronic noise.
- **Curvature amplifies uncertainty**: High-curvature surface regions exhibit systematically larger thickness estimation uncertainty — quantified analytically.
- **Probabilistic anomaly thresholds**: Derived detection thresholds with well-calibrated false-alarm rates, enabling statistically grounded go/no-go inspection decisions.
- **Optimal measurement strategies**: Framework prescribes how many repeat scans reduce estimation variance to a target threshold.

---

## Publication

> **Uncertainty Quantification of Thickness Estimation via Full-field Ultrasonic Inspection**
>
> *Neel Shah, E. Jacobson, E. Flynn, A. Wachtor*
>
> **IWSHM 2023** — International Workshop for Structural Health Monitoring
>
> *Also presented at AIVELA 2025*

---

## Related Work

This UQ foundation motivated subsequent development of **deformable convolution methods** for handling curved-geometry wavenumber filtering (see separate project). The UQ framework there extends to curved surfaces where geometric effects compound measurement uncertainty.

---

## Tools & Technologies

`Python (NumPy, SciPy)` · `MATLAB` · `Statistical UQ` · `Signal Processing` · `Ultrasonic Wavefield Analysis`

---

## Project Context

Collaborative research between **Georgia Tech** and **Los Alamos National Laboratory (LANL)** (2022–Present).
