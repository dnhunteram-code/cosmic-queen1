import * as THREE from "three";

export default class BackgroundStars {

    constructor(){

        this.group = new THREE.Group();

        const count = 450;

        const positions = [];
        const colors = [];

        const palette = [

            new THREE.Color("#ffffff"),
            new THREE.Color("#d7ecff"),
            new THREE.Color("#fff4c4")

        ];

        for(let i=0;i<count;i++){

            const r = 1400 + Math.random()*1600;

            const theta = Math.random()*Math.PI*2;
            const phi = Math.acos(2*Math.random()-1);

            positions.push(

                r*Math.sin(phi)*Math.cos(theta),
                r*Math.cos(phi),
                r*Math.sin(phi)*Math.sin(theta)

            );

            const c = palette[Math.floor(Math.random()*palette.length)];

            colors.push(c.r,c.g,c.b);

        }

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(
                positions,
                3
            )

        );

        geometry.setAttribute(

            "color",

            new THREE.Float32BufferAttribute(
                colors,
                3
            )

        );

        const material = new THREE.PointsMaterial({

            size:2,

            vertexColors:true,

            transparent:true,

            opacity:.8,

            depthWrite:false

        });

        this.group.add(
            new THREE.Points(
                geometry,
                material
            )
        );
        this.mouse = {

    x:0,

    y:0

};

window.addEventListener(

    "mousemove",

    e=>{

        this.mouse.x =

            (e.clientX/window.innerWidth-.5);

        this.mouse.y =

            (e.clientY/window.innerHeight-.5);

    }

);

    }
update(){

    this.group.rotation.y +=

        (this.mouse.x*0.08-this.group.rotation.y)

        *0.03;

    this.group.rotation.x +=

        (-this.mouse.y*0.05-this.group.rotation.x)

        *0.03;

}
}