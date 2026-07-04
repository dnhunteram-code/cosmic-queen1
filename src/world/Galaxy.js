import * as THREE from "three";

import GalaxyGenerator from "./GalaxyGenerator";
import BlackHole from "./BlackHole";
import AccretionBase from "./AccretionBase";
import AccretionDisk from "./AccretionDisk";
import HeartSystem from "./HeartSystem";
import HeartOutline from "./HeartOutline";
import HeartHitArea from "./HeartHitArea";

import StarManager from "../objects/StarManager";

export default class Galaxy {

    constructor() {

        this.group = new THREE.Group();

        this.galaxy = new GalaxyGenerator();

        this.accretionBase = new AccretionBase();

        this.disk = new AccretionDisk();

        this.blackHole = new BlackHole();

        this.heartSystem = new HeartSystem();

        this.heartOutline = new HeartOutline();
        this.heartHitArea = new HeartHitArea();
        this.starManager = new StarManager();

       

        this.group.add(
            this.galaxy.group
        );

        this.group.add(
            this.accretionBase.group
        );

        this.group.add(
            this.disk.group
        );

        this.group.add(
            this.blackHole.group
        );

        this.group.add(
            this.heartSystem.group
        );

        this.group.add(
            this.heartOutline.group
        );
this.group.add(
    this.heartHitArea.group
);
        this.group.add(
            this.starManager.group
        );

        

    }

    startReveal() {

        this.galaxy.startReveal();

    }

    update() {

        this.galaxy.update();

        this.accretionBase.update();

        this.disk.update();

        this.blackHole.update();

        this.heartSystem.update();

        this.heartOutline.update();

        this.starManager.update();

    }

    getStarManager() {

        return this.starManager;

    }
getHeartHitArea() {

    return this.heartHitArea.mesh;

}
getHeartSystem() {

    return this.heartSystem;

}
getHeartOutline() {

    return this.heartOutline;

}
}