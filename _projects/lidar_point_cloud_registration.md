---
layout: page
title: Automated 3D Point Cloud Registration for LiDAR
description: Scalable automated point cloud registration pipeline using Open3D for arbitrary multi-scan LiDAR data at LANL.
img: assets/img/proj_pointcloud.jpg
importance: 7
category: research
---

## Overview

LiDAR-based 3D scanning produces rich geometric data, but combining scans from multiple viewpoints into a single coherent model is non-trivial at scale. This project engineers a **fully automated point cloud registration pipeline** using Open3D that handles arbitrary multi-scan LiDAR data — no manual alignment, no fixed scan order requirements.

Developed at **Los Alamos National Laboratory** for large-scale structural inspection workflows.

---

## Pipeline Architecture

<div class="row mt-3">
  <div class="col-sm-12">
    <div class="card p-3" style="background: linear-gradient(135deg, var(--global-card-bg-color), var(--global-bg-color));">
      <div class="row text-center">
        <div class="col-sm-2">
          <i class="fa-solid fa-database fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2"><strong>Raw Scans</strong><br><small>Multiple LiDAR viewpoints</small></p>
        </div>
        <div class="col-sm-1 d-flex align-items-center justify-content-center">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
        <div class="col-sm-2">
          <i class="fa-solid fa-filter fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2"><strong>Preprocessing</strong><br><small>Voxelization, denoising</small></p>
        </div>
        <div class="col-sm-1 d-flex align-items-center justify-content-center">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
        <div class="col-sm-2">
          <i class="fa-solid fa-crosshairs fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2"><strong>FPFH Features</strong><br><small>Local descriptor extraction</small></p>
        </div>
        <div class="col-sm-1 d-flex align-items-center justify-content-center">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
        <div class="col-sm-2">
          <i class="fa-solid fa-object-group fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2"><strong>Registration</strong><br><small>RANSAC + ICP refinement</small></p>
        </div>
        <div class="col-sm-1 d-flex align-items-center justify-content-center">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
        <div class="col-sm-2">
          <i class="fa-solid fa-cube fa-2x" style="color: var(--global-theme-color);"></i>
          <p class="mt-2"><strong>Merged 3D Model</strong><br><small>Full structure reconstruction</small></p>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Technical Details

### Coarse Alignment: FPFH + RANSAC
We compute **Fast Point Feature Histograms (FPFH)** for each point to capture local geometry. RANSAC-based matching identifies correspondences across scan pairs, yielding robust initial alignment even for scans with minimal overlap or symmetric geometry.

### Fine Alignment: ICP Variants
Following coarse registration, we apply **Iterative Closest Point (ICP)** with a point-to-plane metric for high-precision alignment. For scans with partial overlap or non-rigid distortions, we employ **Colored ICP** which jointly optimizes geometry and intensity.

### Global Pose Graph Optimization
For multi-scan sequences, we build a **pose graph** where nodes are scan poses and edges are pairwise registration transforms. Global optimization minimizes accumulated drift across the sequence, producing loop-closed, drift-free reconstructions.

### Automation Features
- **Zero manual intervention**: Fully automated scan ordering and registration strategy selection
- **Failure detection**: Registration quality metrics trigger re-estimation or scan omission
- **Scalable**: Handles 10–100+ scan sequences via hierarchical merging

---

## Applications

<div class="row mt-3">
  <div class="col-sm-4">
    <h5>Structural Inspection</h5>
    <p>Automated 3D model generation for as-built inspection of large structures (buildings, pipelines, aircraft)</p>
  </div>
  <div class="col-sm-4">
    <h5>Autonomous Robotics</h5>
    <p>Multi-session SLAM map merging and prior map construction for robot navigation</p>
  </div>
  <div class="col-sm-4">
    <h5>Digital Twin</h5>
    <p>High-fidelity geometry capture for simulation and predictive maintenance</p>
  </div>
</div>

---

## Tools & Technologies

`Open3D` · `Python` · `NumPy` · `Point Cloud Library (PCL)` · `RANSAC` · `ICP` · `Pose Graph Optimization`

---

## Project Context

Research at **Los Alamos National Laboratory (LANL)** in collaboration with Georgia Tech (2022–Present).
