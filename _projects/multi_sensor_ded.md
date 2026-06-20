---
layout: page
title: Multi-Modal Powder-Flow Sensors for Metal 3D Printing
description: "Three novel <strong>in-line sensors</strong> (piezoelectric, optical, triboelectric) benchmarked against ultrasonic baseline for DED powder flow — fused with a <strong>Kalman filter</strong> for real-time estimation."
img: assets/img/proj_multisensor_thumb.jpg
importance: 5
category: research
---

<div class="row mb-4">
  <div class="col-sm-12">
    <div class="card p-0 overflow-hidden">
      <img src="{{ 'assets/img/proj_multisensor_thumb.jpg' | relative_url }}" alt="Multi-modal sensor array: (a) ultrasonic, (b) triboelectric, (c) piezoelectric, (d) optical reflectance" style="width:100%; display:block;">
    </div>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">Figure 1 from the manuscript: (a) ultrasonic baseline, (b) triboelectric, (c) piezoelectric, (d) optical reflectance sensor.</p>
  </div>
</div>

---

## Overview

Powder-blown directed energy deposition (PB-DED) blows metal powder into a laser melt pool to build parts layer by layer. The powder flow rate must stay stable and well-characterized — yet commercial systems still have no real-time in-line measurement. This work designs, builds, and benchmarks **three novel in-line sensors** and compares them against an ultrasonic baseline that represents the current state of the art:

| Sensor                | R²   | NRMSE      | Cost     |
| --------------------- | ---- | ---------- | -------- |
| Ultrasonic (baseline) | —    | —          | ~$1,000  |
| Piezoelectric         | >0.9 | 4.00–6.01% | ~$5      |
| Optical reflectance   | >0.9 | 4.00–6.01% | moderate |
| Triboelectric         | >0.9 | 4.00–6.01% | low      |

All sensors use **strictly causal** signal processing (RMS → Savitzky–Golay), making them deployable in a real-time control loop.

---

## Sensors

### Piezoelectric

- Metal powder particles strike a commercial resonant buzzer; each impact generates a voltage via the piezoelectric effect
- **$5 cost vs. $1,000 for ultrasonic** — 90× lower digitized data rate (22.2 kHz vs. 2,000 kHz)
- UV-cured resin housing widens the flow path to increase impact rate and sensitivity
- Best suited to low-cost fault monitoring across a distributed DED system

### Optical Reflectance

- First in-line reflection-based optical sensor demonstrated for PB-DED
- Fiber probe illuminates the powder stream; reflected light intensity tracks concentration
- **Highest SNR of all sensors tested** — clearly resolves hopper-induced oscillations at flow rates as low as 4 g/min
- Multi-material extension is natural: paired with a spectrometer, spectral reflectance distinguishes powder species

### Triboelectric (GS-TENG)

- Powder particles rub a PTFE surface, transferring static charge; the current encodes concentration
- PTFE tube wrapped in copper tape, EMI-shielded, non-intrusive
- Low cost and near-linear calibration response; elevated noise floor at higher flow rates
- Inspired by gas–solid triboelectric nanogenerator (GS-TENG) work in pneumatic conveying

---

## Signal Processing & Calibration

All pipelines are **strictly causal**: moving-window RMS extracts an amplitude envelope, then a Savitzky–Golay smoother (3rd-order polynomial) reduces noise without look-ahead. Calibration uses polynomial regression against a mass-scale ground-truth reference; quality is reported via R², NRMSE, and MAPE. A cross-correlation alignment step removes pneumatic transport lag before fitting.

---

## Results

- **Three sensors each achieve R² > 0.9 and NRMSE 4–6%** across a 0.4–11 g/min operating range
- **Piezoelectric matches ultrasonic-level accuracy at 90× lower data rate and ~200× lower cost**
- **Optical reflectance resolves fine flow oscillations** invisible to lower-SNR sensors
- Together the three form a complementary suite: from low-cost fault monitoring (piezo) to control-ready high-fidelity measurement (optical)

---

## Tools

`Python` · `NumPy` · `SciPy` · `LabVIEW` · `Analog Discovery Pro 3450` · `Savitzky–Golay` · `Polynomial Regression` · `Causal Signal Processing`

_Stebner Lab, Georgia Tech · Manuscript in preparation_

---

## Addendum: Kalman Filter Sensor Fusion

With multiple in-line sensors measuring the same flow, a natural next step is fusing them to improve estimation accuracy. A follow-on project built a **Kalman filter** (not an EKF — the system dynamics are linear; the nonlinearity enters only through the sensor calibration model) that fuses the **piezoelectric** and **triboelectric** sensors to produce a single flow-rate estimate.

<div class="row mb-4">
  <div class="col-sm-12">
    <div class="card p-0 overflow-hidden">
      <img src="{{ 'assets/img/proj_sensor_fusion.jpg' | relative_url }}" alt="Linear Kalman Filter estimate vs ground truth across 5 auger settings" style="width:100%; display:block;">
    </div>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">Linear KF estimate (blue dashed) vs. load-cell ground truth (red) across five auger settings — MSE = 3.89×10⁻⁵ g/s.</p>
  </div>
</div>

Two filter designs were compared:

| Model             | States          | Calibration              | MSE (g/s)     |
| ----------------- | --------------- | ------------------------ | ------------- |
| Linear KF         | 3 (ṁ², ṁ, bias) | Global quadratic         | **3.89×10⁻⁵** |
| Gain-scheduled KF | 2 (ṁ, bias)     | Piecewise linear per bin | 6.59×10⁻⁵     |

**Linear KF:** The quadratic sensor calibration is linearized by augmenting the state with ṁ² and a constant bias term, keeping the filter structure fully linear. Measurement noise **R** is populated directly from calibration residual variances — no hand-tuning required.

**Gain-scheduled KF:** Splits the flow range into bins and fits a separate linear calibration in each; **H** and **R** switch automatically at bin boundaries. Lower raw MSE is outweighed by a residual bias that would require an integral term in a control loop — the linear KF is a better drop-in for the MRAC controller.

**Key finding:** The linear KF achieves the lower MSE (3.89×10⁻⁵ vs. 6.59×10⁻⁵ g/s), while the gain-scheduled KF has zero residual bias, making it preferable for a downstream control loop. The framework scales naturally to 4 sensors (adding acoustic and capacitive modalities) for multi-material flow estimation.

_AE 6505: Kalman Filtering — Georgia Tech · Stebner Lab_
