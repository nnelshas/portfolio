---
layout: page
title: Detecting JWST Mirror Misalignment
description: "A <strong>two-head Swin Transformer</strong> reads a single James Webb point-spread function and says <strong>which</strong> of the 18 mirror segments drifted and by <strong>how much</strong> — <strong>F1 = 1.0</strong> on localization and <strong>0.14–10.1%</strong> error on piston/tip/tilt."
img: assets/img/proj_jwst_thumb.jpg
importance: 3
category: research
---

<div class="text-center mb-4">
  <a
    href="https://github.gatech.edu/pages/jcorbin33/CS7641_S26/"
    target="_blank"
    rel="noopener noreferrer"
    style="display: inline-block; padding: 8px 18px; border: 2px solid var(--global-theme-color); border-radius: 8px; color: var(--global-theme-color); font-weight: bold; text-decoration: none;"
  >
    <i class="fa-solid fa-arrow-up-right-from-square"></i> View the full project page &amp; report
  </a>
</div>

<div class="row mb-4">
  <div class="col-sm-12">
    <div class="card p-0 overflow-hidden">
      <img src="{{ 'assets/img/jwst_psf_comparison.png' | relative_url }}" alt="Aligned vs. misaligned JWST point-spread functions from the STPSF simulator" style="width:100%; display:block;">
    </div>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">Simulated JWST point-spread functions (STPSF): an aligned mirror (left) vs. a misaligned configuration (right). The model learns to read these subtle differences.</p>
  </div>
</div>

---

## Key Numbers

<div class="row mt-3 mb-3">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">1.0</h2>
      <p class="mb-0"><strong>F1 score localizing the misaligned segment (18-class)</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">0.14–10.1%</h2>
      <p class="mb-0"><strong>Relative error on piston / tip / tilt magnitude</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">10k</h2>
      <p class="mb-0"><strong>Simulated PSFs generated for training</strong></p>
    </div>
  </div>
</div>

---

## The Problem

The James Webb Space Telescope earns its resolution from the precise co-alignment of **18 hexagonal primary-mirror segments**. Operating between −239 and 87 °C, thermal microdeformations nudge those segments out of place, and even nanometer-scale **piston** (translation) or **tip/tilt** (rotation) errors smear the telescope's point-spread function (PSF) and degrade every observation. Today, catching this relies on dedicated wavefront sensors and expensive phase-retrieval algorithms.

**The question:** given just a PSF image, can a model say _which_ segment is misaligned and _by how much_ — fast enough to serve as an independent, low-latency health check between scheduled maintenance?

---

## My Role

A CS 7641 (Machine Learning) project that I designed and built end to end — the **data-generation pipeline**, the **supervised two-head Swin Transformer** described below, and the **unsupervised clustering baseline** that motivated it.

---

## Data: 10,000 Simulated PSFs

There is no large labeled corpus of misaligned-JWST images, so I built one. Using the **STPSF** NIRCam simulator (filter F200W, 2× oversampling, 1.5″ field of view), I generated **10,000 PSFs** with ground-truth defect labels, spanning:

- **Defect types:** piston and tip/tilt, equally represented across all **18 segments**
- **Three difficulty tiers** calibrated to real JWST behavior — _subtle_ (≈48 h of drift: piston 5–15 nm, tip/tilt 0.01–0.03 µrad), _medium_ (maintenance-triggering drift), and _easy_ (large historical drift events)
- **Log-normalized intensities:** pixels clipped at 1e-10, log₁₀-transformed, then z-scored — taming the PSF's enormous dynamic range

---

## The Model: Two-Head Swin Transformer

A pretrained **Swin-T** backbone (~28.3 M parameters, ImageNet-initialized) extracts a shared 768-dimensional feature from each PSF through four hierarchical stages of windowed self-attention (56² → 28² → 14² → 7²). Two lightweight heads then branch off that shared feature:

- **Segment head** — 18-class classification: _which_ mirror panel is misaligned
- **DOF head** — 3-D regression: _how much_, along piston (nm), tip (µrad), and tilt (µrad)

The heads train jointly under a weighted loss `L = 0.1·L_seg + L_DOF`, where `L_seg` is cross-entropy and `L_DOF` is a Huber (smooth-L1) loss on per-axis standardized targets — the low segment weight reflecting that magnitude regression is the harder, higher-priority task. Optimization uses AdamW with **differential learning rates** (backbone 5e-5, heads 5e-4), weight decay 0.05, and cosine annealing with plateau-based reduction over 200 epochs.

---

## Results

<div class="row mb-4">
  <div class="col-sm-12">
    <div class="card p-0 overflow-hidden">
      <img src="{{ 'assets/img/jwst_validation_curves.png' | relative_url }}" alt="Validation RMSE curves for piston, tip, and tilt over 200 epochs" style="width:100%; display:block;">
    </div>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">Validation convergence for the piston, tip, and tilt regression heads over 200 epochs — stable training across all three degrees of freedom.</p>
  </div>
</div>

- **Perfect localization:** the segment head hit an **F1 score of 1.0** across all defect types — the learned representation cleanly identifies the misaligned panel.
- **Low-error magnitude estimation:** relative error ranged from **0.14% to 10.1%** of the defect span depending on severity. Piston was easiest (most global PSF effect); tip/tilt hardest at subtle magnitudes.

| Defect | RMSE         | Subtle | Medium | Easy  |
| ------ | ------------ | ------ | ------ | ----- |
| Piston | 1.135 nm     | 5.2%   | 2.2%   | 0.14% |
| Tip    | 0.00235 µrad | 5.5%   | 2.2%   | 0.15% |
| Tilt   | 0.00435 µrad | 10.1%  | 4.0%   | 0.28% |

_(% = RMSE as a fraction of each tier's magnitude span.)_

One honest wrinkle: the model showed **asymmetric tip-vs-tilt error** despite the physically symmetric PSFs — most likely the ImageNet-pretrained attention patterns steering fine-tuning into a biased local minimum. Training from random initialization is the natural next experiment.

---

## Unsupervised Approach

Before committing to supervision, I tested whether segment identity could be recovered _without_ labels — an autoencoder → PCA → K-means (k = 18) pipeline. It reconstructed the PSFs accurately, but the clusters never lined up with the mirror segments (Adjusted Rand Index ≈ 0, i.e., no better than random grouping).

<div class="row mb-4">
  <div class="col-sm-12">
    <div class="card p-0 overflow-hidden">
      <img src="{{ 'assets/img/jwst_tsne_kmeans.png' | relative_url }}" alt="t-SNE of autoencoder embeddings with K-means Voronoi cells; clusters do not align with mirror-panel labels" style="width:100%; display:block;">
    </div>
    <p style="color: var(--global-theme-color); font-weight: bold; margin-top: 6px;">t-SNE of the autoencoder embeddings (Voronoi cells = K-means clusters, colors = true panel). Clusters mix panels freely — reconstruction features don't encode defect identity.</p>
  </div>
</div>

The takeaway: features that reconstruct an image well are not the same as features that reveal _which_ segment moved. **Explicit supervision** is what ties the model's representation to the physics that matters — exactly what the two-head Swin model delivers.

---

## Tools

`PyTorch` · `Swin Transformer` · `STPSF (JWST PSF simulator)` · `Multi-Task Learning` · `Transfer Learning` · `scikit-learn (PCA, K-means, t-SNE)` · `NumPy`

_CS 7641: Machine Learning — Georgia Tech, Spring 2026. Designed and built end to end: the data-generation pipeline, the supervised two-head Swin Transformer (localization + magnitude regression), and the unsupervised clustering baseline._
