---
layout: page
title: Adaptive Mass Flow Control for Powder-Blown Directed Energy Deposition
description: MRAC with Lyapunov-stable parameter adaptation for precise feedforward control of stochastic powder transport dynamics with large time delays — 70% fluctuation mitigation demonstrated.
img: assets/img/proj_rl.jpg
importance: 2
category: research
related_publications: false
---

## Overview

**Powder-Blown Directed Energy Deposition (PB-DED)** is an advanced metal additive manufacturing process in which a laser melts a local melt pool while a carrier gas delivers metal powder. The composition and quality of the deposited part depend critically on precise, real-time control of powder mass flow — yet current open-loop approaches (RPM setpoints) are unreliable, exhibiting significant drift, hysteresis, and periodic instabilities.

This project develops a **closed-loop adaptive feedforward mass flow controller** combining physics-based system identification, optimal control law inversion, and **Model Reference Adaptive Control (MRAC) with Lyapunov-stable parameter adaptation** — all while contending with transport delays of tens of seconds.

> This is the core control contribution of my PhD thesis: *"Multi-material Mass Flow Monitoring and Control for Powder-Blown Directed Energy Deposition"* — Georgia Tech, advised by Dr. Aaron Stebner.

---

## The Control Problem

<div class="row mt-3">
  <div class="col-sm-6">
    <h4>Why Standard Control Fails</h4>
    <ul>
      <li><strong>Large transport delay</strong>: 10–60+ seconds from RPM command to flow measurement</li>
      <li><strong>Nonlinear memory effects</strong>: Powder packing creates hysteresis — RPM→flow is not invertible without history</li>
      <li><strong>RPM-tied periodic instabilities</strong>: Rotary feeder geometry induces oscillations at RPM-dependent frequencies</li>
      <li><strong>Time-varying parameters</strong>: Powder properties, humidity, and wear cause slow drift in dynamics</li>
      <li><strong>Smith Predictor instability</strong>: Classic delay-compensation approaches fail due to nonlinearity</li>
    </ul>
  </div>
  <div class="col-sm-6">
    <h4>Controller Requirements</h4>
    <ul>
      <li>Mitigate periodic instabilities → <strong>precise</strong> mass flow</li>
      <li>Compensate drift and hysteresis → <strong>accurate</strong> mass flow</li>
      <li>Handle large, variable transport delay</li>
      <li>Adapt to slowly time-varying system parameters</li>
      <li>Real-time execution on embedded hardware (FPGA)</li>
    </ul>
  </div>
</div>

---

## System Identification

The powder transport dynamics are modeled as:

$$\dot{m}(t) = f\bigl(\omega(t),\; a(\omega),\; b(\omega)\bigr)$$

where $$\omega$$ is motor RPM (control input), and $$a(\omega)$$, $$b(\omega)$$ are RPM-dependent parameters governing the oscillation amplitude and frequency. These are identified via **least-squares regression** on calibration experiments:

<div class="row mt-2">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-top: 3px solid var(--global-theme-color);">
      <h5 style="color: var(--global-theme-color);">Oscillation Frequency</h5>
      <p class="small">Identified as a nonlinear function of RPM — confirmed experimentally across 1–7 RPM range</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-top: 3px solid var(--global-theme-color);">
      <h5 style="color: var(--global-theme-color);">Oscillation Amplitude</h5>
      <p class="small">Parameterized by RPM and material-dependent constants — calibrated per powder type</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-top: 3px solid var(--global-theme-color);">
      <h5 style="color: var(--global-theme-color);">Transport Delay</h5>
      <p class="small">Measured separately per operating condition — incorporated into internal model</p>
    </div>
  </div>
</div>

---

## Feedforward Control Law

Given the identified dynamics model, the **feedforward control law** is derived analytically by inversion: given a desired mass flow profile $$\dot{m}^*(t)$$, solve for the RPM command $$\omega^*(t)$$ that produces it:

$$\omega^*(t) = f^{-1}\bigl(\dot{m}^*(t),\; \hat{a}(t),\; \hat{b}(t)\bigr)$$

where $$\hat{a}(t)$$ and $$\hat{b}(t)$$ are real-time parameter estimates from the adaptive update law.

---

## MRAC with Lyapunov Adaptation

Parameters $$a$$ and $$b$$ vary slowly over time due to powder property changes, wear, and environmental factors. A **Model Reference Adaptive Control (MRAC)** scheme updates these estimates in real-time using delayed process feedback:

### Architecture

<div class="card p-3 mt-3" style="background: var(--global-bg-color);">
  <div class="row text-center align-items-center">
    <div class="col-sm-2">
      <i class="fa-solid fa-bullseye fa-2x" style="color: var(--global-theme-color);"></i>
      <p class="small mt-1"><strong>Reference Model</strong><br>Desired closed-loop behavior</p>
    </div>
    <div class="col-sm-1"><i class="fa-solid fa-arrow-right"></i></div>
    <div class="col-sm-2">
      <i class="fa-solid fa-clock fa-2x" style="color: var(--global-theme-color);"></i>
      <p class="small mt-1"><strong>Smith Predictor</strong><br>Internal model for delay compensation</p>
    </div>
    <div class="col-sm-1"><i class="fa-solid fa-arrow-right"></i></div>
    <div class="col-sm-2">
      <i class="fa-solid fa-sliders fa-2x" style="color: var(--global-theme-color);"></i>
      <p class="small mt-1"><strong>Feedforward Law</strong><br>Optimal RPM command</p>
    </div>
    <div class="col-sm-1"><i class="fa-solid fa-arrow-right"></i></div>
    <div class="col-sm-2">
      <i class="fa-solid fa-cogs fa-2x" style="color: var(--global-theme-color);"></i>
      <p class="small mt-1"><strong>PB-DED System</strong><br>Powder hopper + transport</p>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col text-center">
      <i class="fa-solid fa-rotate-left fa-lg" style="color: var(--global-theme-color);"></i>
      <span class="small ml-2">Delayed mass flow feedback → Lyapunov parameter adaptation</span>
    </div>
  </div>
</div>

### Lyapunov Stability Derivation

The adaptation law is derived using **Lyapunov's direct method** to guarantee convergence of parameter estimates $$\hat{a}(t), \hat{b}(t) \to a^*, b^*$$:

**Step 1 — Define error state**: Let $$\tilde{a} = \hat{a} - a^*$$ and $$\tilde{b} = \hat{b} - b^*$$.

**Step 2 — Choose Lyapunov candidate**:
$$V(\tilde{a}, \tilde{b}) = \frac{1}{2\gamma_a}\tilde{a}^2 + \frac{1}{2\gamma_b}\tilde{b}^2 \quad > 0$$

**Step 3 — Derive adaptation law** such that $$\dot{V} \leq 0$$:

$$\dot{\hat{a}} = -\gamma_a \, e(t) \cdot \frac{\partial \dot{m}}{\partial a}\bigg|_{\hat{a},\hat{b}}$$

$$\dot{\hat{b}} = -\gamma_b \, e(t) \cdot \frac{\partial \dot{m}}{\partial b}\bigg|_{\hat{a},\hat{b}}$$

where $$e(t) = \dot{m}(t) - \hat{\dot{m}}(t)$$ is the prediction error from the internal model, and $$\gamma_a, \gamma_b > 0$$ are adaptation gains.

**Result**: The Lyapunov function is non-increasing along trajectories, providing **provable stability guarantees** even under the large transport delays present in PB-DED.

---

## Results

<div class="row mt-3">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid #28a745;">
      <h2 style="color: #28a745; font-size: 2.5rem; margin: 0;">70%</h2>
      <p>Fluctuation mitigation demonstrated in preliminary feedforward implementation</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">10–60s</h2>
      <p>Transport delay handled by internal model — standard feedback approaches fail at this scale</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2rem; margin: 0;">FPGA</h2>
      <p>Real-time embedded implementation — sub-millisecond control loop execution</p>
    </div>
  </div>
</div>

---

## Relevance to Autonomous Systems

The control challenges in PB-DED map directly to problems in robotics and autonomous vehicles:

| PB-DED Challenge | AV / Robotics Analog |
|---|---|
| Large, variable transport delay | Sensor-actuator latency in high-speed maneuvers |
| Nonlinear powder transport dynamics | Tire–road interaction, actuator nonlinearities |
| Slow parameter drift (wear, humidity) | Sensor calibration drift, terrain/weather changes |
| Multi-physics sensor fusion | IMU + GPS + LiDAR fusion for localization |
| Lyapunov-stable adaptation | Provably stable adaptive cruise / lane control |

The **MRAC + Lyapunov framework** developed here provides stability-guaranteed real-time adaptation — a foundation directly applicable to any system requiring robust control under uncertainty.

---

## Planned Publications

| Paper | Target Venue | Status |
|---|---|---|
| Real-time adaptive feedforward powder flow control for DED | *Additive Manufacturing* | Targeting Nov 2026 |

**Patent**: In preparation (Georgia Tech)

---

## Tools & Technologies

`MATLAB/Simulink` · `C++` · `FPGA (LabVIEW)` · `Python (NumPy, SciPy)` · `ROS2` · `Real-time DAQ (>1 kHz)` · `Lyapunov Stability Analysis` · `MRAC` · `System Identification`

---

## Project Context

PhD thesis research at **Stebner Lab, Georgia Institute of Technology** (2022–Present), advised by **Dr. Aaron Stebner**. NSF GRFP supported.
