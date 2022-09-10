import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import fragmentShader1 from "./shaders/fragment1.glsl";

import * as dat from "lil-gui";

// console.log(model);
/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

/**
 * texture
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/textures/island.jpg");
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;

// Scene
const scene = new THREE.Scene();

/**
 * Icosahedron
 */
// Geometry

// Material
const geometry = new THREE.IcosahedronGeometry(1, 1);
const geometry1 = new THREE.IcosahedronBufferGeometry(1.001, 1);

let lenght = geometry1.attributes.position.array.length;

let barry = [];

for (let i = 0; i < lenght / 3; i++) {
  barry.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
}

let aBarry = new Float32Array(barry);

geometry1.setAttribute("aBarry", new THREE.BufferAttribute(aBarry, 3));

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  // wireframe: true,
  uniforms: {
    uTexture: { value: texture },
    uTime: { value: 0 },
  },
});
const material1 = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader1,
});
const mesh = new THREE.Mesh(geometry, material);
const lines = new THREE.Mesh(geometry1, material1);
scene.add(mesh);
scene.add(lines);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setClearColor("#000000");
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.x = elapsedTime * 0.05;
  mesh.rotation.y = elapsedTime * 0.05;
  lines.rotation.x = elapsedTime * 0.05;
  lines.rotation.y = elapsedTime * 0.05;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
