import * as THREE from "three";

export default class BlackHole {

  constructor(){

    this.group=new THREE.Group();

    const geometry=
      new THREE.SphereGeometry(
        3.8,
        64,
        64
      );

    const material=
      new THREE.MeshBasicMaterial({

        color:0x000000

      });

    this.mesh=
      new THREE.Mesh(
        geometry,
        material
      );

    this.group.add(
      this.mesh
    );

  }

  update(){}

}