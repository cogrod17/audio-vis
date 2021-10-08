import React, { createRef } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

let synthwave = [
  "#ff6c11",
  "#ff3864",
  "#2de2e6",
  "#261447",
  "#0d0221",
  "#1afe59",
];

let purple = `rgb(88, 93, 255)`;

const ranNum = (max, min = 0) => Math.random() * (max - min) + min;

class ThreeBall extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.audioData = props.audioData;
    this.animate = this.animate.bind(this);
    this.rotate = this.rotate.bind(this);
    this.frameSpeed = 0.0005;
    this.onResize = this.onResize.bind(this);
    this.changer = 0.01;
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.ref.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0, 10);
  }

  createControls() {
    this.controls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.rotateSpeed = 3;
    this.controls.noZoom = true;
  }

  addLight() {
    this.light = new THREE.DirectionalLight(synthwave[3], 5);
    const point = new THREE.PointLight({ color: synthwave[0] });
    this.scene.add(this.light, point);
  }

  animate() {
    let avg = this.props.audioData.length
      ? this.props.audioData.reduce((a, b) => a + b) /
        this.props.audioData.length
      : 0;
    let change = (avg / 255) * 1 + 1;

    this.sphere.scale.x = change;
    this.sphere.scale.y = change;
    this.sphere.scale.z = change;
    this.particleSphere.scale.z = (avg / 255) * 2 + 1;
    this.particleSphere.scale.y = (avg / 255) * 2 + 1;
    this.particleSphere.scale.x = (avg / 255) * 2 + 1;
    this.particleSphere2.scale.z = (avg / 255) * 3;
    this.particleSphere2.scale.y = (avg / 255) * 3;
    this.particleSphere2.scale.x = (avg / 255) * 3;
    this.torus.scale.x = (avg / 255) * 2.75;
    this.torus.scale.y = (avg / 255) * 2.75;
    this.torus.scale.z = (avg / 255) * 2.75;

    if (Math.abs(this.particles.scale.x) >= 1) this.changer = this.changer * -1;

    this.rotate();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  rotate() {
    this.sphere.rotation.y -= 0.005;
    this.scene.rotation.y += 0.00125;
    this.scene.rotation.z += 0.00125;
    this.particleSphere.rotation.y -= 0.00125;
    this.particleSphere.rotation.z -= 0.00125;
    this.particleSphere2.rotation.y += 0.00125;
    this.particleSphere2.rotation.z += 0.00125;
  }

  drawParticles() {
    let num = 4000;
    const arr = new Float32Array(num * 3);
    const geo = new THREE.BufferGeometry();
    const mat = new THREE.PointsMaterial({
      color: purple,
      size: 0.1,
      opacity: 0,
    });

    let length = num * 3;
    for (let i = 0; i < length; i++) {
      arr[i] = ranNum(12, -12);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  drawSphere() {
    const geometry = new THREE.IcosahedronGeometry(2, 100);
    const material = new THREE.MeshPhongMaterial({
      color: synthwave[3],
      wireframe: true,
      shininess: 30,
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);
  }

  particleSphere() {
    const geo = new THREE.IcosahedronGeometry(2, 10, 20);
    const geo2 = new THREE.IcosahedronGeometry(2, 20, 10);
    const mat = new THREE.PointsMaterial({
      color: synthwave[5],
      size: 0.05,
    });
    const mat2 = new THREE.PointsMaterial({
      color: synthwave[1],
      size: 0.05,
    });
    this.particleSphere2 = new THREE.Points(geo2, mat2);
    this.particleSphere = new THREE.Points(geo, mat);
    this.scene.add(this.particleSphere, this.particleSphere2);
  }

  drawCircle() {
    const geo = new THREE.IcosahedronGeometry(2, 10, 20);
    const mat = new THREE.PointsMaterial({
      color: synthwave[0],
      size: 0.05,
    });
    this.torus = new THREE.Points(geo, mat);

    this.scene.add(this.torus);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  componentDidMount() {
    this.init();
    this.createControls();
    this.drawSphere();
    this.particleSphere();
    this.drawCircle();
    this.addLight();
    this.drawParticles();
    window.addEventListener("resize", this.onResize);
    this.animate();
  }

  componentDidUpdate() {
    this.animate();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    return <div ref={(ref) => (this.ref = ref)} id="threed" />;
  }
}

export default ThreeBall;

/* for later
drawStars() {
    let particles = [];
    const count = 100;
    const geo = new THREE.SphereBufferGeometry(0.01);
    const mat = new THREE.MeshBasicMaterial({ color: "white", size: 10 });

    for (let i = 0; i < count; i++) {
      let particle = new THREE.Mesh(geo, mat);
      particle.position.set(ranNum(10, -10), ranNum(10, 1), ranNum(20));
      // particles.push(particle);
      this.scene.add(particle);
    }
  }

   travelingSphere() {
    const geometry = new THREE.SphereGeometry(40, 100, 100);

    const material = new THREE.MeshPhongMaterial({
      color: synthwave[3],
      shininess: 20,
      // metal: true
      // flatShading: true,
    });

    this.travelingSphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.travelingSphere);
    this.travelingSphere.position.set(0, -40, 0);
    this.travelingSphere.rotation.z = 20;
    // this.travelingSphere.scale.x;
  }

  addFrame() {
    const geometry = new THREE.SphereGeometry(40.017, 150, 150);
    const material = new THREE.MeshPhongMaterial({
      color: synthwave[2],
      shininess: 50,
      // metal: true,
      wireframe: true,
    });
    this.frame = new THREE.Mesh(geometry, material);
    this.scene.add(this.frame);
    this.frame.position.set(0, -40, 0);
    this.frame.rotation.z = 20;
  }

   drawPlane() {
    const geometry = new THREE.PlaneGeometry(40, 40, 20, 20);

    const material = new THREE.MeshBasicMaterial({
      color: synthwave[0],
      side: THREE.DoubleSide,
      wireframe: true,
    });

    this.plane = new THREE.Mesh(geometry, material);

    this.scene.add(this.plane);
    this.plane.rotation.x = 300;
    this.plane.position.y = -1;
  }


*/
