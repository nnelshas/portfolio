---
layout: page
title: Deformable Kernels for Curved-Surface Wavenumber Filtering
description: Novel deformable convolution approach for accurate full-field thickness estimation on arbitrary curved geometries — patent pending, targeting MSSP 2026.
img: assets/img/proj_sensor_fusion.jpg
importance: 5
category: research
---

## Overview

Standard wavenumber-domain processing methods for ultrasonic NDE assume locally flat geometry — an assumption that breaks down for curved structural components like aircraft fuselages, pressure vessels, and pipelines. This project invents a **deformable convolution workflow** that adapts spatial filter kernels to arbitrary surface curvature, enabling accurate full-field thickness estimation on geometrically complex parts.

Developed at **Los Alamos National Laboratory (LANL)**, this work is being prepared as a journal manuscript targeting *Mechanical Systems and Signal Processing* (2026), with a **patent in preparation**.

---

## The Problem: Curvature-Induced Bias in Wavenumber Filtering

In flat-plate inspection, the wavenumber response of a propagating elastic wave is spatially uniform — the standard 2D Fourier-based filter works well. On a **curved surface**, the effective local wavenumber varies spatially: the wave propagation direction, apparent frequency content, and filter response all change with position.

Applying a flat-geometry filter to curved data introduces:
- **Systematic thickness estimation bias** proportional to local curvature
- **Resolution degradation** at high-curvature regions
- **False anomaly indications** near curvature transitions

---

## Deformable Kernel Approach

<div class="row mt-3">
  <div class="col-sm-6">
    <h4>Standard (Flat) Kernel</h4>
    <ul>
      <li>Fixed rectangular sampling grid</li>
      <li>Assumes uniform wavenumber response</li>
      <li>Correct only for flat geometry</li>
      <li>Biased on curved surfaces</li>
    </ul>
  </div>
  <div class="col-sm-6">
    <h4>Deformable Kernel (Ours)</h4>
    <ul>
      <li>Learned offset grid adapts to local curvature</li>
      <li>Offsets derived from surface principal curvatures</li>
      <li>Aligns phase response to local propagation geometry</li>
      <li>Accurate on arbitrary curved surfaces</li>
    </ul>
  </div>
</div>

### Curvature-Aware Offset Computation

Kernel sampling offsets are computed from the surface's **principal curvatures**, derived from either:
1. A parametric CAD geometry model, or
2. A reconstructed point cloud (see our LiDAR registration pipeline)

The offsets transform the flat-geometry convolution kernel so that it samples along curved wavefronts rather than flat grid lines, correctly accounting for the varying propagation path.

### Connection to Deformable Convolution Networks

The approach is conceptually inspired by **deformable convolutional networks (Dai et al., ICCV 2017)** from deep learning, but applied to the physical domain of elastic wavefield processing rather than feature learning. Offsets are computed analytically from geometry rather than learned from data.

---

## Results

- Eliminates systematic curvature-induced bias in thickness maps
- Correct anomaly localization on test components with known defects
- Validated on synthetic wavefields with analytically known ground truth
- Generalizes to arbitrary surface profiles without per-component retuning

---

## Publication & IP Status

| Item | Status |
|---|---|
| Journal manuscript | In preparation — targeting *Mechanical Systems and Signal Processing* (2026) |
| Patent | In preparation (Georgia Tech / LANL) |

---

## Related Work

The UQ framework for standard ultrasonic inspection (IWSHM 2023) provides the statistical foundation extended here to the curved-geometry case. See the [UQ project page](/portfolio/projects/ultrasonic_inspection_uq/) for details.

---

## Tools & Technologies

`Python (NumPy, PyTorch)` · `MATLAB` · `Open3D (point cloud curvature estimation)` · `Signal Processing` · `Elastic Wavefield Simulation`

---

## Project Context

Research at **Los Alamos National Laboratory (LANL)** in collaboration with **Georgia Tech** (2022–Present).
