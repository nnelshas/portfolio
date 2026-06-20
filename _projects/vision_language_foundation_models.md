---
layout: page
title: Vision-Language Action Models
description: "<strong>Jacobian-guided adaptive action chunking</strong> for OpenVLA — trading off chunk length vs. accuracy to hit <strong>99.2% success</strong> on LIBERO-SPATIAL while cutting inference calls by ~2×."
img: assets/img/proj_vla_thumb.jpg
hover_video: assets/video/vla_success.mp4
importance: 2
category: research
---

<div class="row mb-4">
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-check" style="color: #28a745;"></i> Success — with adaptive chunking</h3>
    <video width="100%" controls autoplay muted loop playsinline style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/vla_success.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: #28a745; font-weight: bold; margin-top: 6px;">&#10003; Episode 43 — Task Completed</p>
  </div>
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-xmark" style="color: #dc3545;"></i> Failure — fixed long chunk, no truncation</h3>
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
      <p class="mb-0"><strong>LIBERO-SPATIAL success rate</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">~2×</h2>
      <p class="mb-0"><strong>Fewer inference calls via chunking</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">L1</h2>
      <p class="mb-0"><strong>Jacobian norm — best failure predictor</strong></p>
    </div>
  </div>
</div>

---

## The Problem: Speed vs. Accuracy in VLA Models

Autoregressive VLA models like OpenVLA generate one action per forward pass, running at only 3–5 Hz — far too slow for real robot control (25–50+ Hz). **Action chunking** addresses this by predicting a sequence of _k_ actions in a single pass and executing them open-loop, reducing the number of model calls by up to *k*×.

But longer chunks accumulate error: the robot receives less frequent sensor feedback, so stale observations eventually cause failures. This work studies that tradeoff empirically and proposes a signal to cut chunks short before they go wrong.

---

## Confidence via the Jacobian

The key insight is that the **L1 norm of the Jacobian of the final prediction layer** — measuring how sensitive the model's output is to its weights — diverges strongly between successful and failing executions. As a chunk progresses, rising L1 norm indicates the model is operating outside its training distribution.

- **Success cases:** Jacobian L1 norm stays low and stable across the chunk
- **Failure cases:** Jacobian L1 norm climbs sharply, even at early timesteps
- **Slope difference:** ~3.56× larger in failure cases — the strongest signal tested

---

## Adaptive Truncation

Rather than always executing the full chunk, the system monitors the Jacobian signal at each step and **truncates the chunk early** when the norm exceeds a learned threshold, re-querying the model for fresh actions. This recovers the accuracy benefits of short chunks while preserving most of the speed benefit of chunking.

- **Threshold tuned on validation runs** — no per-task hand-tuning
- **Zero architectural changes** to OpenVLA — inference-time only
- **Outperforms both** fixed-short and fixed-long chunk baselines on LIBERO-SPATIAL

---

## Experimental Setup

- **Benchmark:** LIBERO-SPATIAL — robot must identify the correct bowl among identical-looking objects based on spatial relationships, requiring consistent closed-loop observation
- **Base model:** OpenVLA fine-tuned with Optimized Fine-Tuning (OFT), action chunk size 24
- **Training:** 110k steps on 8× NVIDIA A40 GPUs (~14 days)
- **Loss at convergence:** ~0.007 (down from ~0.07 at 10k steps)
- **Hardest task:** Moka-pot stacking — maximally unfamiliar spatial configuration

---

## Tools

`PyTorch` · `OpenVLA` · `LIBERO` · `LoRA / PEFT` · `Jacobian Analysis` · `HuggingFace` · `SLURM`

_CS 8803: Vision-Language Models — Georgia Tech, Fall 2025_
