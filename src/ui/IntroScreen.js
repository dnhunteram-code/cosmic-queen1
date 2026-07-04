export default class IntroScreen {

    constructor(onStart) {

        this.onStart = onStart;

        this.create();

    }

    create() {

        this.element =
            document.createElement("div");

        this.element.id =
            "intro-screen";

        this.element.innerHTML = `

            <div class="intro-background">

                <div class="intro-glow glow-1"></div>

                <div class="intro-glow glow-2"></div>

                <div class="fullscreen-btn">

                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >

                        <path
                            d="M8 3H3V8"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />

                        <path
                            d="M16 3H21V8"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />

                        <path
                            d="M3 16V21H8"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />

                        <path
                            d="M21 16V21H16"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />

                    </svg>

                </div>
            <div class="music-btn">

     ▶

</div>

<div class="volume-control">

    <input
        type="range"
        min="0"
        max="100"
        value="50"
        class="volume-slider"
    >

</div>
                <div class="intro-card">

                    <h1>

                        Cosmic Queen
                    </h1>

                    <div class="intro-photo">

                        <img
    src="${import.meta.env.DEV ? "/images/milk-and-mocha-cute.webp" : "./images/milk-and-mocha-cute.webp"}"
>

                    </div>

                    <p>

                        Step inside the universe built around your smile

                    </p>

                    <button>

                        START

                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(
            this.element
        );
        const musicPath =

    import.meta.env.DEV

        ? "/music/Interstellar.m4a"

        : "./music/Interstellar.m4a";

this.audio = new Audio(musicPath);

this.audio.loop = true;

this.audio.volume = 0.5;

this.musicPlaying = false;

this.musicButton =
    this.element.querySelector(
        ".music-btn"
    );
this.musicButton.addEventListener(

    "click",

    () => {

        if (this.musicPlaying) {

            this.audio.pause();

            this.musicButton.innerHTML = `
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;

        } else {

            this.audio.play();

            this.musicButton.innerHTML = `
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="5" width="4" height="14" rx="1"/>
                    <rect x="14" y="5" width="4" height="14" rx="1"/>
                </svg>
            `;

        }

        this.musicPlaying = !this.musicPlaying;

    }

);
this.volumeSlider =
    this.element.querySelector(
        ".volume-slider"
    );

this.volumeSlider.addEventListener(

    "input",

    () => {

        this.audio.volume =
            this.volumeSlider.value / 100;

    }

);
        this.fullscreenButton =
    this.element.querySelector(
        ".fullscreen-btn"
    );

this.fullscreenButton.addEventListener(

    "click",

    async () => {

        if (!document.fullscreenElement) {

            await document.documentElement.requestFullscreen();

        } else {

            await document.exitFullscreen();

        }

    }

);

document.addEventListener(

    "fullscreenchange",

    () => {

        this.fullscreenButton.style.opacity = "1";

    }

);

        this.button =
            this.element.querySelector(
                "button"
            );

        this.button.addEventListener(

    "click",

    () => {

        this.button.classList.add(
            "start-click"
        );

        this.element.classList.add(
            "transition"
        );

        setTimeout(() => {

            this.element.classList.add(
                "hide"
            );

        }, 500);

        setTimeout(() => {

            document.body.appendChild(
    this.fullscreenButton
);

document.body.appendChild(
    this.musicButton
);
document.body.appendChild(

    this.element.querySelector(
        ".volume-control"
    )

);
            this.element.remove();
if (!this.musicPlaying) {

    this.audio.play();

    this.musicPlaying = true;

    this.musicButton.innerHTML = "⏸";

}
            if (this.onStart) {

                this.onStart();

            }

        }, 2200);

    }

);

    }

}