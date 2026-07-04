import * as THREE from "three";

export default class RaycasterManager {

    constructor(camera, scene) {

        this.camera = camera;
        this.scene = scene;

        this.mouse = new THREE.Vector2();

        this.raycaster =
            new THREE.Raycaster();

        this.hovered = null;

        window.addEventListener(
            "mousemove",
            this.onMouseMove.bind(this)
        );

    }

    onMouseMove(event) {

        this.mouse.x =
            (event.clientX / window.innerWidth) * 2 - 1;

        this.mouse.y =
            -(event.clientY / window.innerHeight) * 2 + 1;

    }

    update(objects) {

        this.raycaster.setFromCamera(
            this.mouse,
            this.camera
        );

        const intersects =
            this.raycaster.intersectObjects(
                objects,
                false
            );

        if (this.hovered) {

            this.hovered.scale.set(
                15,
                15,
                1
            );

            this.hovered = null;

            document.body.style.cursor =
                "default";

        }

        if (intersects.length > 0) {

            this.hovered =
                intersects[0].object;

            this.hovered.scale.set(
                17,
                17,
                1
            );

            document.body.style.cursor =
                "pointer";

        }

    }

}