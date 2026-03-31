---
layout: page
title: Automated 3D Point Cloud Registration
description: FPFH + RANSAC + ICP + pose graph pipeline for multi-scan LiDAR registration at LANL — fully automated, no manual alignment.
img: assets/img/proj_pointcloud.jpg
importance: 2
category: research
---

## Pipeline

<div class="row mt-3 mb-3">
  <div class="col-sm-12">
    <div class="card p-3" style="background: linear-gradient(135deg, var(--global-card-bg-color), var(--global-bg-color));">
      <div class="row text-center">
        <div class="col-sm-2">
          <i class="fa-solid fa-database fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2 small"><strong>Raw Scans</strong></p>
        </div>
        <div class="col-sm-1 d-flex align-items-center justify-content-center"><i class="fa-solid fa-arrow-right"></i></div>
        <div class="col-sm-2">
          <i class="fa-solid fa-filter fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2 small"><strong>Voxelize + Denoise</strong></p>
        </div>
        <div class="col-sm-1 d-flex align-items-center justify-content-center"><i class="fa-solid fa-arrow-right"></i></div>
        <div class="col-sm-2">
          <i class="fa-solid fa-crosshairs fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2 small"><strong>FPFH Features</strong></p>
        </div>
        <div class="col-sm-1 d-flex align-items-center justify-content-center"><i class="fa-solid fa-arrow-right"></i></div>
        <div class="col-sm-2">
          <i class="fa-solid fa-object-group fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2 small"><strong>RANSAC → ICP</strong></p>
        </div>
        <div class="col-sm-1 d-flex align-items-center justify-content-center"><i class="fa-solid fa-arrow-right"></i></div>
        <div class="col-sm-2">
          <i class="fa-solid fa-cube fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2 small"><strong>Pose Graph → Merged Model</strong></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Methods

### Coarse Alignment — FPFH + RANSAC
- **FPFH descriptors** capture local 3D geometry per point
- **RANSAC** finds robust cross-scan correspondences
- **Works with low overlap** and symmetric geometries

### Fine Alignment — ICP
- **Point-to-plane ICP** for high-precision refinement
- **Colored ICP** for partial overlap / non-rigid distortions
- **Jointly optimizes** geometry + intensity

### Global Consistency — Pose Graph
- **Nodes:** scan poses; **edges:** pairwise registration transforms
- **Global optimization** minimizes accumulated drift
- **Loop closure** for drift-free multi-scan reconstruction

### Automation
- **Zero manual steps** — scan ordering and strategy fully automated
- **Quality-based failure detection** — re-estimates or omits bad scans
- **Scales to 100+ scans** via hierarchical merging

---

## Applications

- **Structural inspection** — as-built model generation at LANL
- **Autonomous navigation** — multi-session SLAM map merging
- **Digital twin** — high-fidelity geometry for simulation

---

## Tools

`Open3D` · `Python` · `NumPy` · `RANSAC` · `ICP` · `Pose Graph Optimization`

*Los Alamos National Laboratory · 2022–Present*
