import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class ControlsManager {

    constructor(camera, renderer) {

        this.controls = new OrbitControls(

            camera,

            renderer.domElement

        );

        this.controls.enableDamping = true;

        this.controls.dampingFactor = 0.05;

        this.controls.enabled = false;

        this.controls.enablePan = true;

        this.controls.enableZoom = true;

        this.controls.enableRotate = true;

    }

    enable() {

        this.controls.enabled = true;

    }

    disable() {

        this.controls.enabled = false;

    }

    update() {

        if (!this.controls.enabled) return;

        this.controls.update();

    }

}