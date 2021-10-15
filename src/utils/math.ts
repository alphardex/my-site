import * as THREE from "three";
import * as CANNON from "cannon-es";

const calcAspect = (el: HTMLElement) => el.clientWidth / el.clientHeight;

// 三维点
class Point {
  x: number;
  y: number;
  z: number;
  constructor(p) {
    this.x = p.x;
    this.y = p.y;
    this.z = p.z;
  }
}

// 数组转化为点
const array2Point = (arr) => new Point({ x: arr[0], y: arr[1], z: arr[2] });

// 点转化为数组
const point2Array = (point) => [point.x, point.y, point.z];

// 多个数组转化为多个点
const arrays2Point = (arrs) => arrs.map((item) => array2Point(item));

// 点转化为Three.js的向量
const point2ThreeVector = (point) =>
  new THREE.Vector3(point.x, point.y, point.z);

// 点转化为Cannon.js的向量
const point2CannonVec = (point) => new CANNON.Vec3(point.x, point.y, point.z);

// 2PI
const TAU = 2 * Math.PI;

// https://arxiv.org/pdf/1604.02174.pdf
const sphube = (u1, v1, target) => {
  const s = 0.6;
  const r = 1;
  const theta = 2 * u1 * Math.PI;
  const phi = v1 * 2 * Math.PI;

  const u = Math.cos(theta) * Math.cos(phi);
  const v = Math.cos(theta) * Math.sin(phi);
  const w = Math.sin(theta);

  const z = (r * u) / Math.sqrt(1 - s * v ** 2 - s * w ** 2);
  const x = (r * v) / Math.sqrt(1 - s * u ** 2 - s * w ** 2);
  const y = (r * w) / Math.sqrt(1 - s * Math.cos(theta) ** 2);

  target.set(x, y, z);
};

const percent = (value: number, total: number) => (value / total) * 100;

export {
  calcAspect,
  Point,
  array2Point,
  point2Array,
  arrays2Point,
  point2ThreeVector,
  point2CannonVec,
  TAU,
  sphube,
  percent,
};
