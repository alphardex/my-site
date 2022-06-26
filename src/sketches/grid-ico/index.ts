import * as THREE from "three";

import * as kokomi from "kokomi.js";

import Icosahedron from "./components/icosahedron/icosahedron";

class Sketch extends kokomi.Base {
  ico!: Icosahedron;
  create() {
    this.camera.position.z = 2.2;

    const ico = new Icosahedron(this);
    ico.addExisting();
    this.ico = ico;
  }
}

const createSketch = (sel = "#sketch") => {
  const sketch = new Sketch(sel);
  sketch.create();
  return sketch;
};

export default createSketch;
