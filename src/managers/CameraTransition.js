import * as THREE from "three";

export default class CameraTransition {

    constructor(camera, controls) {

        this.camera = camera;
        this.controls = controls;

        this.active = false;

        this.startPosition = new THREE.Vector3();
        this.targetPosition = new THREE.Vector3();

        this.startTarget = new THREE.Vector3();
        this.targetTarget = new THREE.Vector3();

        this.currentLookAt = new THREE.Vector3();

        this.progress = 0;
        this.duration = 2;

        this.elapsed = 0;

    }

    moveTo(star) {

        this.active = true;

        this.progress = 0;

        this.startPosition.copy(
            this.camera.position
        );

        this.startTarget.copy(
            this.controls.target
        );

        const worldPosition =
            new THREE.Vector3();

        star.mesh.getWorldPosition(
            worldPosition
        );

        const direction =
            worldPosition
                .clone()
                .normalize();

        this.targetPosition.copy(

            worldPosition.clone().add(

                direction.multiplyScalar(12)

            )

        );

        this.targetTarget.copy(
            worldPosition
        );

    }

    start(targetPosition, targetLookAt, duration = 4) {

        this.active = true;

        this.elapsed = 0;

        this.duration = duration;

        this.startPosition.copy(
            this.camera.position
        );

        this.targetPosition.copy(
            targetPosition
        );

        this.startTarget.copy(
            this.controls.target
        );

        this.targetTarget.copy(
            targetLookAt
        );

    }

    update(delta) {

        if (!this.active) return;

        this.elapsed += delta;

        this.progress =
            Math.min(
                this.elapsed / this.duration,
                1
            );

        // تعديل المعادلة لـ Linear (t = progress) لجعل حركة الكاميرا بطيئة ومنتظمة 
        // طوال الرحلة بدلاً من القفز السريع في البداية
        const t = this.progress; 

        this.camera.position.lerpVectors(

            this.startPosition,

            this.targetPosition,

            t

        );

        this.controls.target.lerpVectors(

            this.startTarget,

            this.targetTarget,

            t

        );
        this.controls.update();

        if (this.progress >= 1) {

            this.active = false;

        }

    }

    ease(t) {

        return t * t * (3 - 2 * t);

    }

}