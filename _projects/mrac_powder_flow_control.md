---
layout: page
title: Lyapunov-Based MRAC for Powder Flow
description: A <strong>Lyapunov-based MRAC</strong> controller that adapts to changing feeder dynamics and cancels periodic powder-flow surging — deployed on an <strong>FPGA</strong> with real stainless-steel powder.
img: assets/img/proj_mrac.jpg
hover_video: assets/video/mrac_control_preview.mp4
importance: 5
category: research
---

<div class="row mb-4">
  <div class="col-sm-12">
    <video width="100%" controls autoplay muted loop playsinline poster="{{ 'assets/img/proj_mrac.jpg' | relative_url }}" style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/mrac_control.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">Deployed on real hardware with actual stainless-steel powder — the adaptive controller (cyan) holds the set point while the uncontrolled flow (magenta) surges up and down once per feeder revolution.</p>
  </div>
</div>

---

## Overview

- **Problem:** Powder feeders for metal 3D printing (directed energy deposition, DED) **surge** — the spinning metering hardware adds a once-per-revolution oscillation to the flow rate, pushing it well above and below the target.
- **Goal:** Hold the flow rate steady at the target despite that surge, so the printed material stays uniform.
- **Approach:** A **Lyapunov-based MRAC** that continuously adapts its gains to changing feeder dynamics and cancels the periodic surge in real time.
- **Validation:** Deployed on an **FPGA** and tested with actual stainless-steel powder on a running DED machine.

---

## Why MRAC

- **A moving target:** Feeder behavior shifts with fill level, material, and humidity, so a fixed, hand-tuned controller loses accuracy as conditions change.
- **Follows a reference model:** MRAC steers the system to behave like an ideal target model, updating its gains online to track changing dynamics instead of relying on a fixed hardware model.
- **Cancels the surge:** The controller actively counteracts the periodic oscillation rather than just averaging it away.

## Robust Lyapunov-Based Design

- **Provably stable:** The adaptation law is derived from a Lyapunov function, so stability and bounded error are guaranteed by the math — not just seen in testing.
- **Hardened:** Extra safeguards prevent gain drift and maintain stability under constant surge and sensor noise.
- **Adapts online:** Gains update continuously as the controller observes the feeder's response — no offline recalibration needed when conditions change.

## Result

- **Surge suppressed:** On real data (above), the controlled flow (cyan) tracks the **6.30 g/min** target with only small residual ripple, while the uncontrolled flow (magenta) swings widely.
- **Steadier feed:** Much lower flow variation and tracking error than the uncontrolled feeder, giving a far more consistent feedstock for printing.

---

## Tools

`MATLAB / Simulink` · `Model Reference Adaptive Control (MRAC)` · `Lyapunov Stability` · `System Identification` · `Real-Time Control` · `Directed Energy Deposition`

_Smart-manufacturing controls research — Stebner Lab, Georgia Tech. Manuscript targeting IEEE Robotics and Automation Letters._
