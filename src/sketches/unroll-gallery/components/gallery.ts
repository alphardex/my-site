import * as THREE from "three";

import * as kokomi from "kokomi.js";

import gsap from "gsap";

import { Maku, MakuGroup, Scroller } from "maku.js";
import type { HTMLIVCElement } from "maku.js/types/types";

export interface GalleryConfig {
  elList: HTMLIVCElement[];
  vertexShader: string;
  fragmentShader: string;
  uniforms: { [uniform: string]: THREE.IUniform<any> };
}

const defaultVertexShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

varying vec2 vUv;

void main(){
    vec3 p=position;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
    
    vUv=uv;
}
`;

const defaultFragmentShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform sampler2D uTexture;

varying vec2 vUv;

void main(){
    vec4 tex=texture(uTexture,vUv);
    vec3 color=tex.rgb;
    gl_FragColor=vec4(color,1.);
}
`;

class Gallery extends kokomi.Component {
  elList: HTMLIVCElement[];
  vertexShader: string;
  fragmentShader: string;
  uniforms: { [uniform: string]: THREE.IUniform<any> };
  makuMaterial: THREE.ShaderMaterial | null;
  makuGroup: MakuGroup | null;
  scroller: Scroller | null;
  params: any;
  constructor(base: kokomi.Base, config: Partial<GalleryConfig> = {}) {
    super(base);

    const {
      elList = [...document.querySelectorAll("img")],
      vertexShader = defaultVertexShader,
      fragmentShader = defaultFragmentShader,
      uniforms = {},
    } = config;

    this.elList = elList;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.uniforms = uniforms;

    this.makuMaterial = null;
    this.makuGroup = null;
    this.scroller = null;
    this.params = {
      revealAngle: 15,
      revealDuration: 3,
      revealEase: "power2.out",
      revealStagger: 0.25,
    };
  }
  async addExisting(): Promise<void> {
    // Load all the images
    await kokomi.preloadImages();

    // Create a ShaderMaterial
    const makuMaterial = new THREE.ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        ...{
          uTexture: {
            value: null,
          },
          uTime: {
            value: 0,
          },
          uMouse: {
            value: new THREE.Vector2(0, 0),
          },
          uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
          uProgress: {
            value: 0,
          },
          uAngle: {
            value: THREE.MathUtils.degToRad(this.params.revealAngle),
          },
        },
        ...this.uniforms,
      },
    });
    this.makuMaterial = makuMaterial;

    // Make a MakuGroup that contains all the makus!
    const makuGroup = new MakuGroup();
    this.makuGroup = makuGroup;
    const makus = this.elList.map(
      (el) =>
        new Maku(el, makuMaterial, this.base.scene, { meshSizeType: "scale" })
    );
    makuGroup.addMultiple(makus);

    // Sync images positions
    makuGroup.setPositions();

    // Make a scroller
    const scroller = new Scroller();
    this.scroller = scroller;
    scroller.listenForScroll();
  }
  update(time: number): void {
    const makuGroup = this.makuGroup;
    const scroller = this.scroller;

    scroller?.syncScroll();
    makuGroup?.setPositions(scroller?.scroll.current);

    makuGroup?.makus.forEach((maku) => {
      const material = maku.mesh.material as THREE.ShaderMaterial;
      const uniforms = material.uniforms;
      uniforms.uTime.value = time / 1000;
      uniforms.uResolution.value = new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      );
      uniforms.uMouse.value = this.base.interactionManager.mouse;
    });
  }
  // 展开图片
  revealImage(maku: Maku) {
    const uProgress = (maku.mesh.material as any).uniforms.uProgress;
    gsap.to(uProgress, {
      value: 1,
      duration: this.params.revealDuration,
      ease: this.params.revealEase,
    });
  }
  // 展开多个图片
  revealMultipleImages(makus: Maku[], stagger = 0) {
    const alluProgress = makus.map(
      (obj) => (obj.mesh.material as THREE.ShaderMaterial).uniforms.uProgress
    );
    gsap.to(alluProgress, {
      value: 1,
      duration: this.params.revealDuration,
      ease: this.params.revealEase,
      stagger,
    });
  }
  // 收起图片
  hideImage(maku: Maku) {
    const uProgress = (maku.mesh.material as any).uniforms.uProgress;
    gsap.to(uProgress, {
      value: 0,
      duration: this.params.revealDuration,
      ease: this.params.revealEase,
    });
  }
  // 点击更改图片状态
  onClickToggleImages() {
    this.makuGroup?.makus.forEach((obj) => {
      obj.el.addEventListener("click", () => {
        const uProgress = (obj.mesh.material as any).uniforms.uProgress;
        if (uProgress.value < 0.5) {
          this.revealImage(obj);
        } else if (uProgress.value > 0.5) {
          this.hideImage(obj);
        }
      });
    });
  }
  start() {
    this.revealMultipleImages(this.makuGroup!.makus, this.params.revealStagger);
    this.onClickToggleImages();
  }
}

export { Gallery };
