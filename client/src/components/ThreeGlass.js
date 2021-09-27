import React, { Component, createRef } from "react";
import * as THREE from "three";

import test from "../textures/darkMetal4.png";

const ranNum = (max, min = 0) => Math.random() * (max - min) + min;

class ThreeGlass extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.audioData = props.audioData;
    this.onResize = this.onResize.bind(this);
    this.animate = this.animate.bind(this);
    this.change = 0.005;
    this.drawTriangles = this.drawTriangles.bind(this);
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      100,
      4000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.ref.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0, 1500);
    this.scene.add(new THREE.AmbientLight(0x444444));

    //////////////////////////////////////////////////////////
    this.spotlight = new THREE.PointLight("rgb(100,0,0)", 3);
    this.spotlight.position.set(1000, -1000, -750);
    this.scene.add(this.spotlight);
    this.spotlight2 = new THREE.PointLight("rgb(0, 100, 100)", 3);
    this.spotlight2.position.set(-1000, 1000, -750);
    this.scene.add(this.spotlight2);
    //////////////////////////////////////////////////////////
    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-1, -1, 1);
    this.scene.add(light2);
    ////////////////////////////////////////////////////////
  }

  drawTriangles(spread) {
    let count = 3000;
    this.geo = new THREE.BufferGeometry();
    this.positions = new Float32Array(count * 3 * 3);
    this.normals = new Float32Array(count * 3 * 3);
    this.colors = new Float32Array(count * 3 * 3);
    const color = new THREE.Color();

    //triangle spread
    const n = spread;
    const n2 = n / 2;

    //triangle size
    const d = 80;
    const d2 = d / 2;

    const pA = new THREE.Vector3();
    const pB = new THREE.Vector3();
    const pC = new THREE.Vector3();

    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();

    let l = this.positions.length;
    for (let i = 0; i < l; i += 9) {
      const x = Math.random() * n - n2;
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;

      const ax = x + Math.random() * d - d2;
      const ay = y + Math.random() * d - d2;
      const az = z + Math.random() * d - d2;

      const bx = x + Math.random() * d - d2;
      const by = y + Math.random() * d - d2;
      const bz = z + Math.random() * d - d2;

      const cx = x + Math.random() * d - d2;
      const cy = y + Math.random() * d - d2;
      const cz = z + Math.random() * d - d2;

      this.positions[i] = ax;
      this.positions[i + 1] = ay;
      this.positions[i + 2] = az;

      this.positions[i + 3] = bx;
      this.positions[i + 4] = by;
      this.positions[i + 5] = bz;

      this.positions[i + 6] = cx;
      this.positions[i + 7] = cy;
      this.positions[i + 8] = cz;

      pA.set(ax, ay, az);
      pB.set(bx, by, bz);
      pC.set(cx, cy, cz);

      //   console.log(pA);

      cb.subVectors(pC, pB);
      ab.subVectors(pA, pB);
      cb.cross(ab);

      cb.normalize();

      const nx = cb.x;
      const ny = cb.y;
      const nz = cb.z;

      this.normals[i] = nx;
      this.normals[i + 1] = ny;
      this.normals[i + 2] = nz;

      this.normals[i + 3] = nx;
      this.normals[i + 4] = ny;
      this.normals[i + 5] = nz;

      this.normals[i + 6] = nx;
      this.normals[i + 7] = ny;
      this.normals[i + 8] = nz;

      const vx = x / n + 0.5;
      const vy = y / n + 0.5;
      const vz = z / n + 0.5;

      color.setRGB(vx, vy, vz);

      this.colors[i] = color.r;
      this.colors[i + 1] = color.g;
      this.colors[i + 2] = color.b;

      this.colors[i + 3] = color.r;
      this.colors[i + 4] = color.g;
      this.colors[i + 5] = color.b;

      this.colors[i + 6] = color.r;
      this.colors[i + 7] = color.g;
      this.colors[i + 8] = color.b;
    }
    this.geo.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.geo.setAttribute("normal", new THREE.BufferAttribute(this.normals, 3));
    this.geo.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    this.geo.computeBoundingSphere();

    let mat = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      specular: 0xffffff,
      shininess: 250,
      side: THREE.DoubleSide,
      vertexColors: true,
    });

    this.mesh = new THREE.Mesh(this.geo, mat);

    this.scene.add(this.mesh);
  }

  drawBall() {
    let texture = new THREE.TextureLoader().load(test);
    let geo = new THREE.SphereGeometry(150);
    let ballMat = new THREE.MeshStandardMaterial({
      normalMap: texture,
      metalness: 0.9,
      roughness: 0.5,
      color: 0x292929,
    });

    this.ballMesh = new THREE.Mesh(geo, ballMat);
    this.scene.add(this.ballMesh);
  }

  animate(audioData) {
    this.mesh.rotation.y += 0.0015;
    this.ballMesh.rotation.y += 0.006;

    let avg = audioData.length
      ? audioData.reduce((a, b) => a + b) / audioData.length
      : 0;

    this.mesh.scale.x = (avg / 255) * 0.5 + 1;
    this.mesh.scale.y = (avg / 255) * 0.5 + 1;
    this.mesh.scale.z = (avg / 255) * 0.5 + 1;

    this.ballMesh.scale.x = (avg / 255) * 2 + 1;
    this.ballMesh.scale.y = (avg / 255) * 2 + 1;
    this.ballMesh.scale.z = (avg / 255) * 2 + 1;
    // window.requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  componentDidMount() {
    this.init();
    this.drawTriangles(4000);
    this.drawBall();
    window.addEventListener("resize", this.onResize);
    this.animate(this.audioData);
  }

  componentDidUpdate() {
    this.animate(this.audioData);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    return <div ref={(ref) => (this.ref = ref)} id="threed" />;
  }
}

export default ThreeGlass;
