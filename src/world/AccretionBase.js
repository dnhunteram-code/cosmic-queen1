import * as THREE from "three";

export default class AccretionBase {

  constructor() {

    this.group = new THREE.Group();

    this.create();

  }

  create() {

   const geometry = new THREE.RingGeometry(
    2.45,
    8.5,
    256
);

    const material = new THREE.MeshBasicMaterial({

    color: 0xd78d00,

    transparent: true,

    opacity: 0.65,

    side: THREE.DoubleSide,

    depthWrite: false,

    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1

});

    this.mesh = new THREE.Mesh(
      geometry,
      material
    );

    // يخليه أفقى
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = -0.02;
    this.group.add(this.mesh);

  }

  update() {

    // ثابت - لا يدور

  }

}