import * as THREE from "three";

export interface MeshObject {
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  position?: THREE.Vector3;
}

export interface Scroll {
  current: number;
  target: number;
  ease: number;
  last: number;
  delta: number;
  direction: "up" | "down" | "";
}

export type MeshType = "mesh" | "points";

export type MeshSizeType = "size" | "scale";

export type HTMLIVCElement =
  | HTMLImageElement
  | HTMLVideoElement
  | HTMLCanvasElement;
