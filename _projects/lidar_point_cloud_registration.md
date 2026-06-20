---
layout: page
title: Automated 3D Point Cloud Registration
description: An automated pipeline that precisely aligns multi-view <strong>LiDAR</strong> point clouds with no manual intervention — <strong>FPFH features</strong> → <strong>RANSAC</strong> → <strong>ICP</strong> refinement.
img: assets/img/proj_pointcloud.jpg
importance: 6
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
          <p class="mt-2 small"><strong>Aligned Point Clouds</strong></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Methods

### Coarse Alignment — FPFH + RANSAC

- **FPFH descriptors** summarize the local 3D shape around each point
- **RANSAC** matches points across scans while rejecting bad matches
- **Works even with low overlap** and symmetric shapes

### Fine Alignment — ICP

- **Point-to-plane ICP** refines the alignment to high precision
- **Colored ICP** handles partial overlap and slight distortions
- **Uses both shape and color** together

### Automation

- **Zero manual steps** — scan ordering and strategy are fully automated
- **Catches bad scans** automatically and re-aligns or drops them
- **Scales to 100+ scans** via hierarchical merging

---

## Applications

- **Structural inspection** — as-built model generation at LANL
- **Autonomous navigation** — multi-session SLAM map merging
- **Digital twin** — high-fidelity geometry for simulation

---

## Tools

`Open3D` · `Python` · `NumPy` · `RANSAC` · `ICP` · `Pose Graph Optimization`

_Los Alamos National Laboratory · 2022–Present_
