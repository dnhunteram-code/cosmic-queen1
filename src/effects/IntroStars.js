import * as THREE from "three";

export default class IntroStars {
    constructor() {
        this.group = new THREE.Group();
        
        this.count = 2800; 
        this.maxDepth = 2000; 

        this.targetSpeed = -10.0; 
        this.speed = 0.0; 
        this.opacity = 0.0; 
        this.active = false;

        this.positions = new Float32Array(this.count * 3);
        this.colors = new Float32Array(this.count * 3);
        this.sizes = new Float32Array(this.count);
        
        this.zPositions = new Float32Array(this.count);
        this.initialRadius = new Float32Array(this.count);
        this.angles = new Float32Array(this.count);
        this.speeds = new Float32Array(this.count);

        this.geometry = new THREE.BufferGeometry();
        this.create();
    }

    create() {
        const palette = [
            new THREE.Color("#00e5ff"), 
            new THREE.Color("#ffea00"), 
            new THREE.Color("#ff007f")  
        ];

        for (let i = 0; i < this.count; i++) {
            const i3 = i * 3;

            this.zPositions[i] = Math.random() * -this.maxDepth + 400;
            this.initialRadius[i] = Math.pow(Math.random(), 1.0) * 600 + 150;
            this.angles[i] = Math.random() * Math.PI * 2;
            this.speeds[i] = 0.8 + Math.random() * 0.4;

            this.sizes[i] = 2.5 + Math.pow(Math.random(), 2.0) * 5.0;

            const normDepth = (this.zPositions[i] - 400) / -this.maxDepth; 
            const currentRadius = THREE.MathUtils.lerp(this.initialRadius[i], 160, normDepth);
            const spiralAngle = this.angles[i] - (normDepth * 6.5); 

            this.positions[i3] = Math.cos(spiralAngle) * currentRadius;
            this.positions[i3 + 1] = Math.sin(spiralAngle) * currentRadius;
            this.positions[i3 + 2] = this.zPositions[i];

            const color = palette[i % palette.length];
            this.colors[i3] = color.r;
            this.colors[i3 + 1] = color.g;
            this.colors[i3 + 2] = color.b;
        }

        this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
        this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));
        this.geometry.setAttribute("size", new THREE.BufferAttribute(this.sizes, 1));

        this.material = new THREE.PointsMaterial({
            size: 6.0, 
            vertexColors: true,
            transparent: true,
            opacity: 0.0, 
            depthWrite: false,
            blending: THREE.AdditiveBlending, 
            sizeAttenuation: true 
        });

        this.material.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
                "void main() {",
                `void main() {
                vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                float r = dot(cxy, cxy);
                float alpha = 1.0 - smoothstep(0.8, 1.0, r);
                if (r > 1.0) discard;
                `
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                "gl_FragColor = vec4( diffuseColor.rgb, diffuseColor.a );",
                "gl_FragColor = vec4( diffuseColor.rgb, diffuseColor.a * alpha );"
            );
        };

        this.points = new THREE.Points(this.geometry, this.material);
        this.points.frustumCulled = false;
        this.group.add(this.points);
        this.points.visible = false;
    }

    start() {
        this.points.visible = true;
        this.active = true;
        this.opacity = 0.0; 
        this.speed = 0.0; 
        this.material.opacity = 0.0;
    }

    // 👈 تعديل دالة الـ stop لتسمح بالتلاشي الهادي أولاً
    stop() {
        this.active = false;
    }

    update() {
        // 👈 سحر الـ Smooth Dissolve هنا:
        // لما الـ active يبقى false (يعني لما ننده stop من ملف App.js)
        // الكود مش هيقفل فجأة، بل هيضرب الـ opacity الحالية في 0.94 في كل إطار
        // ده بيعمل تلاشي أسي فائق النعومة لغاية ما النجوم تختفي تماماً وبدون أي نترات بصرية
        if (!this.active) {
            this.material.opacity *= 0.94; 
            
            // تهدئة سرعة الدوران والحركة تدريجياً مع الاختفاء لزيادة النعومة
            this.group.rotation.z *= 0.94;
            this.speed *= 0.94;

            // تحديث مواضع النجوم أثناء تلاشيها حتى لا تتجمد الحركة فجأة
            const posAttr = this.geometry.attributes.position.array;
            for (let i = 0; i < this.count; i++) {
                const i3 = i * 3;
                this.zPositions[i] += this.speed * this.speeds[i] * 0.25;
                posAttr[i3 + 2] = this.zPositions[i];
            }
            this.geometry.attributes.position.needsUpdate = true;
            return;
        }

        // تأثير الـ Fade-In التدريجي عند البداية
        if (this.opacity < 0.9) {
            this.opacity += 0.015; 
        }
        this.material.opacity = this.opacity;

        // تسارع تدريجي للسرعة
        if (Math.abs(this.speed) < Math.abs(this.targetSpeed)) {
            this.speed += this.targetSpeed * 0.02; 
        }

        const posAttr = this.geometry.attributes.position.array;
        const time = performance.now() * 0.0008; 

        this.group.rotation.z -= 0.004 * (this.opacity / 0.9); 

        for (let i = 0; i < this.count; i++) {
            const i3 = i * 3;

            this.zPositions[i] += this.speed * this.speeds[i] * 0.25;

            if (this.zPositions[i] < -this.maxDepth + 400) {
                this.zPositions[i] = 400; 
                this.initialRadius[i] = Math.pow(Math.random(), 1.0) * 600 + 150;
                this.angles[i] = Math.random() * Math.PI * 2;
            }

            const normDepth = (this.zPositions[i] - 400) / -this.maxDepth; 
            const currentRadius = THREE.MathUtils.lerp(this.initialRadius[i], 160, normDepth);
            
            const spinVelocity = time * (0.3 + normDepth * 1.0); 
            const finalAngle = this.angles[i] - (normDepth * 6.5) - spinVelocity;

            posAttr[i3] = Math.cos(finalAngle) * currentRadius;
            posAttr[i3 + 1] = Math.sin(finalAngle) * currentRadius;
            posAttr[i3 + 2] = this.zPositions[i];
        }

        this.geometry.attributes.position.needsUpdate = true;
    }
}