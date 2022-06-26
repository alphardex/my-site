import * as kokomi from "kokomi.js";

import mainVertexShader from "./shaders/main/vertex.glsl";
import mainFragmentShader from "./shaders/main/fragment.glsl";

import { Gallery } from "./components/gallery";

class Sketch extends kokomi.Base {
  gallery!: Gallery;
  async create() {
    const screenCamera = new kokomi.ScreenCamera(this);
    screenCamera.addExisting();

    const gallary = new Gallery(this, {
      vertexShader: mainVertexShader,
      fragmentShader: mainFragmentShader,
    });
    await gallary.addExisting();
    this.gallery = gallary;
  }
}

const createSketch = (sel = "#sketch") => {
  const sketch = new Sketch(sel);
  sketch.create();
  return sketch;
};

export default createSketch;
