import * as THREE from "three";
import HeartConfig from "../config/HeartConfig";

export default class HeartHitArea {

    constructor() {

        this.group = new THREE.Group();

        const shape = new THREE.Shape();

        let first = true;

        for (let i = 0; i <= 150; i++) {

            const t = (i / 150) * Math.PI * 2;

            const x = 16 * Math.pow(Math.sin(t), 3);

            const y =
                13 * Math.cos(t)
                - 5 * Math.cos(2 * t)
                - 2 * Math.cos(3 * t)
                - Math.cos(4 * t);

            const px = x * HeartConfig.heartScale * 1.15;
            const py = y * HeartConfig.heartScale * 1.15;

            if (first) {

                shape.moveTo(px, py);
                first = false;

            } else {

                shape.lineTo(px, py);

            }

        }

        const geometry =
            new THREE.ShapeGeometry(shape);

        const material =
            new THREE.MeshBasicMaterial({

                transparent: true,
                opacity: 0,

                depthWrite: false

            });

        this.mesh =
            new THREE.Mesh(
                geometry,
                material
            );

        this.mesh.position.y =
            HeartConfig.positionY;

        this.group.add(this.mesh);

    }

}