export default class ResizeManager {
  constructor(camera, renderer) {
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
      );
    });
  }
}