---
layout: page
title: Kalman Filter Sensor Fusion for DED Mass Flow
description: A Kalman filter that fuses two different sensors to estimate metal-powder flow rate in real time during 3D printing — mean squared error 3.89×10⁻⁵ g/s.
img: assets/img/proj_sensor_fusion.jpg
importance: 5
category: research
---

<div class="row mb-4">
  <div class="col-sm-12">
    <div class="card p-0 overflow-hidden">
      <img src="{{ 'assets/img/proj_sensor_fusion.jpg' | relative_url }}" alt="Linear Kalman Filter Estimation vs Ground Truth — MSE = 3.89e-05 g/s across 5 auger RPM settings" style="width:100%; display:block;">
    </div>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">Figure 6 from the report: Linear KF estimate (blue dashed) vs. load-cell ground truth (red) across five auger settings — MSE = 3.89×10⁻⁵ g/s.</p>
  </div>
</div>

---

## Overview

Metal 3D printers of this type (powder-blown directed energy deposition, PB-DED) blow metal powder into a melt pool using argon gas. The powder flow rate wanders unpredictably, which causes shape defects in the finished part — and controlling it requires first **measuring it reliably and in real time**.

This project builds a **Kalman filter** that fuses two different in-line sensors — a **piezoelectric impact sensor** and a **triboelectric sensor** — to estimate the stainless-steel powder flow rate on an Optomec printer. Two filter designs are compared:

| Model                       | States          | Calibration              | MSE (g/s)     |
| --------------------------- | --------------- | ------------------------ | ------------- |
| Linear KF                   | 3 (ṁ, ṁ², bias) | Global quadratic         | **3.89×10⁻⁵** |
| Gain-scheduled nonlinear KF | 2 (ṁ, bias)     | Piecewise linear per bin | 6.59×10⁻⁵     |

---

## Experimental Setup

<div class="row mb-3">
  <div class="col-sm-12">
    <img src="{{ 'assets/img/proj_kf_setup.jpg' | relative_url }}" alt="Experimental Setup: powder hoppers A-D feeding through piezo + tribo sensors and DAQ to a mass scale and printer head" style="width:100%; border-radius:6px;">
  </div>
</div>

FE104 stainless-steel powder (30–120 µm) flows from four independently controlled hoppers through the sensors and printer head; a **load cell (80 Hz)** provides the ground-truth flow rate for comparison. The auger speed was stepped through 5 settings over a 15-minute run (2 minutes each).

---

## Sensors

### Piezoelectric Impact Sensor

- **How it works:** powder particles strike the sensor, and each impact generates a voltage (piezoelectric effect)
- **Design:** UV-cured resin body; the inlet widens the flow to raise sensitivity and impact rate
- **Signal processing:** 50 kHz raw → moving-window RMS → Savitzky-Golay (3rd-order polynomial)
- **Calibration (linear):** *r*² = 0.912, σ² = 0.038

### Triboelectric Sensor (GS-TENG-inspired)

- **How it works:** friction transfers electric charge from the metal particles to a PTFE (Teflon) surface
- **Design:** PTFE tube wrapped in copper tape, twisted into a spiral; EMI-shielded
- **Signal processing:** same RMS + Savitzky-Golay pipeline
- **Calibration (linear):** *r*² = 0.783, σ² = 0.152

---

## Kalman Filter Designs

### Linear Model

The quadratic sensor calibration introduces nonlinearity. To handle this within a **linear KF**, three states are tracked:

$$\mathbf{x} = \begin{bmatrix} \dot{m}^2 \\ \dot{m} \\ 1 \end{bmatrix}$$

The third state (constant bias 1) linearizes the quadratic calibration term. Measurement covariance **R** is populated directly from calibration residual variances — no hand-tuning:

$$R = \begin{bmatrix} \sigma_P^2 & 0 \\ 0 & \sigma_T^2 \end{bmatrix} = \begin{bmatrix} 0.038 & 0 \\ 0 & 0.152 \end{bmatrix}$$

Process noise **Q** = 0.0125 g/s from prior literature (Whiting et al.).

### Gain-Scheduled Nonlinear Model

Instead of one global quadratic fit, this model splits the sensor range into bins and fits a **separate straight-line calibration in each** — capturing saturation and low-flow effects. The measurement matrix **H** and noise **R** switch automatically as the flow crosses bin boundaries.

**Key finding:** The linear filter wins on raw error (MSE 3.89×10⁻⁵ vs 6.59×10⁻⁵), helped by a larger calibration dataset — but the gain-scheduled filter has **zero residual bias**, making it the better fit for a control loop, which would otherwise need an extra integral term to cancel that drift.

---

## Results

<div class="row mt-2 mb-3">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2rem; margin: 0;">3.89×10⁻⁵</h2>
      <p class="mb-0 small"><strong>MSE (g/s) — Linear KF</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2rem; margin: 0;">0-bias</h2>
      <p class="mb-0 small"><strong>Residuals — Gain-scheduled KF</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2rem; margin: 0;">2→4</h2>
      <p class="mb-0 small"><strong>Sensors fused (path to multi-material)</strong></p>
    </div>
  </div>
</div>

Both filters closely track the ground truth across all 5 settings (0.02–0.08 g/s). Next, the framework extends to **4 sensors** (piezoelectric, triboelectric, acoustic, capacitive) for **multi-material flow** — estimating each material separately within a blended powder stream.

---

## Tools

`Python` · `NumPy` · `SciPy` · `Kalman Filter` · `Gain Scheduling` · `Savitzky-Golay` · `Polynomial Regression` · `MATLAB` (figure generation)

_AE 6505: Kalman Filtering — Georgia Tech · Stebner Lab_
