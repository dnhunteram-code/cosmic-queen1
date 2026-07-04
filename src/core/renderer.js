import * as THREE from "three";

import {
    EffectComposer,
    RenderPass,
    EffectPass,
    BloomEffect
} from "postprocessing";

export default class RendererManager {

    constructor() {

        this.renderer = new THREE.WebGLRenderer({

            antialias: true,
            powerPreference: "high-performance"

        });

        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        // خليها زى Chrome
        this.renderer.toneMapping = THREE.NoToneMapping;
        this.renderer.toneMappingExposure = 1;

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.renderer.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                2

            )

        );

        document.body.appendChild(

            this.renderer.domElement

        );

        this.composer = null;

        this.bloom = null;

    }

    createComposer(scene, camera) {

        this.composer = new EffectComposer(

            this.renderer

        );

        this.composer.addPass(

            new RenderPass(

                scene,

                camera

            )

        );

        this.bloom = new BloomEffect({

            intensity: 0,

            luminanceThreshold: 0.85,

            luminanceSmoothing: 0.05,

            mipmapBlur: false

        });

        this.composer.addPass(

            new EffectPass(

                camera,

                this.bloom

            )

        );

    }

    render(scene, camera) {

        if (!this.composer) {

            this.createComposer(

                scene,

                camera

            );

        }

this.renderer.render(scene, camera);
    }

}