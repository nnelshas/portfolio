---
layout: page
title: Lyapunov-Based MRAC for Powder Flow
description: Robust model reference adaptive control that suppresses rotary harmonic instabilities in directed-energy-deposition powder flow — validated on real experimental data.
img: assets/img/proj_mrac.jpg
hover_video: assets/video/mrac_control_preview.mp4
importance: 4
category: research
---

<div class="row mb-4">
  <div class="col-sm-12">
    <video width="100%" controls autoplay muted loop playsinline poster="{{ 'assets/img/proj_mrac.jpg' | relative_url }}" style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/mrac_control.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">Real experimental data — the adaptive controller (cyan) holds set point while the uncontrolled flow (magenta) oscillates with a large rotary harmonic.</p>
  </div>
</div>

---

## Overview

- **Problem:** Powder feeders for directed energy deposition (DED) exhibit a strong **rotary harmonic instability** — the rotating metering hardware injects a periodic oscillation into the mass flow rate, swinging it well above and below the commanded set point.
- **Goal:** Hold the powder mass flow rate at its set point despite this disturbance, so deposition stays uniform.
- **Approach:** A **robust, Lyapunov-based model reference adaptive controller (MRAC)** that adapts online to the feeder dynamics and rejects the harmonic disturbance.
- **Validation:** Demonstrated on **real experimental powder-flow data**, not just simulation.

---

## Why MRAC

- **Uncertain, drifting plant:** Powder-feeder dynamics shift with fill level, material, and humidity — hand-tuned fixed-gain control degrades as conditions change.
- **Reference-model tracking:** MRAC drives the system to follow a well-behaved reference model, adapting its gains online instead of relying on a fixed plant model.
- **Disturbance rejection:** The adaptive law actively counteracts the periodic rotary harmonic rather than just averaging it out.

## Robust Lyapunov-Based Design

- **Lyapunov-derived adaptation:** The parameter update law is derived from a Lyapunov function, so closed-loop stability and bounded tracking error are guaranteed by construction, not just observed empirically.
- **Robustness modifications:** Adds robustness to the adaptive law to prevent parameter drift and stay stable under the persistent harmonic disturbance and measurement noise.
- **Online adaptation:** Gains converge in real time as the controller observes the feeder's response — no offline re-identification needed when conditions change.

## Result

- **Suppressed oscillation:** As shown above on real data, the controlled flow (cyan) tracks the **6.30 g/min** set point with a small residual amplitude, while the uncontrolled flow (magenta) swings through a large rotary harmonic.
- **Tighter tracking:** Substantially reduced flow instability and tracking error versus the uncontrolled feeder, giving a far steadier feedstock for deposition.

---

## Tools

`MATLAB / Simulink` · `Model Reference Adaptive Control (MRAC)` · `Lyapunov Stability` · `System Identification` · `Real-Time Control` · `Directed Energy Deposition`

_Smart-manufacturing controls research — Stebner Lab, Georgia Tech. Manuscript targeting IEEE Robotics and Automation Letters._
