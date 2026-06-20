---
layout: page
title: experience
permalink: /experience/
description: Research, industry, and leadership experience.
nav: false
---

<div class="experience-page">

<!-- ========== RESEARCH ========== -->
<h2 style="color: var(--global-theme-color); border-bottom: 2px solid var(--global-theme-color); padding-bottom: 0.4rem; margin-top: 1rem;">Research Experience</h2>

<div class="card mt-3 p-4">
  <div class="row align-items-start">
    <div class="col-sm-9">
      <h4 class="mb-0">Graduate Research Assistant — PhD Thesis</h4>
      <h5 style="color: var(--global-theme-color);">Stebner Lab · Georgia Institute of Technology</h5>
      <p class="text-muted small mb-2"><i class="fa-solid fa-location-dot"></i> Atlanta, GA &nbsp;·&nbsp; Jan 2022 – Present</p>
      <p class="mb-2"><strong>Thesis:</strong> <em>Multi-material Mass Flow Monitoring and Control for Powder-Blown Directed Energy Deposition</em> &nbsp;·&nbsp; Advisor: Dr. Aaron Stebner</p>
      <ul>
        <li>Built a <strong>self-tuning adaptive controller</strong> (Lyapunov-based MRAC) for a nonlinear powder-transport system with 10–60s delays, deriving the math from first principles for guaranteed stability; a preliminary FPGA implementation <strong>cut flow fluctuations by 70%</strong>.</li>
        <li>Designed a <strong>nonlinear Kalman filter (EKF/UKF)</strong> that fuses several sensors into one real-time state estimate on a high-speed testbed — sub-millisecond updates, resilient when a sensor drops out.</li>
        <li>Designed a <strong>3-sensor array</strong> (piezoelectric, triboelectric, optical) that measures powder flow rate inside a metal 3D printer in real time, validated against a precision scale — <strong>6 patents pending</strong>.</li>
        <li>Trained a <strong>deep reinforcement learning (PPO) controller</strong> for the same high-delay system: <strong>3× lower tracking error</strong> than classical baselines, transferring from simulation to hardware with no retuning.</li>
        <li>Manage the Rapid Prototyping and Electronics Lab; <strong>trained 55+ undergraduates</strong> and mentored 4 graduate researchers.</li>
      </ul>
      <div class="mt-2 flex-wrap">
        {% for tag in "MRAC,Lyapunov Adaptation,Kalman Filtering,Deep RL,Sensor Fusion,FPGA,LabVIEW,Python,C++,ROS2" | split: "," %}
          <span class="badge mr-1 mb-1" style="background-color: var(--global-theme-color); color: #fff;">{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
    <div class="col-sm-3 text-center">
      <div class="card p-3" style="background: var(--global-card-bg-color);">
        <i class="fa-solid fa-flask fa-2x" style="color: var(--global-theme-color);"></i>
        <p class="mt-2 small mb-0"><strong>NSF-GRFP</strong><br>Fellow 2024</p>
        <hr class="my-2">
        <p class="small mb-0"><strong>4 papers</strong><br>in preparation</p>
        <hr class="my-2">
        <p class="small mb-0"><strong>6 patents</strong><br>pending</p>
      </div>
    </div>
  </div>
</div>

<div class="card mt-3 p-4">
  <div class="row align-items-start">
    <div class="col-sm-9">
      <h4 class="mb-0">Graduate Research Scientist</h4>
      <h5 style="color: var(--global-theme-color);">Los Alamos National Laboratory (LANL)</h5>
      <p class="text-muted small mb-2"><i class="fa-solid fa-location-dot"></i> Los Alamos, NM &nbsp;·&nbsp; May 2022 – Present</p>
      <ul>
        <li><strong>Invented</strong> a method that lets an inspection algorithm follow curved 3D surfaces (deformable convolution) to map thickness and flag defects where standard flat-grid methods break down — <strong>patent pending (LANL)</strong>; manuscript targeting <em>MSSP 2026</em>.</li>
        <li>Built a <strong>framework for quantifying uncertainty</strong> in full-field ultrasonic inspection, so each thickness reading comes with error bars; published at <em>IWSHM 2023</em>, presented at <em>AIVELA 2025</em>.</li>
        <li>Engineered a fully <strong>automated pipeline that stitches many LiDAR scans into one 3D model</strong> (FPFH → RANSAC → ICP → pose-graph optimization, in Open3D) — no manual alignment, and it scales to large scan sets.</li>
      </ul>
      <div class="mt-2">
        {% for tag in "Open3D,Point Cloud,Deformable Convolution,UQ,Signal Processing,Python,MATLAB" | split: "," %}
          <span class="badge mr-1 mb-1" style="background-color: var(--global-theme-color); color: #fff;">{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
    <div class="col-sm-3 text-center">
      <div class="card p-3" style="background: var(--global-card-bg-color);">
        <i class="fa-solid fa-atom fa-2x" style="color: var(--global-theme-color);"></i>
        <p class="mt-2 small mb-0"><strong>LANL</strong><br>National Lab</p>
        <hr class="my-2">
        <p class="small mb-0"><strong>1 published</strong><br>IWSHM 2023</p>
        <hr class="my-2">
        <p class="small mb-0"><strong>1 in prep</strong><br>MSSP 2026</p>
      </div>
    </div>
  </div>
</div>

<!-- ========== INDUSTRY ========== -->
<h2 style="color: var(--global-theme-color); border-bottom: 2px solid var(--global-theme-color); padding-bottom: 0.4rem; margin-top: 2.5rem;">Industry & Entrepreneurship</h2>

<div class="card mt-3 p-4">
  <div class="row align-items-start">
    <div class="col-sm-9">
      <h4 class="mb-0">Co-Founder & CTO</h4>
      <h5 style="color: var(--global-theme-color);">VitalEyes</h5>
      <p class="text-muted small mb-2"><i class="fa-solid fa-location-dot"></i> Atlanta, GA &nbsp;·&nbsp; May 2020 – April 2021</p>
      <ul>
        <li>Co-founded a computer-vision startup for <strong>real-time occupancy monitoring</strong>, helping research facilities enforce social distancing.</li>
        <li>Led full-stack development; <strong>deployed to 5 GT labs with 30+ researchers</strong> within 3 months of launch.</li>
        <li>Ran customer discovery with academic and industry users and iterated the product on their feedback.</li>
        <li>Owned the codebase architecture, CI/CD pipeline, and testing workflow.</li>
      </ul>
      <div class="mt-2">
        {% for tag in "Computer Vision,Full-Stack,Product Leadership,Customer Discovery,Startup" | split: "," %}
          <span class="badge mr-1 mb-1" style="background-color: var(--global-theme-color); color: #fff;">{{ tag }}</span>
        {% endfor %}
      </div>
    </div>
    <div class="col-sm-3 text-center">
      <div class="card p-3" style="background: var(--global-card-bg-color);">
        <i class="fa-solid fa-rocket fa-2x" style="color: var(--global-theme-color);"></i>
        <p class="mt-2 small mb-0"><strong>Startup</strong><br>Co-Founder</p>
        <hr class="my-2">
        <p class="small mb-0"><strong>5 labs</strong><br>deployed</p>
      </div>
    </div>
  </div>
</div>

<!-- ========== TEACHING ========== -->
<h2 style="color: var(--global-theme-color); border-bottom: 2px solid var(--global-theme-color); padding-bottom: 0.4rem; margin-top: 2.5rem;">Teaching, Mentorship & Outreach</h2>

<div class="card mt-3 p-4">
  <div class="row">
    <div class="col-sm-4">
      <h5><i class="fa-solid fa-chalkboard-user" style="color: var(--global-theme-color);"></i> Lab Management</h5>
      <p class="small">Manage Georgia Tech's Rapid Prototyping and Electronics Lab. Trained <strong>55+ undergraduates</strong> in embedded systems, electronics, and prototyping, and mentored 4 graduate researchers on research methods and execution.</p>
    </div>
    <div class="col-sm-4">
      <h5><i class="fa-solid fa-people-group" style="color: var(--global-theme-color);"></i> STEM Outreach</h5>
      <p class="small">Volunteer with Atlanta-area programs: STEM curriculum for the <strong>Atlanta Mission Women's Shelter</strong> (unhoused children) and building math skills with underserved K-12 students via <strong>Agape Community Outreach</strong>.</p>
    </div>
    <div class="col-sm-4">
      <h5><i class="fa-solid fa-graduation-cap" style="color: var(--global-theme-color);"></i> Thesis Committee</h5>
      <p class="small">Advised by <strong>Dr. Aaron Stebner</strong>. Committee: Dr. Anirban Mazumdar, Dr. Levi Wood, Dr. Emmanouil Tentzeris, Dr. Shreyas Kousik, Dr. Jin Yeon Kim, Dr. Zachary Brunson.</p>
    </div>
  </div>
</div>

<!-- ========== SKILLS ========== -->
<h2 style="color: var(--global-theme-color); border-bottom: 2px solid var(--global-theme-color); padding-bottom: 0.4rem; margin-top: 2.5rem;">Technical Skills</h2>

<div class="card mt-3 p-4">
  <div class="row">
    <div class="col-sm-6">
      <h6><i class="fa-solid fa-wave-square" style="color: var(--global-theme-color);"></i> Control & Estimation</h6>
      <p class="small">MRAC, Lyapunov Stability Analysis, System Identification, Kalman Filtering (EKF/UKF), Sensor Fusion, Bayesian Inference, Uncertainty Quantification</p>

      <h6 class="mt-3"><i class="fa-solid fa-brain" style="color: var(--global-theme-color);"></i> Machine Learning & Robotics</h6>
      <p class="small">PyTorch, Deep RL (PPO/SAC), Vision-Language Action Models (OpenVLA), LoRA/PEFT, PLSR, Sim-to-Real Transfer, ROS2</p>
    </div>
    <div class="col-sm-6">
      <h6><i class="fa-solid fa-code" style="color: var(--global-theme-color);"></i> Programming</h6>
      <p class="small">Python (NumPy, SciPy, PyTorch, OpenCV), C++, MATLAB/Simulink, SLURM (HPC), LabVIEW (FPGA), Git</p>

      <h6 class="mt-3"><i class="fa-solid fa-microchip" style="color: var(--global-theme-color);"></i> Hardware & Sensing</h6>
      <p class="small">Real-Time Embedded Control (FPGA), High-Speed DAQ (&gt;1 kHz), Fiber-Optic Sensing, Mechatronics, Rapid Prototyping, Point Cloud Processing (Open3D), LiDAR</p>
    </div>

  </div>
</div>

</div>
