import * as THREE from "three";
import HeartConfig from "../config/HeartConfig";

export default class HeartSystem {

    constructor() {
        this.hover = 0;
        this.clickScale = 1;
        this.hoverAmount = 0;
        this.group = new THREE.Group();

        this.count = 2500;

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

        this.geometry =
            new THREE.BufferGeometry();

        this.create();

        this.geometry.setAttribute(

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

                opacity: 1.25,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending

            });

        this.points =
            new THREE.Points(

                this.geometry,

                this.material

            );

        this.points.position.y =
            HeartConfig.positionY;
            
        this.group.add(
            this.points
        );

    }

    create() {

        for (

            let i = 0;

            i < this.count;

            i++

        ) {

            const i3 = i * 3;

            // البداية من فوق الثقب الأسود

            this.positions[i3] =
    (Math.random() - 0.5) * 0.15;

this.positions[i3 + 1] =
    -16 +
    Math.random() * 1.0;

this.positions[i3 + 2] =
    (Math.random() - 0.5) * 0.15;

            // الهدف

            let x;
let y;

while (true) {

    x =
        (Math.random() - 0.5) * 2.4;

    y =
        (Math.random() - 0.5) * 2.4;

    const a =

        Math.pow(

            x * x +

            y * y -

            1,

            3

        )

        -

        x * x *

        Math.pow(

            y,

            3

        );

    if (

        a <= 0

    ) {

        // نخلى 40% بس من النقط
        // علشان يبقى شبه النجوم

        if (

            Math.random() >

            0.60

        ) {

            break;

        }

    }

}

const scale =
    HeartConfig.heartScale * 16.0;

this.targets[i3] =
    x * scale;

this.targets[i3 + 1] =
    y * scale;

this.targets[i3 + 2] =
    (Math.random() - 0.5) * 3.0;

            this.progress[i] =

                Math.random() * 0.15;

        }

    }
        update() {

        let completed = true;

        for (

            let i = 0;

            i < this.count;

            i++

        ) {

            const i3 = i * 3;

            if (

                this.progress[i] < 1

            ) {

                completed = false;

                this.progress[i] +=

                    0.004 +

                    Math.random() * 0.002;

                if (

                    this.progress[i] > 1

                ) {

                    this.progress[i] = 1;

                }

            }
this.hoverAmount = THREE.MathUtils.lerp(
    this.hoverAmount,
    this.hover ? 1 : 0,
    0.08
);
            const p =

                this.progress[i];

            this.positions[i3] +=

                (

                    this.targets[i3]

                    -

                    this.positions[i3]

                ) *

                p *

                0.055;

            this.positions[i3 + 1] +=

                (

                    this.targets[i3 + 1]

                    -

                    this.positions[i3 + 1]

                ) *

                p *

                0.055;

            this.positions[i3 + 2] +=

                (

                    this.targets[i3 + 2]

                    -

                    this.positions[i3 + 2]

                ) *

                p *

                0.055;;

        }

        if (

            completed

        ) {

            const t =

                performance.now()

                * 0.001;

        const pulse =
    1 +
    Math.sin(
        t *
        HeartConfig.pulseSpeed
    ) *
    HeartConfig.pulseStrength;

const target =
    1 + this.hoverAmount * 0.18;

const current =
    this.points.scale.x;

const scale =
    THREE.MathUtils.lerp(
        current,
        pulse * target,
        0.08
    );
this.clickScale =
    THREE.MathUtils.lerp(
        this.clickScale,
        1,
        0.10
    );
this.points.scale.set(
    scale * this.clickScale,
    scale * this.clickScale,
    scale * this.clickScale
);

const hoverColor =
    new THREE.Color(0xffb6d9);

const normalColor =
    new THREE.Color(0xff69b4);

this.material.color.copy(
    normalColor.lerp(
        hoverColor,
        this.hoverAmount
    )
);

this.material.opacity =
    THREE.MathUtils.lerp(
        this.material.opacity,
        1.25 + this.hoverAmount * 1.2,
        0.08
    );
this.material.color.set(
    this.hovered
        ? 0xff9fd6
        : 0xff69b4
);

this.material.opacity =
    this.hovered ? 1.8 : 1.25;

        }

        this.geometry.attributes.position.needsUpdate = true;

    }
    setHover(state) {

    this.hover =
        state ? 1 : 0;

}
pulse() {

    this.clickScale = 1.45;

}
}