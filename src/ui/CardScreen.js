import cardImage from "../assets/images/card.jpeg";
export default class CardScreen {

    constructor() {
        window.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        this.close();

    }

});
        this.overlay = document.createElement("div");

        Object.assign(this.overlay.style, {
            position: "fixed",
            inset: "0",
            display: "none",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,.75)",
            backdropFilter: "blur(12px)",
WebkitBackdropFilter: "blur(12px)",
            backdropFilter: "blur(10px)",
            zIndex: "99999",
            opacity: "0",
            transition: "opacity .35s ease"
        });

        this.card = document.createElement("img");
        this.card.style.filter =
    "drop-shadow(0 0 60px rgba(255,105,180,.45))";
        this.card.src = cardImage;

        Object.assign(this.card.style, {
            width: "min(900px,90vw)",
            borderRadius: "24px",
            boxShadow: "0 0 80px rgba(255,105,180,.35)",
transform: "translateY(50px) scale(.85)",
            transition: "transform .35s ease"
        });

        this.overlay.appendChild(this.card);
        this.card.addEventListener("click", (e) => {

    e.stopPropagation();

});
        document.body.appendChild(this.overlay);

        this.overlay.addEventListener("click", (e) => {

    if (e.target === this.overlay) {

        this.close();

    }

});

    }

    open() {

        this.overlay.style.display = "flex";

        requestAnimationFrame(() => {

            this.overlay.style.opacity = "1";
            this.card.animate(

    [
        {
            transform: "translateY(50px) scale(.85)"
        },
        {
            transform: "translateY(-12px) scale(1.03)"
        },
        {
            transform: "translateY(0px) scale(1)"
        }

    ],

    {
        duration: 450,
        easing: "ease-out",
        fill: "forwards"
    }

);

        });

    }

    close() {

        this.overlay.style.opacity = "0";
        if (this.onClose) {

    this.onClose();

}
        this.card.style.transform =
    "translateY(50px) scale(.85)";
    this.card.style.filter =
    "drop-shadow(0 0 0px rgba(255,105,180,0))";

        setTimeout(() => {

            this.overlay.style.display = "none";

        }, 350);

    }
setCloseCallback(callback) {

    this.onClose = callback;

}
}