import * as THREE from "three";
import createLabel from "../utils/createLabel";

export default class Star {

    constructor(position, data) {

        this.group = new THREE.Group();

        this.data = data;
        const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;

const ctx = canvas.getContext("2d");

const circularTexture = new THREE.CanvasTexture(canvas);
circularTexture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.SpriteMaterial({

    map: circularTexture,

    transparent: true,

    depthWrite: false,

});

const imagePath = new URL(
    `../assets/images/${data.image}`,
    import.meta.url
).href;

const loader = new THREE.TextureLoader();

loader.load(

    imagePath,

    (texture) => {

        const img = texture.image;

        const size = 512;

        ctx.clearRect(0, 0, size, size);

        ctx.save();

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        const scale = Math.max(

            size / img.width,

            size / img.height

        );

        const w = img.width * scale;
        const h = img.height * scale;

        const x = (size - w) * 0.5;
        const y = (size - h) * 0.5;

        ctx.drawImage(

            img,

            x,

            y,

            w,

            h

        );

        ctx.restore();

        circularTexture.colorSpace = THREE.SRGBColorSpace;
        circularTexture.needsUpdate = true;

        material.map = circularTexture;
        material.needsUpdate = true;

    },

    undefined,

    (err) => {

    }

);

        this.mesh =
            new THREE.Sprite(
                material
            );

        this.mesh.scale.set(
            18,
            18,
            1
        );

        this.group.position.copy(position);

this.group.position.y += 8;
this.originY = position.y + 8;
this.mesh.position.set(0, 0, 0);
        // نخزن الـ Star داخل الـ Sprite
        this.mesh.userData.star = this;

        this.group.add(
            this.mesh
        );

        this.label =
            createLabel(
                this.data.title
            );

        this.group.add(
            this.label
        );
        this.label.position.set(
    0,
    14,
    0
);
        this.floatOffset =
            Math.random() *
            Math.PI * 2;

        this.floatSpeed =
            1.2 +
            Math.random() * 1.2;

    }

    float(time) {

    this.group.position.y =
        this.originY +
        Math.sin(
            time * this.floatSpeed +
            this.floatOffset
        ) * 0.12;

}

}