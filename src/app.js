import * as THREE from "three";
import Engine from "./core/Engine";
import World from "./world/World";
import { gsap } from "gsap";
import MemoryScreen from "./ui/MemoryScreen";
import IntroScreen from "./ui/IntroScreen";
import IntroStars from "./effects/IntroStars"; 
import CardScreen from "./ui/CardScreen";
export default class App {
    constructor() {
        this.engine = new Engine();
        this.world = new World();

        this.engine.sceneManager.scene.add(this.world.group);

        this.world.group.position.set(0, 0, -2200);
        this.world.group.scale.set(0, 0, 0);

        this.introStars = new IntroStars();
        this.engine.sceneManager.scene.add(this.introStars.group);
        this.introStars.group.position.set(0, 0, 400);

        this.engine.setWorld(this.world);

        this.engine.controlsManager.disable();
        this.engine.interactionManager.disable();

        this.engine.cameraManager.camera.position.set(0, 0, 400);
        this.engine.controlsManager.controls.target.set(0, 0, 0);
        this.engine.cameraManager.camera.lookAt(0, 0, 0);

        if (this.engine.rendererManager.bloom) {
            this.engine.rendererManager.bloom.intensity = 0;
        }

        this.memoryScreen = new MemoryScreen();
        this.cardScreen = new CardScreen();
this.cardScreen.setCloseCallback(() => {

    this.engine.controlsManager.enable();

    if (this.engine.controlsManager.controls) {

        this.engine.controlsManager.controls.update();

    }

});
window.addEventListener("heart-click", () => {

    this.engine.controlsManager.disable();

    this.cardScreen.open();

});
        
        this.introScreen = new IntroScreen(
            () => {
                if (this.introStars) {
                    this.introStars.start(); 
                }

                setTimeout(() => {
                    const tl = gsap.timeline();

                    // 1. المجرة تقرب بنعومة فائقة
                    tl.to(this.world.group.position, {
                        z: 0,
                        duration: 5.5, 
                        ease: "power2.out"
                    });

                    // 2. المجرة تبدأ تكبر بالراحة وهي في العمق
                    tl.to(this.world.group.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 3.5,
                        ease: "power1.inOut" 
                    }, "-=4.5"); 

                    // 👈 3. إشارة التلاشي المبكر: بننده stop هنا (عند الثانية 2.5 من الحركة)
                    // فتبدأ النجوم تدوب براحتها جداً في الخلفية والمجرة بتكبر
                    setTimeout(() => {
                        if (this.introStars) {
                            this.introStars.stop(); // بتفعل التلاشي الأسي الناعم اللي عملناه في IntroStars
                        }
                    }, 2500); 

                    // الاستقرار والمليان النهائي للهادئ للمجرة
                    tl.to(this.world.group.rotation, {
                        x: 0.35,  
                        duration: 1.5,
                        ease: "power1.out"
                    }, "-=0.5");

                }, 100); 

                // 👈 4. تأخير التنظيف: مش هنمسح النجوم من الـ Scene إلا عند الثانية 6.5
                // ده بيديها وقت كااافي وزيادة إن الـ opacity يوصل لصفر الحقيقي بنعومة حرير
                setTimeout(() => {
                    this.engine.controlsManager.enable();
                    this.engine.interactionManager.enable();

                    if (this.engine.controlsManager.controls) {
                        this.engine.controlsManager.controls.target.set(0, 0, 0);
                        this.engine.controlsManager.controls.update();
                    }

                    // الحذف الآمن بعد التأكد من الاختفاء التام
                    if (this.introStars) {
                        this.engine.sceneManager.scene.remove(this.introStars.group);
                        this.introStars = null; 
                    }
                }, 6500); 
            }
        );

        this.engine.setStarSelectedCallback(
            (star) => {
                this.engine.interactionManager.disable();
                this.memoryScreen.open({
                    image: star.data.image,
                    title: star.data.title,
                    message: star.data.message
                });
            }
        );

        this.memoryScreen.setCloseCallback(
            () => {
                this.memoryScreen.close();
                this.engine.interactionManager.enable();
            }
        );
        
        this.hookStarsUpdate();
        this.engine.start();
    }

    hookStarsUpdate() {
        const animateStars = () => {
            // شيلنا شرط active من هنا عشان دالة الـ update تفضل شغالة حتى بعد الـ stop وتكمل أنميشن التلاشي
            if (this.introStars) {
                this.introStars.update();
                requestAnimationFrame(animateStars); 
            }
        };
        animateStars();
    }
}