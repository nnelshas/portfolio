---
layout: page
title: Kalman Filter Sensor Fusion for DED Mass Flow
description: Heterogeneous KF fusing piezoelectric and triboelectric sensors with gain-scheduled nonlinear calibration for real-time mass flow estimation in PB-DED — MSE 3.89×10⁻⁵ g/s.
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

Powder-blown directed energy deposition (PB-DED) printers convey metal powder to a melt pool via argon gas, but mass flow rate fluctuates stochastically — causing geometric defects in finished parts. Reliable, **real-time mass flow estimation** is a prerequisite for any closed-loop control strategy.

This project proposes and implements a **Kalman filter framework** that simultaneously fuses two heterogeneous in-line sensors — a **piezoelectric impact sensor** and a **triboelectric (GS-TENG-inspired) sensor** — to estimate the stainless-steel powder mass flow rate from an Optomec PB-DED printer. Two filter architectures are compared:

| Model | States | Calibration | MSE (g/s) |
|-------|--------|-------------|-----------|
| Linear KF | 3 (ṁ, ṁ², bias) | Global quadratic | **3.89×10⁻⁵** |
| Gain-scheduled nonlinear KF | 2 (ṁ, bias) | Piecewise linear per bin | 6.59×10⁻⁵ |

---

## Experimental Setup

<div class="row mb-3">
  <div class="col-sm-12">
    <img src="{{ 'assets/img/proj_kf_setup.jpg' | relative_url }}" alt="Experimental Setup: powder hoppers A-D feeding through piezo + tribo sensors and DAQ to a mass scale and printer head" style="width:100%; border-radius:6px;">
  </div>
</div>

FE104 stainless-steel powder (30–120 µm) flows from four independently controlled hoppers through the in-line sensors and printer head; a **strain-gauge load cell (80 Hz)** provides ground-truth mass flow rate. The input *u* (auger RPM setting) was stepped through 5 levels over a 15-minute experiment (2 min per setting).

---

## Sensors

### Piezoelectric Impact Sensor

- **Physics:** Particle momentum → measurable voltage via piezoelectric transduction
- **Design:** UV-cured resin body; flow expanded at inlet for sensitivity and particle impact rate
- **Signal chain:** 50 kHz raw → moving-window RMS → Savitzky-Golay (3rd-order polynomial)
- **Calibration (linear):** *r*² = 0.912, σ² = 0.038

### Triboelectric Sensor (GS-TENG-inspired)

- **Physics:** Friction-induced charge transfer from metal particles to PTFE
- **Design:** PTFE tube wrapped in copper tape, twisted into a spiral; EMI-shielded
- **Signal chain:** Same RMS + SG-filter pipeline
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

Rather than fitting a single global quadratic, the gain-scheduled model bins sensor outputs by amplitude and fits a **separate piecewise-linear calibration per bin** — capturing saturation and low-flow nonlinearities. The measurement matrix **H** and noise **R** swap dynamically as the mass flow crosses bin boundaries.

**Key finding:** The linear filter (lower MSE = 3.89×10⁻⁵ vs 6.59×10⁻⁵) outperforms on MSE due to the larger calibration dataset, but the nonlinear filter shows **zero residual bias** — making it more suitable for a feedback-control loop that would otherwise require an integral term to correct drift.

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

Both filters closely track ground truth across all 5 auger settings (0.02–0.08 g/s). The path forward extends this framework to **4 independent sensors** (piezoelectric, triboelectric, acoustic, capacitive) for **multi-material mass flow estimation** — independently estimating each material in a blended powder flow.

---

## Tools

`Python` · `NumPy` · `SciPy` · `Kalman Filter` · `Gain Scheduling` · `Savitzky-Golay` · `Polynomial Regression` · `MATLAB` (figure generation)

_AE 6505: Kalman Filtering — Georgia Tech · Stebner Lab_
