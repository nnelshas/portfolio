---
layout: page
title: Multi-Modal Powder-Flow Sensors
description: "Three novel <strong>in-line sensors</strong> (piezoelectric, optical, triboelectric) benchmarked against an ultrasonic baseline for metal-3D-printing powder flow — all hit <strong>R² > 0.9</strong> at a <strong>90× lower data rate</strong>, then fused with a <strong>Kalman filter</strong>."
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

Powder-blown directed energy deposition (PB-DED) pneumatically conveys metal powder into a laser melt pool to build parts layer by layer. A stable, well-characterized powder mass-flow rate is essential for part quality — yet commercial systems still have **no real-time in-line measurement**. This work designs, builds, and benchmarks **three novel in-line mass-flow sensors** against an ultrasonic baseline (replicated from Whiting et al.) on a common platform, all calibrated against the same mass-scale reference over a **0.4–11 g/min** range using **strictly causal** pipelines suitable for real-time control.

The headline result: each novel sensor matches ultrasonic-level average-flow accuracy (**R² > 0.9**) while sampling at a **90× lower digitized data rate** (22.2 kHz vs. 2,000 kHz). There is no single "best" sensor — each occupies a different point in the cost / fidelity / latency design space.

| Sensor                | Cost   | Data rate | R²    | NRMSE | Resolves oscillations? |
| --------------------- | ------ | --------- | ----- | ----- | ---------------------- |
| Ultrasonic (baseline) | $1,000 | 2,000 kHz | 0.961 | 3.70% | 6–7 RPM                |
| **Optical**           | $2,000 | 22.2 kHz  | 0.956 | 4.00% | **3–7 RPM (best SNR)** |
| **Piezoelectric**     | **$5** | 22.2 kHz  | 0.953 | 4.21% | none                   |
| **Triboelectric**     | **$5** | 22.2 kHz  | 0.932 | 6.01% | none                   |

---

## Sensors

### Piezoelectric

- A commercial **$5 resonant buzzer** (piezoelectric ceramic on a brass disk); powder strikes the disk at a 22.5° angle and each impact generates a voltage
- **Matches the $1,000 ultrasonic baseline's average-flow accuracy** (R² 0.953) at 1/200th the cost and a 90× lower data rate
- Compact and **self-powered — needs no pre-amplifier** — making it a strong candidate for distributed fault monitoring across space-constrained powder branches
- Bandpass-filtered around its (housing-shifted) ~6–9 kHz resonance; does not resolve fine hopper oscillations but tracks average flow accurately

### Optical Reflectance

- First in-line **reflection-based optical** mass-flow sensor demonstrated for PB-DED: a seven-fiber bundle illuminates the stream and collects backscatter through a black-nickel-coated, sapphire-windowed flow cell
- **Highest signal-to-noise ratio of every modality tested** — the only sensor to resolve hopper-induced flow oscillations down to **3 RPM**
- Near-linear calibration response; the strongest candidate for future oscillation-mitigation **closed-loop control**
- Naturally extends to multi-material sensing (spectral reflectance) and particle velocity (dual-sensor time-of-flight)

### Triboelectric (GS-TENG)

- Powder rubbing a **PTFE dielectric over a copper electrode** transfers static charge, transducing flow via electrostatics rather than kinetic energy — a **$5**, EMI-shielded, GS-TENG-inspired design
- **Linear, low-cost response** with the fastest filtering latency (11.66 s), making it a complementary modality for sensor fusion
- Highest noise of the four and approaches **saturation near 10 g/min** — the main target for future signal-conditioning work

---

## Signal Processing & Calibration

Every pipeline is **strictly causal** — depending only on present and past samples — so it can run in a real-time loop. Raw signals are decimated to ~22.2 kHz, envelope-extracted with a moving-window **RMS** filter, then smoothed with a causal **Savitzky–Golay** fit. Each sensor is calibrated to ground truth with a polynomial model (_y = β₂V² + β₁V + β₀_; piezo and ultrasonic needed the quadratic term, optical and tribo were linear). Ground truth comes from a load-cell mass scale, differentiated to a reference flow rate; a cross-correlation step removes pneumatic transport lag before fitting. A separate harmonic-fit SNR metric quantifies how well each sensor resolves the periodic hopper surge.

---

## Results

- **All four modalities track average flow comparably:** NRMSE 3.70–6.01%, MAPE 5.92–8.65% across 0.4–11 g/min
- **Piezoelectric delivers ultrasonic-level accuracy for $5** at a 90× lower data rate — ideal for low-cost distributed monitoring
- **Optical wins on fidelity:** highest SNR, resolving fine oscillatory flow structure no other sensor could
- Together they span the design space from **low-cost fault monitoring (piezo/tribo)** to **control-ready high-fidelity sensing (optical)**, motivating multi-modal sensor fusion

_First-author manuscript (Conceptualization, Methodology, Software, Analysis) — Stebner Lab, Georgia Tech. Supported by NSF-GRFP and Georgia AIM._

---

## Addendum: Kalman Filter Sensor Fusion

The manuscript's natural next step — fusing multiple sensors for a more robust flow estimate — was realized in a follow-on project: a **Kalman filter** (a standard linear KF, **not** an EKF — the state dynamics are linear, and the only nonlinearity lives in the sensor calibration, which is handled by state augmentation) that fuses the **piezoelectric** and **triboelectric** sensors into a single flow-rate estimate.

<div class="row mb-4">
  <div class="col-sm-12">
    <div class="card p-0 overflow-hidden">
      <img src="{{ 'assets/img/proj_sensor_fusion.jpg' | relative_url }}" alt="Linear Kalman Filter estimate vs ground truth across 5 auger settings" style="width:100%; display:block;">
    </div>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">Linear KF estimate (blue dashed) vs. load-cell ground truth (red) across five auger settings — MSE = 3.89×10⁻⁵ g/s.</p>
  </div>
</div>

Two designs were compared:

| Model             | States          | Calibration              | MSE (g/s)     |
| ----------------- | --------------- | ------------------------ | ------------- |
| Linear KF         | 3 (ṁ², ṁ, bias) | Global quadratic         | **3.89×10⁻⁵** |
| Gain-scheduled KF | 2 (ṁ, bias)     | Piecewise linear per bin | 6.59×10⁻⁵     |

**Linear KF:** The quadratic sensor calibration is absorbed by augmenting the state with ṁ² and a constant bias term, keeping the filter fully linear. Measurement noise **R** is populated directly from calibration residual variances — no hand-tuning.

**Gain-scheduled KF:** Splits the flow range into bins with a separate linear calibration in each; **H** and **R** switch automatically at bin boundaries.

**Key finding:** The linear KF achieves the lower MSE (3.89×10⁻⁵ vs. 6.59×10⁻⁵ g/s), while the gain-scheduled KF has zero residual bias — preferable for a downstream control loop that would otherwise need an integral term. The framework scales to four sensors (adding acoustic and capacitive modalities) for multi-material flow estimation.

_AE 6505: Kalman Filtering — Georgia Tech · Stebner Lab_
