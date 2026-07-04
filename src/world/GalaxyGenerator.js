import * as THREE from "three";
import GalaxyConfig from "../config/GalaxyConfig";

export default class GalaxyGenerator {

  constructor() {

    this.group = new THREE.Group();
    this.reveal = 0;
    this.create();

  }

  create() {

const armCount = 10000;

// عدد نجوم السحابة لكل نجمة
const cloudPerStar = 5;

// إجمالى النجوم
const maxCloudPerStar =
    cloudPerStar + 4;

const count =
    armCount *
    (maxCloudPerStar + 18);

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

const white = new THREE.Color("#f3e6cf");
const gold = new THREE.Color("#c7892f");
const purple = new THREE.Color("#6d55c9");
const blue = new THREE.Color("#3c72e6");
    const color = new THREE.Color();

    const brightness =
    () =>
        THREE.MathUtils.lerp(
            0.75,
            1.15,
            Math.pow(
                Math.random(),
                0.55
            )
        );

    const startRadius = 14;
let index = armCount;
for (let i = 0; i < armCount; i++) {
        const i3 = i * 3;

        // يبدأ من بعد القرص البرتقالي مباشرة
        const armRadius = GalaxyConfig.radius * 0.92;

// توزيع الكثافة على طول الذراع
const radius =

    startRadius +

    Math.pow(
        Math.random(),
        1.8
    ) *

    (armRadius - startRadius);
        // اختيار الذراع
        const arm =
            Math.floor(
                Math.random() *
                GalaxyConfig.arms
            );

        const armAngle =
    arm *
    (
        Math.PI * 2 /
        GalaxyConfig.arms
    );

    // مركز بداية الذراع

const rootRadius =
    startRadius + 8.5;

const rootAngle =

    armAngle +

    rootRadius *

    GalaxyConfig.spiralFactor;

const rootX =
    Math.cos(rootAngle) *
    rootRadius;

const rootZ =
    Math.sin(rootAngle) *
    rootRadius;
        // لف الذراع
        let angle =
    armAngle +
    radius *
    GalaxyConfig.spiralFactor;
        // بداية الذراع رفيعة ثم تتفتح
        const t =
    radius /
    GalaxyConfig.radius;


const armProgress =

    (radius - startRadius) /

    (armRadius - startRadius);
       // الذراع أعرض فى البداية ويضيق للخارج

const sigma =
    THREE.MathUtils.lerp(

        0.012,

        0.20,

        Math.pow(
            armProgress,
            0.9
        )

    );
// توزيع Gaussian حقيقى
let gaussian = 0;

for (let k = 0; k < 6; k++) {

    gaussian += Math.random();

}

gaussian = (gaussian / 6 - 0.5) * 2;

const uniform =
    (Math.random() - 0.5) * 2;
gaussian =
    THREE.MathUtils.lerp(

        gaussian,

        uniform,

        THREE.MathUtils.lerp(

            0.10,

            1.0,

            Math.pow(
                armProgress,
                1.8
            )

        )

    );

angle +=

    gaussian *

    sigma *

    THREE.MathUtils.lerp(
        0.55,
        0.20,
        t
    );

angle +=

    (Math.random() - 0.5) *

    THREE.MathUtils.lerp(
        0.08,
        0.02,
        t
    );
        // نجوم بين الأذرع
        if (

    armProgress > 0.45 &&

    Math.random() <

    THREE.MathUtils.smoothstep(
        armProgress,
        0.45,
        1.0
    ) * 0.75

) {

    angle =

        Math.random() *

        Math.PI * 2;

}

    

const armWidth =

    THREE.MathUtils.lerp(

        2.8,

        16.0,

        Math.pow(
            armProgress,
            1.2
        )

    );
const radialSpread =

    THREE.MathUtils.lerp(
        2.5,
        0.8,
        Math.pow(t, 0.75)
    );

const offset =

    gaussian *

    armWidth +

    (Math.random() - 0.5) *

    THREE.MathUtils.lerp(

        0.3,

        12.0,

        Math.pow(
            armProgress,
            2.0
        )

    );


  const blur =

    (Math.random() - 0.5) *

    THREE.MathUtils.lerp(
        12.0,
        4.0,
        Math.pow(t, 0.55)
    );
    const edgeNoise =

    (Math.random() - 0.5) *

    THREE.MathUtils.lerp(

        0.4,

        5.5,

        Math.pow(
            armProgress,
            1.3
        )

    );

    

        const randomX =
    gaussian *
    0.18;

const randomZ =
    gaussian *
    0.18;
       positions[i3] =
    Math.cos(angle) * radius +
    Math.cos(angle + Math.PI / 2) *
    (offset + edgeNoise + blur) +
    randomX;
    
        // Gaussian على محور Y
let gaussianY = 0;

for (let k = 0; k < 6; k++) {

    gaussianY += Math.random();

}

gaussianY =
    (gaussianY / 6 - 0.5) * 2;

// السمك يقل للخارج
const thickness =
    THREE.MathUtils.lerp(
        2.0,
        0.12,
        Math.pow(t, 1.15)
    );

// نجوم قليلة بعيدة عن مستوى المجرة
const flare =

    Math.pow(
        Math.random(),
        3.0
    ) *

    THREE.MathUtils.lerp(
        8.0,
        2.0,
        t
    );

positions[i3 + 1] =

    gaussianY *
    thickness +

    (Math.random() < 0.12
        ? (Math.random() < 0.5 ? -flare : flare)
        : 0);

        positions[i3 + 2] =
    Math.sin(angle) * radius +
    Math.sin(angle + Math.PI / 2) *
    (offset + edgeNoise + blur) +
    randomZ;

    // جذب النجوم لأول الذراع

const rootBlend =

    Math.pow(

        1 -

        THREE.MathUtils.smoothstep(
            armProgress,
            0.0,
            0.45
        ),

        2.2

    );

positions[i3] =

    THREE.MathUtils.lerp(

        positions[i3],

        rootX,

        rootBlend * 0.90

    );

positions[i3 + 2] =

    THREE.MathUtils.lerp(

        positions[i3 + 2],

        rootZ,

        rootBlend * 0.72

    );

    if (Math.random() < 0.35) {

    positions[i3] +=
        (Math.random() - 0.5) *
        THREE.MathUtils.lerp(
            6.0,
            2.0,
            t
        );

    positions[i3 + 2] +=
        (Math.random() - 0.5) *
        THREE.MathUtils.lerp(
            6.0,
            2.0,
            t
        );

}

        const u =
    radius /
    GalaxyConfig.radius;

if (u < 0.12) {

    color.lerpColors(
        white,
        gold,
        u / 0.12
    );

}
else if (u < 0.72) {

    color.lerpColors(
        gold,
        purple,
        (u - 0.12) / 0.60
    );

}
else {

    const blueFade =
        THREE.MathUtils.smoothstep(
            u,
            0.72,
            1.0
        );

    color.lerpColors(
        purple,
        blue,
        blueFade
    );

}

   // توهج أول 20-25% من الذراع فقط
// لمعان منتصف الذراع
const armCenter =

    THREE.MathUtils.lerp(

        0.85,

        0.55,

        Math.abs(gaussian)

    );

// نسبة التقدم داخل الذراع
const armT =

    (radius - startRadius) /

    (armRadius - startRadius);

    const armStartFade =

    THREE.MathUtils.smoothstep(
        armT,
        0.02,
        0.12
    );
// توهج أول 25% فقط
// توهج قوى لأول 25% من الذراع
const coreGlow =

    THREE.MathUtils.lerp(

        4.5,

        0.90,

        THREE.MathUtils.smoothstep(
            armProgress,
            0.0,
            0.18
        )

    );

// الذراع نفسه يبهت تدريجياً
const armGlow =

    coreGlow *

    armCenter *

    armStartFade;

const starBrightness =

    THREE.MathUtils.lerp(

        0.82,

        1.22,

        Math.pow(
            Math.random(),
            1.4
        )

    );

const intensity =

    armGlow *

    starBrightness *

    THREE.MathUtils.lerp(

        0.9,

        0.18,

        Math.pow(
            armProgress,
            1.8
        )

    );

colors[i3] =
    color.r *
    intensity;

colors[i3 + 1] =
    color.g *
    intensity;

colors[i3 + 2] =
    color.b *
    intensity;

const saturation = 0.92;

colors[i3] = Math.min(colors[i3] * saturation, 1.0);
colors[i3 + 1] = Math.min(colors[i3 + 1] * saturation, 1.0);
colors[i3 + 2] = Math.min(colors[i3 + 2] * saturation, 1.0);

    }

    for (let i = 0; i < armCount; i++) {

    const base = i * 3;

    const x = positions[base];
    const y = positions[base + 1];
    const z = positions[base + 2];

    const r = colors[base];
    const g = colors[base + 1];
    const b = colors[base + 2];

    const radius = Math.sqrt(
    x * x +
    z * z
);

const armT =

    (radius - startRadius) /

    (GalaxyConfig.radius * 0.92 - startRadius);

// كثافة أول الذراع
const coreArmDensity =

    THREE.MathUtils.lerp(

        3.8,

        1.0,

        THREE.MathUtils.smoothstep(
            armT,
            0.0,
            0.30
        )

    );

if (radius <20) {

    continue;

}

const t =
    radius /
    GalaxyConfig.radius;

    
const centerDensity =
    THREE.MathUtils.smoothstep(
        radius,
        20,
        40
    );

const outerBoost =
    THREE.MathUtils.smoothstep(
        t,
        0.55,
        1.0
    );

const starsPerPoint =
    Math.max(

        1,

        Math.floor(

            (

                cloudPerStar +

                outerBoost * 6

            ) *

            centerDensity *

            coreArmDensity

        )

    );

for (let j = 0; j < starsPerPoint; j++) {
        const i3 = index * 3;

        const angle =
    Math.atan2(z, x);

const density =
    1 - Math.pow(t, 1.6);

const shell =
    THREE.MathUtils.lerp(

        6.0,

        42.0,

        Math.pow(
            armT,
            0.45
        )

    );

const randomRadius =

    Math.pow(

        Math.random(),

        THREE.MathUtils.lerp(
            1.8,
            0.8,
            armT
        )

    ) *

    shell;

const theta =
    Math.random() *
    Math.PI * 2;

const dx =
Math.cos(theta) * randomRadius;
const dz =
Math.sin(theta) * randomRadius;

positions[i3] =

    x +

    Math.cos(angle + Math.PI / 2) * dx +

    Math.cos(angle) * dz;

positions[i3 + 2] =

    z +

    Math.sin(angle + Math.PI / 2) * dx +

    Math.sin(angle) * dz;
    

    let gaussianY = 0;

for (let k = 0; k < 6; k++) {

    gaussianY += Math.random();

}

gaussianY =
    (gaussianY / 6 - 0.5) * 2;

const cloudThickness =
    THREE.MathUtils.lerp(
        10.0,
        0.8,
        Math.pow(t, 1.0)
    );

const cloudFlare =

    Math.pow(
        Math.random(),
        2.8
    ) *

    THREE.MathUtils.lerp(
        10.0,
        3.0,
        t
    );

const vertical =

    gaussianY *
    cloudThickness +

    (Math.random() < 0.28
        ? (Math.random() < 0.5 ? -cloudFlare : cloudFlare)
        : 0);

// نجوم قليلة بعيدة جداً عن مستوى المجرة
const haloDepth =

    Math.pow(
        Math.random(),
        3.0
    ) *

    THREE.MathUtils.lerp(
        16.0,
        4.0,
        t
    );

const depth =

    vertical +

    (Math.random() < 0.08
        ? (Math.random() < 0.5 ? -haloDepth : haloDepth)
        : 0);

const depthScale =

    depth > 0
        ? 0.75   // فوق
        : 1.8;  // تحت

positions[i3 + 1] =

    y +

    depth * depthScale;

        const cloudBrightness =

    THREE.MathUtils.lerp(

        0.85,

        1.45,

        Math.pow(
            Math.random(),
            0.8
        )

    );

colors[i3] =
    r *
    cloudBrightness;

colors[i3 + 1] =
    g *
    cloudBrightness;

colors[i3 + 2] =
    b *
    cloudBrightness;
        
    const fade =
    THREE.MathUtils.lerp(
        0.95,
        1.35,
        density
    );

colors[i3] *= fade;
colors[i3 + 1] *= fade;
colors[i3 + 2] *= fade;

const sparkle =

    THREE.MathUtils.lerp(

        1.0,

        1.35,

        Math.pow(
            Math.random(),
            10.0
        )

    );

colors[i3] *= sparkle;
colors[i3 + 1] *= sparkle;
colors[i3 + 2] *= sparkle;
const cloudSaturation = 1.15;
colors[i3] = Math.min(colors[i3] * cloudSaturation, 1.0);
colors[i3 + 1] = Math.min(colors[i3 + 1] * cloudSaturation, 1.0);
colors[i3 + 2] = Math.min(colors[i3 + 2] * cloudSaturation, 1.0);

        index++;

    }

}
    // ======================================

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

    this.material = new THREE.PointsMaterial({

    size: 0.6,

    vertexColors: true,

    transparent: true,

    opacity: 0,

    depthWrite: false,

    blending: THREE.AdditiveBlending,

    sizeAttenuation: true

});

    this.points = new THREE.Points(

    geometry,

    this.material

);

    this.group.add(
        this.points
    );
}
startReveal() {

    this.reveal = 0;

}
updateReveal() {

    if (this.reveal >= 1) return;

    this.reveal += 0.008;

    this.material.opacity = THREE.MathUtils.smoothstep(

        this.reveal,

        0,

        1

    );

}
update() {

    this.updateReveal();

    this.group.rotation.y +=

        GalaxyConfig.rotationSpeed;

}
}
