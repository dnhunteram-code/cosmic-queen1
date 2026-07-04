export default class MemoryScreen {

    constructor() {

        this.create();

    }

    create() {

        this.element =
            document.createElement("div");

        this.element.id =
            "memory-screen";

        this.element.innerHTML = `

            <div class="memory-card">

                <img id="memory-image">

                <h1 id="memory-title"></h1>

                <p id="memory-message"></p>

                <button id="memory-close">

                    CLOSE

                </button>

            </div>

        `;

        document.body.appendChild(
            this.element
        );

        // منع أى Click من الوصول للعناصر خلف الكارت
        this.element.addEventListener(

            "click",

            (event) => {

                event.stopPropagation();

            }

        );

        this.image =
            this.element.querySelector(
                "#memory-image"
            );

        this.title =
            this.element.querySelector(
                "#memory-title"
            );

        this.message =
            this.element.querySelector(
                "#memory-message"
            );

        this.closeButton =
            this.element.querySelector(
                "#memory-close"
            );

        this.closeButton.addEventListener(

            "click",

            (event) => {

                event.stopPropagation();

                this.close();

                if (this.onClose) {

                    this.onClose();

                }

            }

        );

    }

    setCloseCallback(callback) {

        this.onClose = callback;

    }

    open(data) {

    this.image.src = new URL(
        `../assets/images/${data.image}`,
        import.meta.url
    ).href;

    this.title.textContent =
        data.title;

    this.message.textContent =
        data.message;

    this.element.classList.add(
        "show"
    );

}

    close() {

        this.element.classList.remove(
            "show"
        );

    }

}