import * as THREE from "three";

export default function createLabel(text) {

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const fontSize = 84;
    const padding = 80;

    ctx.font = `700 ${fontSize}px Arial`;

    const textWidth =
        ctx.measureText(text).width;

    canvas.width =
        textWidth + padding;

    canvas.height =
        fontSize + 50;

    // بعد تغيير حجم الـ Canvas لازم نرجع الإعدادات
    ctx.font = `700 ${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // لون النص
    ctx.fillStyle = "#ffffff";

    // هالة وردية بنفس لون القلب
    ctx.shadowColor = "#ff5fa2";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillText(

        text,

        canvas.width / 2,

        canvas.height / 2

    );

    const texture =
        new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    const material =
        new THREE.SpriteMaterial({

            map: texture,

            transparent: true,

            depthWrite: false

        });

    const sprite =
        new THREE.Sprite(material);

    sprite.scale.set(

        canvas.width / 40,

        2.5,

        1

    );

    return sprite;

}