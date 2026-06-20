---
layout: page
title: Vision-Language Action Models
description: "Confidence-guided <strong>dynamic action chunking</strong> for OpenVLA — a last-layer <strong>Jacobian L1-norm</strong> signal truncates unreliable actions, lifting LIBERO-SPATIAL success to <strong>99.2%</strong>."
img: assets/img/proj_vla_thumb.jpg
hover_video: assets/video/vla_success.mp4
importance: 2
category: research
---

<div class="row mb-4">
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-check" style="color: #28a745;"></i> Success — confidence-gated truncation</h3>
    <video width="100%" controls autoplay muted loop playsinline style="border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      <source src="{{ '/assets/video/vla_success.mp4' | relative_url }}" type="video/mp4">
    </video>
    <p style="color: #28a745; font-weight: bold; margin-top: 6px;">&#10003; Episode 43 — Task Completed</p>
  </div>
  <div class="col-sm-6">
    <h3><i class="fa-solid fa-circle-xmark" style="color: #dc3545;"></i> Failure — executing the full long chunk</h3>
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
      <p class="mb-0"><strong>LIBERO-SPATIAL success (train 24 / execute 12)</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">~2×</h2>
      <p class="mb-0"><strong>Fewer model calls vs. step-wise control</strong></p>
    </div>
  </div>
  <div class="col-sm-4 text-center">
    <div class="card p-3" style="border-left: 4px solid var(--global-theme-color);">
      <h2 style="color: var(--global-theme-color); font-size: 2.5rem; margin: 0;">L1</h2>
      <p class="mb-0"><strong>Jacobian norm — strongest failure signal</strong></p>
    </div>
  </div>
</div>

---

## The Problem: Action Chunking Isn't Free

Autoregressive VLA models like **OpenVLA** generate one action per forward pass, running at only 3–5 Hz — far too slow for the 25–50+ Hz needed for real robot control. **OpenVLA-OFT** speeds this up with **parallel decoding and action chunking**: the model predicts _K_ actions in a single pass and executes them open-loop, cutting forward passes by a factor of _K_.

But chunking is not a free lunch. Executing a long chunk without fresh feedback lets prediction error **compound** — and the model always emits a fixed number of actions regardless of how hard the moment is. Our experiments confirm the tradeoff: training on chunk size 24 but executing **all 24** actions scores only **97.6%**, because the low-confidence tail of each chunk accumulates error.

---

## The Idea: Confidence Gating via the Jacobian

Rather than commit to a fixed chunk size, we let the model **decide on the fly how many of its predicted actions to trust**. For each predicted action we compute the **L1 norm of the Jacobian of the final action-prediction layer** — a measure of how sensitive that action is to the model's weights. When the norm spikes past a threshold, the remaining actions are discarded and the model re-plans from the latest observation.

- **L1 beats every alternative:** Of ten candidate Jacobian metrics, the L1-based ones showed the largest success/failure slope separation (**≈3.56**), with statistically significant separation in the first three timesteps.
- **It's the spikes, not the average:** Maximum L1 deviation within a chunk averaged **~87 for successes vs. ~141 for failures** — a threshold near **114** cleanly separates the two populations.
- **Truncate the tail:** In low-confidence regimes, execution is cut to ~16 actions, dropping the unreliable tail while keeping the stable prefix.

---

## Results

| Training chunk | Actions executed | Success rate |
| -------------- | ---------------- | ------------ |
| 24             | all 24           | 0.976        |
| 24             | top 16           | 0.986        |
| **24**         | **top 12**       | **0.992**    |
| 8              | all 8            | 0.984        |

- **Predict long, execute short:** Training on 24-action chunks but executing only the most confident **12** gives the best result in the study — **99.2%**, beating full-chunk execution.
- **Short chunks compete at ~2× speed:** Training/executing 8 actions matches the 24-train/16-execute setting at roughly half the model calls — attractive for real-time deployment.
- **Over-truncation backfires:** Cutting below ~8 executed actions starts to lower success, since the robot loses the coverage it needs to finish the task.

---

## Experimental Setup

- **Benchmark:** LIBERO-SPATIAL — place a bowl on a plate among identical distractor objects, distinguished only by spatial relationships, demanding consistent observation
- **Base model:** OpenVLA fine-tuned with Optimized Fine-Tuning (OFT), action chunk size 24
- **Training:** 110k steps on 8× NVIDIA A40 GPUs (gradient accumulation 8), ~14 days
- **Loss:** ~0.07 at 10k steps → ~0.007 at 110k steps

---

## Tools

`PyTorch` · `OpenVLA / OpenVLA-OFT` · `LIBERO` · `Jacobian Analysis` · `HuggingFace` · `SLURM`

_CS 8803: Vision-Language Models (3-person project) — Georgia Tech, Fall 2025. My focus: the confidence-gating strategy — designing and evaluating the Jacobian-based uncertainty metrics and truncation criterion._
