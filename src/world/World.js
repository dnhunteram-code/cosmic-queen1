import * as THREE from "three";
import Galaxy from "./Galaxy";
import BackgroundStars from "./BackgroundStars";

export default class World {

    constructor() {

        this.group = new THREE.Group();

        this.galaxy = new Galaxy();

        // حذفنا الـ introStars من هنا تماماً عشان نفصلها عن نطاق المجرة
        this.group.add(
            this.galaxy.group
        );

        this.selectedStar = null;
this.backgroundStars = new BackgroundStars();

this.group.add(
    this.backgroundStars.group
);
    }

    update() {
        this.backgroundStars.update();
        this.galaxy.update();
    }

    startReveal() {
        this.galaxy.startReveal();
    }

    getStarManager() {
        return this.galaxy.getStarManager();
    }

    selectStar(star) {
        this.selectedStar = star;
    }

    getSelectedStar() {
        return this.selectedStar;
    }
getHeartHitArea() {

    return this.galaxy.getHeartHitArea();

}
getHeartSystem() {

    return this.galaxy.getHeartSystem();

}
getHeartOutline() {

    return this.galaxy.getHeartOutline();

}
}