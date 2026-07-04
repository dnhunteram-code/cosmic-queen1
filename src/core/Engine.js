import SceneManager from "./Scene";
import CameraManager from "./Camera";
import RendererManager from "./Renderer";
import ControlsManager from "./Controls";
import ResizeManager from "./Resize";
import ClockManager from "./Clock";
import InteractionManager from "../interactions/InteractionManager";
import CameraTransition from "../managers/CameraTransition";

export default class Engine {

    constructor() {

        // Core
        this.sceneManager = new SceneManager();

        this.cameraManager = new CameraManager();

        this.rendererManager = new RendererManager();

        // Controls
        this.controlsManager = new ControlsManager(
            this.cameraManager.camera,
            this.rendererManager.renderer
        );

        // Camera Transition
        this.cameraTransition = new CameraTransition(
            this.cameraManager.camera,
            this.controlsManager.controls
        );

        // Time
        this.clockManager = new ClockManager();

        // Resize
        this.resizeManager = new ResizeManager(
            this.cameraManager.camera,
            this.rendererManager.renderer
        );

        // World
        this.world = null;

        this.interactionManager = null;

        // Events
        this.onStarSelected = null;

    }

    setWorld(world) {

        this.world = world;

        this.interactionManager = new InteractionManager(
    this.cameraManager.camera,
    this.world.getStarManager(),
    this.world.getHeartHitArea()
);
this.interactionManager = new InteractionManager(
    this.cameraManager.camera,
    this.world.getStarManager(),
    this.world.getHeartHitArea(),
    this.world.getHeartSystem(),
    this.world.getHeartOutline()
);
        this.interactionManager.setSelectCallback(
            (star) => {
                if (this.onStarSelected) {
                    this.onStarSelected(star);
                }
            }
        );
this.interactionManager.setHeartClickCallback(() => {

    window.dispatchEvent(
        new CustomEvent("heart-click")
    );

});
    }

    setStarSelectedCallback(callback) {

        this.onStarSelected = callback;

    }

    start() {

        const animate = () => {

            requestAnimationFrame(animate);

            const delta = this.clockManager.clock.getDelta();

            // Camera Animation
            this.cameraTransition.update(delta);

            // Controls
            this.controlsManager.update();

            // World
if (this.world) {
    this.world.update();
}

// Interaction
if (this.interactionManager) {
    this.interactionManager.update();
}

// Render
this.rendererManager.render(
    this.sceneManager.scene,
    this.cameraManager.camera
);
        };

        animate();

    }

    destroy() {

    }

}