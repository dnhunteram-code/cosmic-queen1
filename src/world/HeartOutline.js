import * as THREE from "three";
import HeartConfig from "../config/HeartConfig";

export default class HeartOutline {

    constructor() {
this.hover = 0;
this.clickScale = 1;
        this.group = new THREE.Group();

        this.count = 10000;

        this.positions =
    new Float32Array(
        this.count * 3
    );

this.targets =
    new Float32Array(
        this.count * 3
    );

this.progress =
    new Float32Array(
        this.count
    );


        const geometry =
            new THREE.BufferGeometry();

        for (

    let i = 0;

    i < this.count;

    i++

) {

    const i3 = i * 3;

    // البداية من أسفل القلب

    this.positions[i3] =
    (Math.random() - 0.5) * 0.15;

this.positions[i3 + 1] =
    -16 +
    Math.random() * 1.0;

this.positions[i3 + 2] =
    (Math.random() - 0.5) * 0.15;

    // الهدف

    const t =

        Math.random() *

        Math.PI * 2;

        // زى القلب
if (

    Math.random() < 0.50

) {

    continue;

}

    const x =

        16 *

        Math.pow(

            Math.sin(t),

            3

        );

    const y =

        13 *

        Math.cos(t)

        -

        5 *

        Math.cos(2 * t)

        -

        2 *

        Math.cos(3 * t)

        -

        Math.cos(4 * t);

    const len =

        Math.sqrt(

            x * x +

            y * y

        ) + 0.00001;

    const nx = x / len;

    const ny = y / len;

    const offset =

    HeartConfig.outlineOffset +

    0.42 +

    (Math.random() - 0.5) * 0.08;

    const tangentX = -ny;
const tangentY = nx;

// مقدار التبعيد
const spread = (Math.random() - 0.5) * 0.45;

const width = 1.70;

this.targets[i3] =

    x *

    HeartConfig.heartScale *

    width +

    nx * offset +

    (Math.random() - 0.5) * 1.5;

this.targets[i3 + 1] =

    y *

(HeartConfig.heartScale * 1.70) +

    ny * offset +

    tangentY * spread;
    this.targets[i3 + 2] =
    (Math.random() - 0.5) * 3.6;
    
    this.progress[i] =

        Math.random() * 0.15;

}

        geometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

        this.positions,

        3

    )

);

        this.material =
            new THREE.PointsMaterial({

                color: 0xff69b4,
                size: 0.28,
                transparent: true,

                opacity: 0.55,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending

            });

        this.points =
            new THREE.Points(

                geometry,

                this.material

            );

        this.points.position.y =
            HeartConfig.positionY;

        this.group.add(
            this.points
        );

    }

    update() {

    const t =
        performance.now() * 0.001;

    this.clickScale = THREE.MathUtils.lerp(
    this.clickScale,
    1,
    0.10
);

const hoverScale = THREE.MathUtils.lerp(
    this.group.scale.x,
    this.hover ? 1.18 : 1,
    0.08
);

this.group.scale.set(
    hoverScale * this.clickScale,
    hoverScale * this.clickScale,
    hoverScale * this.clickScale
);

    for (

        let i = 0;

        i < this.count;

        i++

    ) {

        const i3 = i * 3;

        if (

            this.progress[i] < 1

        ) {

            this.progress[i] +=

                0.004 +

                Math.random() * 0.002;

        }

        const p =

            this.progress[i];

        this.positions[i3] +=

            (

                this.targets[i3]

                -

                this.positions[i3]

            ) *

            p *

            0.08;

        this.positions[i3 + 1] +=

            (

                this.targets[i3 + 1]

                -

                this.positions[i3 + 1]

            ) *

            p *

            0.08;

        this.positions[i3 + 2] +=

            (

                this.targets[i3 + 2]

                -

                this.positions[i3 + 2]

            ) *

            p *

            0.08;

    }

    this.points.geometry
        .attributes.position
        .needsUpdate = true;

}
setHover(state) {

    this.hover = state ? 1 : 0;

}

pulse() {

    this.clickScale = 1.45;

}
}