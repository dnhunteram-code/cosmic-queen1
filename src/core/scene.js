import * as THREE from "three";
import GameConfig from "../config/GameConfig";

export default class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(GameConfig.background);
  }
}