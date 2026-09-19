# 🌟 Doan Thanh Hai (thhai) — Personal Portfolio Website

[![HUST GPA](https://img.shields.io/badge/HUST%20CPA-3.61%2F4.0-purple?style=for-the-badge&logo=graduation-cap)](https://github.com/thhai410)
[![Target Role](https://img.shields.io/badge/Focus-Computer%20Vision%20R%26D-blue?style=for-the-badge&logo=python)](https://github.com/thhai410)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-brightgreen?style=for-the-badge&logo=javascript)](https://github.com/thhai410)
[![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

A high-performance, responsive, dual-theme personal portfolio website for **Doan Thanh Hai (thhai)** — Senior Computer Engineering Student at **Hanoi University of Science and Technology (HUST)**, **AI Engineer**, and **Frontend Developer** pursuing **Computer Vision (CV) R&D**.

Inspired by the iconic **[soumyajit4419/Portfolio](https://github.com/soumyajit4419/Portfolio)** design language, featuring cosmic space aesthetics, interactive typewriter effects, tech skillset icon grids, and bilingual support.

---

## ✨ Features & Highlights

- **🌌 Cosmic Space & Light Dual Theme**: 
  - Deep space purple-violet galactic theme (`#0b0410` / `#1a0b2e`) with glowing accents.
  - One-click toggle (☀️/🌙) to a clean, crisp Light Mode.
  - State persisted via `localStorage`.

- **⚡ Interactive Typewriter Engine**:
  - Dynamically cycles through roles: *AI Engineer*, *Computer Vision Researcher*, *Frontend Developer*, *UI/UX Specialist*, and *Computer Engineering @ HUST (GPA 3.61)*.

- **🌐 Multi-Language Support (Bilingual VI / EN)**:
  - Instant translation switcher (🌐 VI / EN) across all navigation links, titles, bio text, and call-to-actions.

- **✨ Floating Starry Canvas Background**:
  - Custom HTML5 Canvas particle system generating twinkling stars and space nebulas.

- **🎨 Professional Skillset & Tools Grid**:
  - Hover-glowing technology cards for Python, C/C++, Computer Vision, PyTorch, OpenCV, Figma UI/UX, HTML5/CSS3, JavaScript, Git/GitHub, Paper Reading, Linux, and VS Code.

- **🔬 Featured Projects & Research Showcase**:
  - Project Cards featuring *Computer Vision Paper Implementations*, *AI & Interactive UI/UX Modules*, and *HUST Coursework Projects* with GitHub action links.

- **📄 Resume & Journey Timeline**:
  - Direct `📄 Download CV (.pdf)` and LaTeX source (`cv.tex`) links alongside work history at **VNet JSC** and **A-Star Group**.

---

## 📂 Repository Directory Structure

```text
Portfolio/
├── index.html        # Main HTML5 semantic structure & I18n strings
├── style.css         # Cosmic purple dark theme, light theme tokens, animations & card styles
├── script.js        # Typewriter engine, Starry canvas renderer, Theme & Language toggles
├── cv.tex            # LaTeX CV source file
├── cv.pdf            # Compiled PDF CV
├── CNAME             # GitHub Pages custom domain configuration
├── README.md         # Documentation & repository guide
└── public/
    └── favicon.svg   # Custom SVG Favicon (TH Logo)
```

---

## 🛠️ Tech Stack Used

- **Markup & Structure**: HTML5 (Semantic layout)
- **Styling & Theme Engine**: Vanilla CSS3 (Custom Properties, Flexbox, Grid, Keyframes Animations)
- **Scripting & Interactivity**: Vanilla JavaScript (ES6+ Canvas, Typewriter, I18n Engine, LocalStorage)
- **Typography**: Google Fonts (*Raleway*, *Roboto*, *JetBrains Mono*)
- **CV Source**: LaTeX (`cv.tex`)

---

## 🚀 Local Quickstart Guide

No complex build steps or node dependencies required! You can serve the static files with any HTTP server:

### Option 1: Python HTTP Server
```bash
# Make sure you are inside the Portfolio folder, then run:
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: VS Code Live Server
1. Open the `Portfolio` folder in VS Code.
2. Right-click `index.html` -> Select **Open with Live Server**.

---

## 🌐 Deployment to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of thhai portfolio"
   git branch -M main
   git remote add origin https://github.com/thhai410/thhai410.github.io.git
   git push -u origin main
   ```
2. Navigate to your repository **Settings** -> **Pages**.
3. Under **Build and deployment**, select `Deploy from a branch` and choose `main` / `root`.
4. Your portfolio will be live at `https://thhai410.github.io`!

---

## 👨‍💻 Author

**Doan Thanh Hai (thhai)**
- 🎓 **School**: Hanoi University of Science and Technology (HUST)
- 📊 **CPA**: 3.61 / 4.0
- ✉ **Email**: [imhai0827@gmail.com](mailto:imhai0827@gmail.com)
- 🐙 **GitHub**: [@thhai410](https://github.com/thhai410)
- 💼 **LinkedIn**: [Doan Thanh Hai](https://www.linkedin.com/in/thanh-h%E1%BA%A3i-91054a42a/)

---

*Copyright © 2026 Doan Thanh Hai. Designed and built with passion.*
