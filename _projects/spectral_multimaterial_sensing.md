---
layout: page
title: Spectral Multi-Material Mass Flow Sensing
description: Broadband reflectance spectroscopy with PLSR calibration for simultaneous real-time multi-material powder composition monitoring in PB-DED — enabling reliable functionally graded material fabrication.
img: assets/img/proj_sensor_fusion.jpg
importance: 4
category: research
related_publications: false
---

## Overview

Fabricating **Functionally Graded Materials (FGMs)** via Powder-Blown Directed Energy Deposition (PB-DED) requires precise, simultaneous monitoring of multiple powder compositions in real-time. Existing approaches either classify into coarse bins (assuming known total flow rate) or use expensive laser-induced breakdown spectroscopy (LIBS) with only relative measurements.

This project develops a **broadband optical reflectance sensor** coupled with **Partial Least Squares Regression (PLSR)** calibration for continuous, absolute multi-material mass flow monitoring — simultaneously tracking both material composition and flow rate.

> This is Objective 3 of my PhD thesis.

---

## The Multi-Material Challenge

When two powders (e.g., Stainless Steel + Inconel 625) are deposited simultaneously:
- **Total flow rate** varies continuously
- **Composition ratio** varies continuously (to create the gradient)
- **Neither is directly observable** from single-sensor measurements

Getting this wrong produces:
- Off-composition FGM layers → wrong mechanical properties
- Interface delamination between graded regions
- Uncontrolled martensite transformation temperatures (especially in shape memory alloys)

---

## Sensing Approach

### Broadband Reflectance Probe

A fiber-optic reflectance probe illuminates the powder stream with a **broadband UV-VIS light source**. The backscattered spectrum is captured by a spectrometer through a separate fiber bundle.

**Key insight**: Different metal powders have characteristically different reflectance spectra due to their surface optical properties. Stainless steel and Inconel 625 are well-separated in principal component (PC) space — enabling high-sensitivity discrimination even in mixtures.

### PLSR Calibration

Calibration uses **only pure single-material experiments** — no mixed-powder calibration samples required:

1. Collect reflectance spectra for each pure material across 0–10 g/min
2. Fit a **Partial Least Squares Regression** model mapping spectra → (flow rate, composition)
3. Validate on independently prepared mixtures at known compositions

**Result**: The calibrated model predicts constituent material flow rates within the calibration uncertainty, without access to mixed-material training data.

---

## Results

<div class="row mt-3">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h3 style="color: var(--global-theme-color);">Linear</h3>
      <p>Reflectance response to composition confirmed experimentally — PLSR assumption validated</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h3 style="color: var(--global-theme-color);">SS + IN625</h3>
      <p>Validated on industrially relevant Stainless Steel + Inconel 625 combinations</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h3 style="color: var(--global-theme-color);">No Mixed Data</h3>
      <p>Calibrated using only pure-material experiments — practical for new material combinations</p>
    </div>
  </div>
</div>

---

## Connection to Sensor Distillation (Objective 4)

The spectral sensor serves as the **high-accuracy "teacher"** for the subsequent sensor distillation objective: a machine learning model is trained to replicate the spectral sensor's multi-material predictions using only the inexpensive multi-physics array (piezoelectric + triboelectric + optical attenuation). This eliminates the need for the expensive spectrometer hardware in deployed systems.

---

## Planned Publication

> **Shah N, Brunson Z, Kim J, Stebner A.**
> "Real-time spectral multi-material powder flow monitoring for directed energy deposition."
> *Targeting December 2026*
>
> **Patent pending** (Georgia Tech)

---

## Tools & Technologies

`Python (NumPy, scikit-learn)` · `MATLAB` · `Partial Least Squares Regression (PLSR)` · `UV-VIS Spectroscopy` · `Principal Component Analysis` · `Fiber Optic Sensing`

---

## Project Context

PhD thesis research at **Stebner Lab, Georgia Institute of Technology** (2022–Present). NSF GRFP supported.
