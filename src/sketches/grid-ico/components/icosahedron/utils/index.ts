import * as THREE from "three";

// 获取重心坐标系
const getBaryCoord = (bufferGeometry: THREE.BufferGeometry) => {
  // https://gist.github.com/mattdesl/e399418558b2b52b58f5edeafea3c16c
  const length = bufferGeometry.attributes.position.array.length;
  const count = length / 3;
  const bary = [];
  for (let i = 0; i < count; i++) {
    bary.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
  }
  const aCenter = new Float32Array(bary);
  bufferGeometry.setAttribute("aCenter", new THREE.BufferAttribute(aCenter, 3));
};

export { getBaryCoord };
