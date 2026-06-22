// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/portfolio/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Papers, manuscripts in preparation, and patents in sensing, estimation, and control — in reverse-chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/portfolio/publications/";
          },
        },{id: "nav-resume",
          title: "resume",
          description: "Targeting robotics engineering roles in perception, state estimation, and learning-based control.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/portfolio/resume/";
          },
        },{id: "projects-autonomous-fpv-drone-racing",
          title: 'Autonomous FPV Drone Racing',
          description: "SO(3) geometric control, one-shot gate detection, and an Extended Kalman Filter (EKF) for on-the-fly gate localization — a full autonomy stack for high-speed FPV drone racing.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/ai_grand_prix_drone_racing/";
            },},{id: "projects-community-stem-outreach",
          title: 'Community STEM Outreach',
          description: "STEM enrichment for underserved K-12 students in Atlanta.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/community_stem_outreach/";
            },},{id: "projects-deformable-kernels-for-curved-surface-nde",
          title: 'Deformable Kernels for Curved-Surface NDE',
          description: "Deformable convolution that bends to follow curved surfaces — maps material thickness across a full part instead of point by point.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/deformable_convolution_nde/";
            },},{id: "projects-detecting-jwst-mirror-misalignment",
          title: 'Detecting JWST Mirror Misalignment',
          description: "A two-head Swin Transformer reads a single James Webb point-spread function and says which of the 18 mirror segments drifted and by how much — F1 = 1.0 on localization and 0.14–10.1% error on piston/tip/tilt.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/jwst_swin_mirror_alignment/";
            },},{id: "projects-automated-3d-point-cloud-registration",
          title: 'Automated 3D Point Cloud Registration',
          description: "An automated pipeline that precisely aligns multi-view LiDAR point clouds with no manual intervention — FPFH features → RANSAC → ICP refinement.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/lidar_point_cloud_registration/";
            },},{id: "projects-lyapunov-based-mrac-for-powder-flow",
          title: 'Lyapunov-Based MRAC for Powder Flow',
          description: "A Lyapunov-based MRAC controller that adapts to changing feeder dynamics and cancels periodic powder-flow surging — deployed on an FPGA with real stainless-steel powder.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/mrac_powder_flow_control/";
            },},{id: "projects-multi-modal-powder-flow-sensors",
          title: 'Multi-Modal Powder-Flow Sensors',
          description: "Three novel in-line sensors (piezoelectric, optical, triboelectric) benchmarked against an ultrasonic baseline for metal-3D-printing powder flow — all hit R² &gt; 0.9 at a 90× lower data rate, then fused with a Kalman filter.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/multi_sensor_ded/";
            },},{id: "projects-vision-language-action-models",
          title: 'Vision-Language Action Models',
          description: "Confidence-guided dynamic action chunking for OpenVLA — a last-layer Jacobian L1-norm signal truncates unreliable actions, lifting LIBERO-SPATIAL success to 99.2%.",
          section: "Projects",handler: () => {
              window.location.href = "/portfolio/projects/vision_language_foundation_models/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/portfolio/assets/pdf/resume.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6E%73%68%61%68@%67%61%74%65%63%68.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/nnelshas", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/neelshah8", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Aj9EktEAAAAJ", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/portfolio/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
