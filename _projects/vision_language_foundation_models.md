---
layout: page
title: Vision-Language Action Models
description: Bayesian UQ + dynamic action allocation for OpenVLA-OFT — 99.2% success on LIBERO benchmark.
img: assets/img/proj_vla_thumb.jpg
hover_video: assets/video/vla_success.mp4
importance: 1
category: research
---

<div class="row mb-4">
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-check" style="color: #28a745;"></i> Success — With Dynamic Action Arch.</h3>
    <video width="100%" controls autoplay muted loop playsinline style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/vla_success.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: #28a745; font-weight: bold; margin-top: 6px;">&#10003; Episode 43 — Task Completed</p>
  </div>
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-xmark" style="color: #dc3545;"></i> Failure — Without Dynamic Action Arch.</h3>
    <video width="100%" controls autoplay muted loop playsinline style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/vla_failure.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: #dc3545; font-weight: bold; margin-top: 6px;">&#10007; Episode 42 — Task Failed</p>
  </div>
</div>

---

## Key Numbers

<div class="row mt-3 mb-3">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">99.2%</h2>
      <p class="mb-0"><strong>LIBERO benchmark success rate</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">2×</h2>
      <p class="mb-0"><strong>Inference speedup via open-loop reuse</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">OOD</h2>
      <p class="mb-0"><strong>Calibrated OOD detection per action</strong></p>
    </div>
  </div>
</div>

---

## Uncertainty Quantification

- **Bayesian LoRA** — adapter weights as distributions, not point estimates
- **Laplace approximation** — post-hoc posterior calibration; no retraining
- **Per-action confidence score** — calibrated uncertainty at inference time
- **OOD detection** — flags novel states before failure propagates

## Dynamic Action Architecture

- **High confidence → open-loop replay** — skip forward pass, reuse cached actions
- **Low confidence → fresh inference** — query model for new action
- **~2× effective control frequency** — no accuracy loss
- **Eliminates latency bottleneck** — critical for real-time deployment

## Experimental Setup

- **Benchmark:** LIBERO robot manipulation suite (diverse tabletop tasks)
- **Model:** OpenVLA-OFT fine-tuned via Optimized Fine-Tuning (OFT)
- **Hardest task:** Moka pot stacking (shown above) — highest OOD exposure
- **Baseline:** Standard OFT without dynamic architecture → frequent failures

---

## Tools

`PyTorch` · `OpenVLA` · `LIBERO` · `LoRA / PEFT` · `Laplace Approximation` · `HuggingFace` · `SLURM`

*CS 8803: Vision-Language Models — Georgia Tech, Fall 2025*
