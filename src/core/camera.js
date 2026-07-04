import * as THREE from "three";
import CameraConfig from "../config/CameraConfig";

export default class CameraManager {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      CameraConfig.fov,
      window.innerWidth / window.innerHeight,
      CameraConfig.near,
      CameraConfig.far
    );

    this.camera.position.set(
      CameraConfig.position.x,
      CameraConfig.position.y,
      CameraConfig.position.z
    );
  }
}