import * as THREE from "three";

export default class GalaxyCore {

  constructor() {

    this.group = new THREE.Group();


    this.create();

  }

  create() {

    const count = 18000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

const inner = new THREE.Color("#fff6d8");
    const outer = new THREE.Color("#e2b14a");
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {

        const i3 = i * 3;

        // توزيع كثيف فى المنتصف بدون حلقات
        const radius =
            Math.pow(Math.random(), 2.8) * 11;

        const angle =
            Math.random() * Math.PI * 2;

        // شكل بيضاوى خفيف
        const height =
            (Math.random() - 0.5) *
            (1.4 - radius * 0.09);

        positions[i3] =
            Math.cos(angle) * radius;

        positions[i3 + 1] =
            height;

        positions[i3 + 2] =
            Math.sin(angle) * radius;

        color.lerpColors(
            inner,
            outer,
            radius / 11
        );

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(
            colors,
            3
        )
    );

    const material = new THREE.PointsMaterial({

        size: 0.18,

        vertexColors: true,

        transparent: true,

        opacity: 0.18,

        depthWrite: false,

        blending: THREE.AdditiveBlending

    });

    this.points = new THREE.Points(
        geometry,
        material
    );

    this.group.add(this.points);

}

  update() {


    this.group.rotation.y += 0.0004;

  }

}