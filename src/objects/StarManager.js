import * as THREE from "three";
import Star from "./Star";

export default class StarManager {

    constructor() {

        this.group = new THREE.Group();

        this.innerGroup = new THREE.Group();
        this.outerGroup = new THREE.Group();

        this.group.add(this.innerGroup);
        this.group.add(this.outerGroup);

        this.stars = [];

        this.create();

    }

    create() {

        const memories = [

            {
                image: "ted6.webp",
                title: "A sky full of stars",
                message: "There are billions of glowing lights in this infinite space, but none of them could ever match the brightness in your eyes. Out of the whole galaxy, you are my only view."
            },

            {
                image: "ted5.webp",
                title: "At the center of my heart",
                message: "Deep inside the glowing core of this galaxy lies the truth I carry every day: you are the absolute center of my life, the rhythm of my heart, and the source of all my happiness."
            },

            {
                image: "ted12.gif",
                title: "Written in the cosmic dust",
                message: "Our story wasn't an accident, it was designed by the cosmos long before we ever met. Every laugh we shared and every memory we made was already written across the heavens."
            },

            {
                image: "ted7.webp",
                title: "Timeless, like the deep space",
                message: "Stars may burn out and galaxies may fade, but what I feel for you is completely timeless. It exists beyond years and days, growing deeper with every breath I take."
            },

            {
                image: "ted10.gif",
                title: "Making a wish upon the galaxy",
                message: "Close your eyes and make a wish. Tonight, the entire galaxy is listening, and my only wish is to keep seeing that beautiful smile of yours for the rest of my days."
            },

            {
                image: "ted11.gif",
                title: "The cosmos is celebrating tonight",
                message: "Look around this screen; every single star was placed here tonight to celebrate the day you were born. You are the reason this whole universe is shining so brightly."
            },

            {
                image: "ted2.jpeg",
                title: "To the girl who defines my world",
                message: "You aren't just a part of my life; you are the reason my world is so bright and beautiful. Thank you for bringing color to my darkness and for being the queen of my cosmos."
            },

            {
                image: "ted3.jpeg",
                title: "Your Smile",
                message: "Your smile is the light that cuts through any darkeness. It is my favorite sunrise, my reason to wake up everyday."
            },

            {
                image: "ted8.jpeg",
                title: "Happy Birthday, my entire universe",
                message: "Today, the cosmos celebrates the birth of its most beautiful creation—you. Happy Birthday, my love, my light, and my entire universe. May your year be as radiant as your soul."
            },

            {
                image: "ted9.jpeg",
                title: "Another beautiful orbit around the sun",
                message: "You’ve completed another perfect journey around the sun, and I feel like the luckiest person in the universe just to be walking this cosmic path right by your side."
            },

            {
                image: "ted1.jpeg",
                title: "Forever",
                message: "I don't care how many lives I have to live, in each one of them I will choose you. Forever and one day more."
            },

            {
                image: "ted4.jpeg",
                title: "Under the Stars",
                message: "That night we looked at the sky together and I understood that no star shines as bright as your eyes when you look at me."
            }

        ];

        const INNER_RADIUS = 42;
        const OUTER_RADIUS = 72;

        for (let i = 0; i < memories.length; i++) {

            const innerRing = i < 6;

            const radius =
                innerRing
                    ? INNER_RADIUS
                    : OUTER_RADIUS;

            const index =
                innerRing
                    ? i
                    : i - 6;

            const angle =
                index *
                (Math.PI / 3) +
                (innerRing ? 0 : Math.PI / 6);


const y = innerRing ? 0 : -15;

const position = new THREE.Vector3(

    Math.cos(angle) * radius,

    y,

    Math.sin(angle) * radius

);
            const star =
                new Star(
                    position,
                    memories[i]
                );

            this.stars.push(star);

            if (innerRing) {

                this.innerGroup.add(
                    star.group
                );

            } else {

                this.outerGroup.add(
                    star.group
                );

            }

        }

    }

    update() {

        this.innerGroup.rotation.y -= 0.0008;

        this.outerGroup.rotation.y += 0.00045;

        const time =
            performance.now() * 0.001;

        for (const star of this.stars) {

            star.float(time);

        }

    }
getMeshes() {

    return this.stars.map(
        star => star.mesh
    );

}
}