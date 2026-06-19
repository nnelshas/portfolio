---
layout: page
title: Deformable Kernels for Curved-Surface NDE
description: Deformable-convolution wavenumber filtering that warps its kernel to local geometry for full-field thickness estimation on arbitrary curved surfaces.
img: assets/img/proj_deformable.jpg
hover_video: assets/video/deformable_nde_preview.mp4
importance: 3
category: research
---

<div class="row mb-4">
  <div class="col-sm-12">
    <video width="100%" controls autoplay muted loop playsinline poster="{{ 'assets/img/proj_deformable.jpg' | relative_url }}" style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/deformable_nde.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">The convolution kernel (right) deforms to match the local surface geometry as it sweeps the wavefield (left) — adapting its shape instead of assuming a flat grid.</p>
  </div>
</div>

---

## Overview

- **Problem:** Full-field ultrasonic inspection estimates thickness by measuring the local **wavenumber** of guided waves — but standard convolutional wavenumber filters assume a **flat, regularly-sampled grid**. On curved or irregular geometries that assumption breaks, and thickness estimates degrade exactly where inspection matters most.
- **Idea:** Replace the rigid kernel with a **deformable convolution** kernel that warps to the local surface, so wavenumber filtering stays accurate over arbitrary curvature.
- **Result:** General curved-surface, full-field thickness estimation and anomaly detection — without flattening or re-meshing the part.
- **Status:** Patent pending (Los Alamos National Laboratory); manuscript targeting _Mechanical Systems and Signal Processing_; abstract presented at the Asia-Pacific Workshop on Structural Health Monitoring 2024.

---

## Deformable Wavenumber Filtering

- **Geometry-adaptive kernel:** The kernel samples neighbors along the surface rather than a fixed pixel grid, so it follows curvature instead of fighting it (shown deforming in the video above).
- **Wavenumber → thickness:** Local spatial frequency of the guided wavefield maps to plate thickness; keeping the filter valid on curved surfaces keeps that mapping accurate.
- **Anomaly detection:** Deviations in the recovered wavenumber field flag defects, thinning, and damage in complex geometries.
- **No flattening required:** Works directly on the as-measured curved-surface wavefield — no parameterization to a plane, which would distort the very wavenumbers being measured.

## Why It Matters

- **Autonomous inspection:** Curved components (pipes, vessels, aerospace skins) are where flat-grid assumptions fail; this extends reliable full-field NDE to them.
- **Full-field, not point-by-point:** Estimates thickness everywhere in the field of view at once, rather than scanning discrete points.
- **Generalizes:** The deformable-kernel idea applies wherever convolutional filtering meets non-flat sampling geometry.

---

## Tools

`Python` · `Deformable Convolution` · `Wavenumber Filtering` · `Signal Processing` · `Full-Field Ultrasonics` · `Guided-Wave NDE`

_Los Alamos National Laboratory. Patent pending; manuscript targeting Mechanical Systems and Signal Processing (MSSP)._
