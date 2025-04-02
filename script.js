// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ----- Scene, Camera, Renderer Setup -----
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ----- Lights -----
scene.add(new THREE.AmbientLight(0xffffff, 2));
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// ----- Create Detailed Spaceship -----
function createSpaceship() {
  const ship = new THREE.Group();

  // Body: White cylinder
  const bodyGeom = new THREE.CylinderGeometry(0.5, 0.5, 3, 32);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
  ship.add(bodyMesh);

  // Nose: Red cone
  const noseGeom = new THREE.ConeGeometry(0.5, 1, 32);
  const noseMat = new THREE.MeshStandardMaterial({ color: 0xff3c3c });
  const noseMesh = new THREE.Mesh(noseGeom, noseMat);
  noseMesh.position.y = 2; // Positioned on top of the body
  ship.add(noseMesh);

  // Fins: Two red fins on either side at the bottom
  const finGeom = new THREE.BoxGeometry(0.1, 0.6, 0.8);
  const finMat = new THREE.MeshStandardMaterial({ color: 0xff3c3c });
  const leftFin = new THREE.Mesh(finGeom, finMat);
  const rightFin = new THREE.Mesh(finGeom, finMat);
  leftFin.position.set(-0.6, -1, 0);
  rightFin.position.set(0.6, -1, 0);
  leftFin.rotation.z = Math.PI / 8;
  rightFin.rotation.z = -Math.PI / 8;
  ship.add(leftFin);
  ship.add(rightFin);

  // Booster: A red inverted cone at the bottom center
  const boosterGeom = new THREE.ConeGeometry(0.3, 0.8, 32);
  const boosterMat = new THREE.MeshStandardMaterial({ color: 0xff3c3c });
  const boosterMesh = new THREE.Mesh(boosterGeom, boosterMat);
  boosterMesh.position.y = -1.9;
  boosterMesh.rotation.x = Math.PI; // Invert it
  ship.add(boosterMesh);

  return ship;
}

const spaceship = createSpaceship();
// Scale spaceship up to be larger
spaceship.scale.set(1.5, 1.5, 1.5);
scene.add(spaceship);
spaceship.position.y = 0;

// ----- Starfield for Cosmic Background -----
function addStars(count = 300) {
  const starGeom = new THREE.SphereGeometry(0.05, 12, 12);
  const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (let i = 0; i < count; i++) {
    const star = new THREE.Mesh(starGeom, starMat);
    star.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    scene.add(star);
  }
}
addStars();

// ----- "Take Off" Button Animation & Landing Page Transition -----
const takeOffBtn = document.getElementById("takeOffBtn");
const landingPage = document.getElementById("landingPage");
let launched = false;
takeOffBtn.addEventListener("click", () => {
  if (!launched) {
    launched = true;
    takeOffBtn.innerText = "Return";
    // Animate spaceship taking off (moving upward)
    gsap.to(spaceship.position, {
      y: 10,
      duration: 3,
      ease: "power2.out",
      onComplete: () => {
        // Fade in landing page after a short delay
        gsap.to(landingPage, { opacity: 1, duration: 1, delay: 0.5 });
        landingPage.classList.add("visible");
      }
    });
  } else {
    launched = false;
    takeOffBtn.innerText = "Take Off";
    // Fade out landing page
    gsap.to(landingPage, { opacity: 0, duration: 1 });
    landingPage.classList.remove("visible");
    // Animate spaceship returning to its original position
    gsap.to(spaceship.position, {
      y: 0,
      duration: 3,
      ease: "power2.in"
    });
  }
});

// ----- Animation Loop -----
let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  // If not launched, apply a slight bobbing effect
  if (!launched) {
    spaceship.position.y = Math.sin(time) * 0.2;
  }
  // Continuous slow rotation for a dynamic look
  spaceship.rotation.y += 0.005;

  renderer.render(scene, camera);
}
animate();

// ----- Handle Window Resize -----
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
