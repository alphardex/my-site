import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { point2Array } from "./math";

// 从mesh上取样微粒位置信息
const sampleParticlesPositionFromMesh = (
  geometry: THREE.BufferGeometry,
  count = 10000
) => {
  const material = new THREE.MeshBasicMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  const sampler = new MeshSurfaceSampler(mesh).build();
  const particlesPosition = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const position = new THREE.Vector3();
    sampler.sample(position);
    particlesPosition.set(point2Array(position), i * 3);
  }
  return particlesPosition;
};

export { sampleParticlesPositionFromMesh };
