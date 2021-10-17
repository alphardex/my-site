import * as THREE from "three";

export interface MeshObject {
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  position?: THREE.Vector3;
}

export interface PerspectiveCameraParams {
  fov?: number;
  near?: number;
  far?: number;
}

export interface OrthographicCameraParams {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  zoom?: number;
  near?: number;
  far?: number;
}
