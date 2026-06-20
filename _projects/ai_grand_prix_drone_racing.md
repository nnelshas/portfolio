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

A complete perception-and-control autonomy stack for **high-speed FPV drone racing** in the AI Grand Prix simulator. The quadcopter flies aggressive, agile trajectories through a sequence of gates with no prior map — it must **see** each gate, **estimate where it is**, and **track an aggressive trajectory** to fly through it, all in real time.

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

- **Configuration-space control:** Attitude is tracked directly on the rotation group **SO(3)**, avoiding the singularities and unwinding of Euler-angle controllers — essential for the large bank/pitch angles seen in racing.
- **Geometric tracking law:** Computes attitude and angular-velocity errors intrinsically on the manifold, producing thrust and moment commands that hold up under near-aerobatic maneuvers.
- **High-speed agility:** Tuned for aggressive, time-optimal trajectories between gates rather than gentle hover-to-hover motion.
- **Cascaded structure:** An outer position/velocity loop produces the desired thrust direction; the inner SO(3) attitude loop drives the body frame to match it.

## One-Shot Gate Detection

- **Single forward pass per frame:** A one-shot computer-vision detector localizes racing gates directly in the onboard FPV image — no multi-stage proposal pipeline — keeping latency low enough for high-speed flight.
- **Robust to motion:** Detects gates under motion blur, perspective distortion, and partial visibility as the drone banks and rolls through the course.
- **Feeds the estimator:** Each detection becomes a measurement of where the next gate appears in the image, which the filter fuses into a metric position estimate.

## Kalman Filter Gate Localization

- **Estimates gate poses on the fly:** A Kalman filter fuses successive one-shot detections with the drone's own motion to recover each gate's 3-D position — the course is discovered in flight, not handed in advance.
- **Noise-aware fusion:** Treats each detection as a noisy bearing/position measurement, smoothing jittery per-frame detections into a stable target the controller can aim for.
- **Closes the loop:** The filtered gate estimate becomes the reference for the trajectory and SO(3) controller, so perception error and control are coupled through one consistent state estimate.

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
