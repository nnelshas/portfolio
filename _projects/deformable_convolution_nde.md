---
layout: page
title: Deformable Kernels for Curved-Surface NDE
description: "<strong>Deformable convolution</strong> that bends to follow curved surfaces — maps material thickness across a full part instead of point by point."
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
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">The filter (right) bends to match the local surface as it sweeps across the wavefield (left) — adapting its shape instead of assuming a flat grid.</p>
  </div>
</div>

---

## Overview

- **Problem:** Ultrasonic inspection gauges a part's thickness from the **wavelength** of guided sound waves traveling through it. The standard filters assume a **flat, evenly-sampled grid**, so on curved or irregular parts the readings degrade exactly where inspection matters most.
- **Idea:** Swap the rigid filter for a **deformable one** that bends to the local surface, so the measurement stays accurate over any curvature.
- **Result:** Accurate, whole-surface thickness mapping and defect detection on curved parts — without flattening or re-meshing them first.
- **Status:** Patent pending (Los Alamos National Laboratory); manuscript targeting _Mechanical Systems and Signal Processing_; abstract presented at the Asia-Pacific Workshop on Structural Health Monitoring 2024.

---

## Deformable Wavenumber Filtering

- **Geometry-aware filter:** It samples neighboring points along the surface rather than on a fixed pixel grid, so it follows the curvature instead of fighting it (shown bending in the video above).
- **Wavelength → thickness:** The local wavelength of the sound field maps directly to thickness; keeping the filter valid on curved surfaces keeps that mapping accurate.
- **Defect detection:** Anything that breaks the expected pattern flags defects, thinning, and damage on complex shapes.
- **No flattening needed:** Works directly on the curved surface as measured — flattening it onto a plane would distort the very measurements being made.

## Why It Matters

- **Autonomous inspection:** Curved parts — pipes, pressure vessels, aircraft skins — are exactly where flat-grid methods fail; this brings reliable inspection to them.
- **Whole-surface, not point-by-point:** Maps thickness across the entire field of view at once, instead of scanning one spot at a time.
- **Generalizes:** The deformable-filter idea applies anywhere image-style filtering meets a non-flat surface.

---

## Tools

`Python` · `Deformable Convolution` · `Wavenumber Filtering` · `Signal Processing` · `Full-Field Ultrasonics` · `Guided-Wave NDE`

_Los Alamos National Laboratory. Patent pending; manuscript targeting Mechanical Systems and Signal Processing (MSSP)._
