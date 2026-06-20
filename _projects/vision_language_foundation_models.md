---
layout: page
title: Vision-Language Action Models
description: Bayesian uncertainty estimates and smart action reuse for the OpenVLA robot model — 99.2% success on the LIBERO benchmark.
img: assets/img/proj_vla_thumb.jpg
hover_video: assets/video/vla_success.mp4
importance: 2
category: research
---

<div class="row mb-4">
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-check" style="color: #28a745;"></i> Success — with dynamic action architecture</h3>
    <video width="100%" controls autoplay muted loop playsinline style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/vla_success.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: #28a745; font-weight: bold; margin-top: 6px;">&#10003; Episode 43 — Task Completed</p>
  </div>
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-xmark" style="color: #dc3545;"></i> Failure — without dynamic action architecture</h3>
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

- **Bayesian LoRA** — treats the fine-tuned weights as distributions, not single values, so the model can tell when it's unsure
- **Laplace approximation** — adds this calibration after training, with no retraining needed
- **Per-action confidence score** — a calibrated uncertainty value for every action the robot takes
- **Out-of-distribution detection** — flags unfamiliar situations before they cause a failure

## Dynamic Action Architecture

- **Confident → reuse** — skip the expensive model call and replay cached actions
- **Unsure → recompute** — query the model for a fresh action
- **~2× faster control loop** — with no loss in accuracy
- **Removes the latency bottleneck** — the key to running on a real robot

## Experimental Setup

- **Benchmark:** LIBERO robot manipulation suite (varied tabletop tasks)
- **Model:** OpenVLA fine-tuned with Optimized Fine-Tuning (OFT)
- **Hardest task:** Moka-pot stacking (shown above) — the most unfamiliar situations
- **Baseline:** plain OFT without the dynamic architecture → frequent failures

---

## Tools

`PyTorch` · `OpenVLA` · `LIBERO` · `LoRA / PEFT` · `Laplace Approximation` · `HuggingFace` · `SLURM`

_CS 8803: Vision-Language Models — Georgia Tech, Fall 2025_
