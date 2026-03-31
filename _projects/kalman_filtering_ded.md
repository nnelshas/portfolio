---
layout: page
title: Kalman Filter Sensor Fusion for DED Mass Flow
description: EKF with gain-scheduled nonlinear calibration fusing piezoelectric and triboelectric sensors for real-time mass flow estimation in PB-DED.
img: assets/img/proj_sensor_fusion.jpg
importance: 3
category: research
---

## Overview

- **Goal:** Real-time mass flow rate estimation for powder-blown DED
- **Sensors fused:** Piezoelectric impact sensor + triboelectric (GS-TENG-inspired) sensor
- **Two models compared:** Linear KF vs. gain-scheduled nonlinear KF
- **Application:** State feedback for closed-loop DED mass flow control

---

## Sensors

### Piezoelectric Sensor
- **Principle:** Particle momentum → measurable voltage via piezoelectric transduction
- **Design:** UV-cured resin body; flow expanded at inlet for sensitivity
- **Signal processing:** Moving-window RMS → Savitzky-Golay (3rd-order local polynomial)
- **Calibration:** 2nd-order polynomial (linear) or piecewise 1st-order (gain-scheduled)

### Triboelectric Sensor
- **Principle:** Friction-induced charge transfer from metal particles to PTFE
- **Design:** PTFE tube wrapped in copper tape, twisted into spiral; shielded against EMI
- **Signal processing:** Same moving-window RMS + Savitzky-Golay pipeline
- **Calibration:** Polynomial fit with uncertainty from residual distribution

### Ground Truth
- **Strain-gauge load cell** — 80 Hz, moving-average filtered, differentiated for mass flow rate

---

## Kalman Filter Design

### Linear Model
- **3 states:** Mass flow rate + squared term + bias (to linearize quadratic calibration)
- **Dynamics:** First-order model from Optomec machine setting calibration
- **Measurement model:** Quadratic calibration coefficients map states → sensor voltage
- **Noise:** Process noise Q from literature; measurement covariance R diagonal (independent sensors)

### Nonlinear Gain-Scheduled Model
- **Same 3 states** — but measurement model is piecewise linear per amplitude bin
- **Gain scheduling:** Sensor output binned; separate linear fit per bin → captures nonlinearity
- **Effect:** Better calibration at saturation and low-flow regimes

---

## Key Takeaways

- **Heterogeneous fusion:** Two sensors with different physics, sampling rates, and uncertainties fused in one unified estimator
- **Uncertainty-aware:** Measurement covariance R populated from calibration residuals — no arbitrary tuning
- **Gain scheduling improves fit** at nonlinear operating regimes vs. global quadratic model
- **Generalizes to multi-material:** Independent sensors could be assigned per material for compositional estimation

---

## Tools

`Python` · `NumPy` · `SciPy` · `Kalman Filter` · `Gain Scheduling` · `Savitzky-Golay` · `Polynomial Regression`

*AE 6505: Kalman Filtering — Georgia Tech*
