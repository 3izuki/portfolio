const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('intro-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
    },
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        void main() {
            vec2 uv = gl_FragCoord.xy / vec2(1024, 768);
            float color = 0.5 + 0.5 * sin(time + uv.x * 10.0);
            gl_FragColor = vec4(vec3(color), 1.0);
        }
    `
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.05;
    renderer.render(scene, camera);
}

animate();
