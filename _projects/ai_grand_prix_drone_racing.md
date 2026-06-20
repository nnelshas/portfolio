---
layout: page
title: Autonomous FPV Drone Racing
description: SO(3) geometric control, one-shot gate detection, and a Kalman filter for on-the-fly gate localization — a full autonomy stack for high-speed FPV drone racing.
img: assets/img/proj_drone_racing.jpg
hover_video: assets/video/drone_racing_preview.mp4
importance: 1
category: research
---

<div class="row mb-4">
  <div class="col-sm-12">
    <video width="100%" controls autoplay muted loop playsinline poster="{{ 'assets/img/proj_drone_racing.jpg' | relative_url }}" style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/drone_racing.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">FPV onboard view — the autonomy stack flying a simulated AI Grand Prix course in ACRO mode.</p>
  </div>
</div>

---

## Overview

A complete perception-and-control stack for **high-speed FPV drone racing** in the AI Grand Prix simulator. With no map of the course, the drone has to **spot** each gate, **work out where it is**, and **fly an aggressive path** through it — all in real time.

The stack has three tightly coupled pieces:

<div class="row mt-3 mb-3">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">SO(3)</h2>
      <p class="mb-0"><strong>Geometric controller on the rotation manifold</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">1-shot</h2>
      <p class="mb-0"><strong>Single-pass gate detection per frame</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">KF</h2>
      <p class="mb-0"><strong>On-the-fly gate position estimation</strong></p>
    </div>
  </div>
</div>

---

## SO(3) Geometric Controller

- **Control on the rotation manifold:** Tracks orientation directly on the rotation group **SO(3)**, avoiding the gimbal-lock and wind-up problems of Euler-angle controllers — which matters at the steep bank and pitch angles of racing.
- **Geometric tracking law:** Measures orientation and angular-velocity error on the manifold itself, producing thrust and torque commands that stay valid through near-aerobatic maneuvers.
- **High-speed agility:** Tuned for fast, time-optimal paths between gates, not gentle hover-to-hover moves.
- **Cascaded design:** An outer position/velocity loop sets the desired thrust direction; the inner SO(3) attitude loop rotates the drone to match it.

## One-Shot Gate Detection

- **One pass per frame:** A single-shot detector finds gates directly in the onboard camera image — no slow multi-stage pipeline — keeping latency low enough for high-speed flight.
- **Robust to motion:** Still finds gates through motion blur, skewed perspective, and partial views as the drone banks and rolls through the course.
- **Feeds the estimator:** Each detection is a measurement of where the next gate sits in the image, which the filter turns into a real-world position.

## Kalman Filter Gate Localization

- **Locates gates on the fly:** A Kalman filter combines successive detections with the drone's own motion to recover each gate's 3-D position — the course is discovered mid-flight, not given in advance.
- **Noise-aware fusion:** Treats each detection as a noisy measurement, smoothing jittery per-frame readings into a stable target the controller can aim for.
- **Closes the loop:** The filtered gate estimate becomes the target for the trajectory and SO(3) controller, tying perception and control together through one consistent estimate.

---

## How It Fits Together

1. **See** — the one-shot detector finds gates in the current FPV frame.
2. **Estimate** — the Kalman filter fuses detections over time into a metric gate position.
3. **Plan & Track** — an aggressive trajectory toward the estimated gate is tracked by the SO(3) geometric controller.
4. **Repeat** — the loop runs continuously at high speed as the drone races gate-to-gate.

---

## Tools

`Python` · `SO(3) Geometric Control` · `Computer Vision` · `One-Shot Detection` · `Kalman Filter` · `State Estimation` · `Quadrotor Dynamics` · `FPV Simulation`

_Autonomous drone racing — AI Grand Prix simulator_
