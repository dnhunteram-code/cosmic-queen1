import * as THREE from "three";

export default class InteractionManager {

    constructor(
    camera,
    starManager,
    heartHitArea,
    heartSystem,
    heartOutline
) {

        this.camera = camera;
        this.starManager = starManager;

        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        
        this.hovered = null;
        this.enabled = true;

        this.onSelect = null;

        window.addEventListener(
            "mousemove",
            this.onMouseMove.bind(this)
        );

        window.addEventListener(
            "click",
            this.onClick.bind(this)
        );
this.heartHitArea = heartHitArea;
this.heartSystem = heartSystem;
this.heartOutline = heartOutline;
this.heartHovered = false;
this.onHeartClick = null;
    }

    setSelectCallback(callback) {

        this.onSelect = callback;

    }
setHeartClickCallback(callback) {

    this.onHeartClick = callback;

}
    onMouseMove(event) {

        if (!this.enabled) return;

        this.mouse.x =
            (event.clientX / window.innerWidth) * 2 - 1;

        this.mouse.y =
            -(event.clientY / window.innerHeight) * 2 + 1;

    }

   onClick() {

    if (!this.enabled) return;

    if (this.heartHovered) {

        this.heartSystem.pulse();
        this.heartOutline.pulse();

        setTimeout(() => {

            if (this.onHeartClick) {
                this.onHeartClick();
            }

        }, 250);

        return;
    }

    if (!this.hovered) return;

    const star = this.hovered.userData.star;

    if (this.onSelect) {

        this.onSelect(star);

    }

    }

    update() {

        if (!this.enabled) {

            if (this.hovered) {

                this.hovered.scale.set(
                    15,
                    15,
                    1
                );

                this.hovered = null;

            }

            document.body.style.cursor =
                "default";

            return;

        }

        this.raycaster.setFromCamera(

            this.mouse,

            this.camera

        );
const heartHit = this.raycaster.intersectObject(
    this.heartHitArea,
    false
);

this.heartHovered = heartHit.length > 0;

this.heartSystem.setHover(
    this.heartHovered
);

this.heartOutline.setHover(
    this.heartHovered
);

if (this.heartHovered) {

    document.body.style.cursor = "pointer";
    return;

}
        const hits =

            this.raycaster.intersectObjects(

                this.starManager.getMeshes(),

                false

            );

        if (this.hovered) {

            this.hovered.scale.set(

                15,

                15,

                1

            );

            this.hovered = null;

        }

        document.body.style.cursor =
            "grab";

        if (hits.length === 0) return;

        this.hovered =
            hits[0].object;

        this.hovered.scale.set(

            17,

            17,

            1

        );

        document.body.style.cursor =
            "pointer";

    }

    enable() {

        this.enabled = true;

    }

    disable() {

        this.enabled = false;
        this.heartHovered = false;

this.heartSystem.setHover(false);
this.heartOutline.setHover(false);
        if (this.hovered) {

            this.hovered.scale.set(

                15,

                15,

                1

            );

            this.hovered = null;

        }

        document.body.style.cursor =
            "default";

    }

}