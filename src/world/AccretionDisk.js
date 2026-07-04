import * as THREE from "three";

export default class AccretionDisk {

  constructor() {

    this.group = new THREE.Group();

    this.create();

  }

  create() {

    const count = 5000;

    const positions = [];

    const colors = [];

    const color = new THREE.Color();

    const minDistance = 0.20;

    for (let i = 0; i < count; i++) {

    let x, z;
    let valid = false;

    for (let attempt = 0; attempt < 12; attempt++) {

        const radius =
    2.5 +
    Math.random() * 5.0;

        const angle =
            Math.random() *
            Math.PI * 2;

        x =
            Math.cos(angle) * radius;

        z =
            Math.sin(angle) * radius;

        valid = true;

        for (let j = 0; j < positions.length; j += 3) {

            const dx =
                x - positions[j];

            const dz =
                z - positions[j + 2];

            if (
                dx * dx +
                dz * dz <
                minDistance * minDistance
            ) {

                valid = false;
                break;

            }

        }

        if (valid) break;

    }

    if (!valid) continue;

    positions.push(
        x,
        (Math.random() - 0.5) * 0.03,
        z
    );

    color.setHSL(
        0.13,
        1,
        0.70
    );

    colors.push(
        color.r,
        color.g,
        color.b
    );

}

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(

      "position",

      new THREE.Float32BufferAttribute(

        positions,

        3

      )

    );

    geometry.setAttribute(

      "color",

      new THREE.Float32BufferAttribute(

        colors,

        3

      )

    );

    const material = new THREE.PointsMaterial({

      size: 0.35,

      vertexColors: true,

      transparent: true,

      opacity: 0.55,

      depthWrite: false,

      blending: THREE.AdditiveBlending

    });

    this.points = new THREE.Points(

      geometry,

      material

    );

    this.group.add(

      this.points

    );

  }

  update() {

    this.points.rotation.y += 0.08;

  }

}