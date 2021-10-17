import * as THREE from "three";
import * as dat from "dat.gui";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry";
import { Base } from "./base";
import twistedShapeVertexShader from "../shaders/twistedShape/vertex.glsl";
import twistedShapeFragmentShader from "../shaders/twistedShape/fragment.glsl";
import { sphube } from "@/utils/math";

class TwistedShape extends Base {
  clock!: THREE.Clock;
  material!: THREE.ShaderMaterial;
  currentAxis!: string;
  colorParams!: any;
  constructor(sel: string, debug: boolean) {
    super(sel, debug);
    this.clock = new THREE.Clock();
    this.cameraPosition = new THREE.Vector3(0, 0, 3);
    this.currentAxis = "x";
    this.colorParams = {
      color: "#242574",
    };
  }
  // 初始化
  init() {
    this.createScene();
    this.createPerspectiveCamera();
    this.createRenderer();
    this.createTwistedMaterial();
    this.createTwistedShape();
    this.createLight();
    this.createOrbitControls();
    // this.createDebugPanel();
    this.addListeners();
    this.setLoop();
  }
  // 创建扭曲材质
  createTwistedMaterial() {
    const material = new THREE.ShaderMaterial({
      vertexShader: twistedShapeVertexShader,
      fragmentShader: twistedShapeFragmentShader,
      uniforms: {
        uTime: {
          value: 0, // 时间
        },
        uMouse: {
          value: new THREE.Vector2(0, 0), // 鼠标位置
        },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight), // 分辨率
        },
        uColor: {
          value: new THREE.Color(this.colorParams.color), // 颜色
        },
        uAxis: {
          value: new THREE.Vector3(1, 0, 0), // 旋转轴
        },
        uVelocity: {
          value: 0.3, // 旋转速度
        },
        uDistortion: {
          value: 3, // 扭曲程度
        },
      },
    });
    this.material = material;
  }
  // 创建扭曲图形
  createTwistedShape() {
    const geometry = new ParametricGeometry(sphube, 400, 400);
    const material = this.material;
    this.createMesh({ geometry, material });
  }
  // 动画
  update() {
    const elapsedTime = this.clock.getElapsedTime();
    if (this.material) {
      this.material.uniforms.uTime.value = elapsedTime;
    }
  }
  // 创建调试面板
  createDebugPanel() {
    const { material } = this;
    const gui = new dat.GUI();
    gui.add(material.uniforms.uAxis.value, "x").min(0).max(1).step(1).name("X");
    gui.add(material.uniforms.uAxis.value, "y").min(0).max(1).step(1).name("Y");
    gui
      .add(material.uniforms.uVelocity, "value")
      .min(0)
      .max(2)
      .step(0.01)
      .name("velocity");
    gui
      .add(material.uniforms.uDistortion, "value")
      .min(0)
      .max(5)
      .step(0.01)
      .name("distortion");
  }
}

export default TwistedShape;
