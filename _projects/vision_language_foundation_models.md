---
layout: page
title: Vision-Language Action Models
description: Bayesian uncertainty quantification and inference optimization for OpenVLA-OFT robot manipulation.
img: assets/img/proj_vla.jpg
hover_video: assets/video/vla_success.mp4
importance: 1
category: research
---

<div class="row">
  <div class="col-sm-12">
    <h2>Overview</h2>
    <p>
      This project investigates deployment-focused improvements for <strong>OpenVLA-OFT</strong>, a vision-language action (VLA) model
      fine-tuned via Optimized Fine-Tuning (OFT) for robot manipulation. We tackled two core challenges: <em>knowing when the model
      doesn't know</em> (uncertainty quantification) and <em>acting efficiently without sacrificing reliability</em> (inference optimization).
    </p>
  </div>
</div>

<div class="row mt-4">
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-check" style="color: #28a745;"></i> Success Demo</h3>
    <p class="text-muted">OpenVLA-OFT successfully placing both moka pots on the stove.</p>
    <video width="100%" controls autoplay muted loop playsinline style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/vla_success.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p class="caption" style="color: #28a745; font-weight: bold;">&#10003; Episode 43 — Task Completed</p>
  </div>
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-xmark" style="color: #dc3545;"></i> Failure Demo</h3>
    <p class="text-muted">A representative failure case where OOD uncertainty triggers intervention.</p>
    <video width="100%" controls autoplay muted loop playsinline style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/vla_failure.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p class="caption" style="color: #dc3545; font-weight: bold;">&#10007; Episode 42 — Failure / High Uncertainty</p>
  </div>
</div>

---

## Key Results

<div class="row mt-3">
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">99.2%</h2>
      <p>Success rate on LIBERO benchmark via confidence-based action allocation</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">2×</h2>
      <p>Inference speedup via dynamic open-loop action reuse when confidence is high</p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">OOD</h2>
      <p>Out-of-distribution detection via Bayesian LoRA and Laplace approximation</p>
    </div>
  </div>
</div>

---

## Technical Approach

### 1. Uncertainty Quantification via Bayesian LoRA
We implemented **Bayesian LoRA** — a lightweight extension of the standard LoRA fine-tuning framework — where adapter weights are treated as distributions rather than point estimates. This enables the model to express calibrated uncertainty over action predictions at test time.

Additionally, we applied the **Laplace approximation** to post-hoc calibrate the posterior over LoRA weights, enabling computationally tractable uncertainty estimation without retraining.

### 2. Confidence-Based Dynamic Action Allocation
A key bottleneck in deploying VLA models is inference latency. We exploit the uncertainty estimates to implement **dynamic open-loop action reuse**:

- When the model is **confident**, pre-computed actions are replayed open-loop (no new forward passes)
- When **uncertainty is high** or when the robot enters a new context, the model is queried for a fresh action

This achieves a ~2× speedup in effective control frequency with negligible accuracy loss.

### 3. LIBERO Benchmark Evaluation
All experiments were conducted on the **LIBERO** robot manipulation benchmark suite, which tests instruction-following across diverse tabletop manipulation tasks. The moka pot stacking task shown above is one of the most challenging in the suite.

---

## Tools & Technologies

`PyTorch` · `OpenVLA` · `LIBERO` · `LoRA / PEFT` · `Laplace Approximation` · `Python` · `SLURM` · `HuggingFace`

---

## Course Context

This project was completed as part of **CS 8803: Vision-Language Models** at Georgia Tech (Fall 2025).
