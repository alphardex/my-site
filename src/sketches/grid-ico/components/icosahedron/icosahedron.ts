import * as THREE from "three";
import * as kokomi from "kokomi.js";
import gsap from "gsap";

import icoTexture from "./assets/sky.jpg";
import shapeVertexShader from "./shaders/shape/vertex.glsl";
import shapeFragmentShader from "./shaders/shape/fragment.glsl";
import edgeVertexShader from "./shaders/edge/vertex.glsl";
import edgeFragmentShader from "./shaders/edge/fragment.glsl";
import { getBaryCoord } from "./utils";

import ky from "kyouka";

class Icosahedron extends kokomi.Component {
  am: kokomi.AssetManager;
  ico: THREE.Group | null;
  shapeMaterial: THREE.ShaderMaterial | null;
  edgeMaterial: THREE.ShaderMaterial | null;
  constructor(base: kokomi.Base) {
    super(base);

    this.am = new kokomi.AssetManager(base, [
      {
        name: "icoTexture",
        type: "texture",
        path: icoTexture,
      },
    ]);
    this.ico = null;
    this.shapeMaterial = null;
    this.edgeMaterial = null;
  }
  // 初始化
  addExisting() {
    this.am.on("ready", () => {
      this.createIco();
      this.createShapeMaterial();
      this.createIcoShape();
      this.createEdgeMaterial();
      this.createIcoEdge();
    });
  }
  // 创建图形组
  createIco() {
    const ico = new THREE.Group();
    this.ico = ico;
    this.base.scene.add(ico);
  }
  // 创建图形材质
  createShapeMaterial() {
    const texture = this.am.items["icoTexture"];
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    const shapeMaterial = new THREE.ShaderMaterial({
      vertexShader: shapeVertexShader,
      fragmentShader: shapeFragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {
          value: 0,
        },
        uMouse: {
          value: new THREE.Vector2(0, 0),
        },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uTexture: {
          value: texture,
        },
        uRefractionStrength: {
          value: 0,
        },
        uRandomEnabled: {
          value: 1,
        },
        uNoiseDensity: {
          value: 0,
        },
      },
    });
    this.shapeMaterial = shapeMaterial;
  }
  // 创建二十面体图形
  createIcoShape() {
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = this.shapeMaterial!;
    const mesh = new THREE.Mesh(geometry, material);
    this.base.scene.add(mesh);
    this.ico?.add(mesh);
  }
  // 创建边框材质
  createEdgeMaterial() {
    const edgeMaterial = new THREE.ShaderMaterial({
      vertexShader: edgeVertexShader,
      fragmentShader: edgeFragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {
          value: 0,
        },
        uMouse: {
          value: new THREE.Vector2(0, 0),
        },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uWidth: {
          value: 1,
        },
        uNoiseDensity: {
          value: 0,
        },
      },
    });
    this.edgeMaterial = edgeMaterial;
  }
  // 创建二十面体边框
  createIcoEdge() {
    const geometry = new THREE.IcosahedronGeometry(1.001, 1);
    getBaryCoord(geometry);
    const material = this.edgeMaterial;
    const mesh = new THREE.Mesh(geometry, material!);
    this.base.scene.add(mesh);
    this.ico?.add(mesh);
  }
  // 动画
  update(time: number) {
    const elapsedTime = time / 1000;
    if (this.ico) {
      this.ico.rotation.x = elapsedTime / 15;
      this.ico.rotation.y = elapsedTime / 15;
    }
  }
  //取消随机
  disableRandom() {
    const uniforms = this.shapeMaterial?.uniforms;
    if (uniforms) {
      uniforms.uRandomEnabled.value = 0;
    }
  }
  //开启随机
  enableRandom() {
    const uniforms = this.shapeMaterial?.uniforms;
    if (uniforms) {
      uniforms.uRandomEnabled.value = 1;
    }
  }
}

export default Icosahedron;
