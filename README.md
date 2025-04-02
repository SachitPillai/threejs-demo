# threejs-demo
# 3D Spaceship Launch Experience

This is a simple and interactive 3D launch simulation built using **Three.js** and **GSAP**. It features a custom-designed 3D spaceship that floats above a starfield and launches on user interaction, transitioning into a sleek landing screen.

---

## Features

- Custom 3D spaceship built entirely with Three.js primitives (cylinder, cone, box).
- Animated cosmic background with randomly positioned stars.
- Smooth launch and return animations powered by GSAP.
- Responsive layout and UI styling with Tailwind CSS.
- No build tools, frameworks, or complex dependencies required.
- CDN-based — runs directly in the browser.

---

## Technologies Used

- [Three.js](https://threejs.org/) – for 3D rendering
- [GSAP](https://greensock.com/gsap/) – for animations and transitions
- [Tailwind CSS](https://tailwindcss.com/) – for styling and layout

---

## Project Structure

```
3d-launch/
├── index.html       # Main HTML file with embedded layout
├── style.css        # Custom styling and background animation
└── script.js        # Three.js spaceship setup and animation logic
```

---

## Getting Started

You can run this project locally without any setup or build tools.

### Option 1: Open in Browser

Simply double-click `index.html` or open it in your browser of choice.

### Option 2: Serve with a Local Server

To ensure all scripts load properly (especially on some browsers):

```bash
# Using Node.js
npx http-server

# Or Python
python3 -m http.server
```

Then open `http://localhost:8080` in your browser.

---

## How It Works

- When the page loads, a 3D spaceship floats gently in space with animated stars in the background.
- Clicking the "Take Off" button triggers a smooth launch animation and reveals a landing screen.
- Clicking "Return" brings the spaceship back to its original position and hides the landing content.

---

## Customization Ideas

- Add background audio or launch sound effects.
- Replace the starfield with a galaxy texture or animated nebula.
- Extend the landing page with real mission stats, countdowns, or call-to-actions.

---

## Author

This project was built for fun and learning. Feel free to use, modify, or build on top of it.

---

Let me know if you'd like this in a downloadable `README.md` file or included in a zipped starter project.
