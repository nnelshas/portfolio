---
layout: page
title: Multi-Physics Mass Flow Sensor Array for DED
description: Novel piezoelectric, triboelectric, optical, and ultrasonic sensors for real-time powder mass flow monitoring in Powder-Blown Directed Energy Deposition, with Bayesian multi-modal fusion.
img: assets/img/proj_multimodal.jpg
importance: 3
category: research
related_publications: false
---

## Overview

Powder-Blown Directed Energy Deposition (PB-DED) requires precise, real-time mass flow monitoring — but existing sensors are either too expensive, require external power, or cannot detect the periodic instabilities that drive quality problems. This project develops a **multi-physics sensor array** combining four orthogonal sensing modalities (piezoelectric, triboelectric, optical attenuation, and optical reflection) specifically designed for in-line PB-DED deployment.

Each modality captures different physical properties of the powder stream, enabling **Bayesian sensor fusion** that is more robust and informative than any single sensor alone.

> This is Objective 1 of my PhD thesis: *"Multi-material Mass Flow Monitoring and Control for Powder-Blown Directed Energy Deposition."*

---

## Why Existing Sensors Fall Short

<div class="row mt-3">
  <div class="col-sm-12">
    <table class="table table-sm">
      <thead><tr><th>Modality</th><th>In-line PB-DED</th><th>Low Data Rate</th><th>Low Cost</th><th>Self-Powered</th></tr></thead>
      <tbody>
        <tr><td>Ultrasonic</td><td>✓</td><td></td><td>✗ ($$$)</td><td>✗</td></tr>
        <tr><td>High-speed Imaging</td><td>✓</td><td></td><td>✗ ($$$)</td><td>✗</td></tr>
        <tr><td>Optical Attenuation</td><td>✓</td><td>✓</td><td>✗ ($$)</td><td>✗</td></tr>
        <tr style="background: rgba(var(--global-theme-color-rgb, 100,160,100),0.08)"><td><strong>Low-Freq. Piezoelectric</strong></td><td>✓</td><td>✓</td><td>✓ ($)</td><td>✓</td></tr>
        <tr style="background: rgba(var(--global-theme-color-rgb, 100,160,100),0.08)"><td><strong>Triboelectric</strong></td><td>✓</td><td>✓</td><td>✓ ($)</td><td>✓</td></tr>
        <tr style="background: rgba(var(--global-theme-color-rgb, 100,160,100),0.08)"><td><strong>Optical Reflection (ours)</strong></td><td>✓</td><td>✓</td><td>✓ ($$)</td><td>✗</td></tr>
      </tbody>
    </table>
    <p class="small text-muted">Our novel contributions highlighted. Self-powered sensors are ideal for distributed clog detection across long powder lines.</p>
  </div>
</div>

---

## Sensor Modalities

<div class="row mt-3">
  <div class="col-sm-6">
    <div class="card p-3 mb-3 h-100">
      <h5><i class="fa-solid fa-bolt" style="color: var(--global-theme-color);"></i> Piezoelectric (Low-Frequency)</h5>
      <p class="small">Particles impacting the powder line wall generate piezoelectric voltage. Low-cost, self-powered, and sensitive to <strong>kinetic energy</strong> of the powder stream. Ideal for distributed clog sensing across the full powder line.</p>
      <p class="small"><strong>Captures:</strong> Average mass flow rate, periodic instabilities, clogs</p>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card p-3 mb-3 h-100">
      <h5><i class="fa-solid fa-atom" style="color: var(--global-theme-color);"></i> Triboelectric</h5>
      <p class="small">Friction between powder particles and the tube wall generates a triboelectric charge proportional to <strong>particle inertia</strong>. Self-powered and inexpensive — complementary physics to piezoelectric.</p>
      <p class="small"><strong>Captures:</strong> Average mass flow, material-dependent charge signature</p>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card p-3 mb-3 h-100">
      <h5><i class="fa-solid fa-eye" style="color: var(--global-theme-color);"></i> Optical Attenuation</h5>
      <p class="small">Powder particles occlude a light beam; attenuation correlates with <strong>volumetric flow rate</strong>. Sensitive to particle count and size distribution but not material composition.</p>
      <p class="small"><strong>Captures:</strong> Volumetric flow, particle distribution</p>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card p-3 mb-3 h-100">
      <h5><i class="fa-solid fa-circle-dot" style="color: var(--global-theme-color);"></i> Optical Reflection (Novel)</h5>
      <p class="small">Broadband light reflected from the powder stream is captured by a fiber bundle. Reflectance spectrum is material-specific — sensitive to <strong>particle surface properties and material composition</strong>. Extends to multi-material sensing (see Objective 3).</p>
      <p class="small"><strong>Captures:</strong> Mass flow + material identity</p>
    </div>
  </div>
</div>

---

## Sensor Fusion

The four modalities respond differently to different physical properties of the powder stream, making them **orthogonal** in information content. This is the key enabler for robust Bayesian fusion:

- **Piezoelectric + Triboelectric**: Both inexpensive/self-powered but capture kinetic energy vs. inertia — cross-validates single-material flow rate estimates
- **Optical attenuation + reflection**: Volumetric vs. spectral — attenuation is insensitive to material type; reflection is sensitive → fusion enables both flow rate AND composition
- **Ultrasonic**: High-fidelity periodic instability detection for full-spectrum characterization

### Signal Processing Pipeline

1. **Savitzky-Golay filtering** — noise removal while preserving oscillation features
2. **Oscillation SNR quantification** — trend removal → least-squares sinusoidal fitting → residual SNR calculation
3. **Bayesian fusion** — probabilistic combination of modality estimates with uncertainty weighting
4. **Anomaly detection** — statistical outlier flagging for clog detection and drift monitoring

---

## Results

<div class="row mt-3">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h3 style="color: var(--global-theme-color);">4</h3>
      <p>Novel in-line sensor modalities validated against precision mass scale ground truth</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h3 style="color: var(--global-theme-color);">>3 dB</h3>
      <p>Oscillation SNR threshold — exceeded by piezoelectric and triboelectric for periodic instability detection</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h3 style="color: var(--global-theme-color);">$</h3>
      <p>Piezo + triboelectric are inexpensive and self-powered — enabling distributed sensing over full powder line (~10m)</p>
    </div>
  </div>
</div>

---

## Planned Publication

> **Shah N, Brunson Z, Panchal A, Kim J, Stebner A.**
> "Real-time powder flow monitoring for directed energy deposition using multi-physics sensing."
> *Targeting Additive Manufacturing, April 2026*
>
> **3 patents pending** (Georgia Tech)

---

## Tools & Technologies

`Python (NumPy, SciPy, PyTorch)` · `MATLAB` · `LabVIEW (FPGA)` · `Savitzky-Golay` · `Bayesian Inference` · `Signal Processing` · `High-Speed DAQ`

---

## Project Context

PhD thesis research at **Stebner Lab, Georgia Institute of Technology** (2022–Present). Advised by **Dr. Aaron Stebner**. NSF GRFP supported.
