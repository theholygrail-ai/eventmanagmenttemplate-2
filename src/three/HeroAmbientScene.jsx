import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroAmbientScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.innerWidth < 960 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.15, 4.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xf1e0c3, 1.2);
    key.position.set(2.5, 1.8, 3.5);
    scene.add(key);

    const group = new THREE.Group();
    scene.add(group);
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.08, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0xe8e2d4,
        transmission: 0.35,
        roughness: 0.25,
        metalness: 0.12,
        clearcoat: 0.8
      })
    );
    group.add(mesh);
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.04, 16, 140),
      new THREE.MeshBasicMaterial({ color: 0x867456, transparent: true, opacity: 0.3 })
    );
    halo.rotation.x = Math.PI / 2.8;
    group.add(halo);

    const pointer = { x: 0, y: 0 };
    const onPointer = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 0.32;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 0.26;
    };
    window.addEventListener("pointermove", onPointer);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;
    const renderLoop = () => {
      mesh.rotation.y += 0.003;
      mesh.rotation.x += 0.001;
      group.rotation.y += (pointer.x - group.rotation.y) * 0.04;
      group.rotation.x += (-pointer.y - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else renderLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.innerHTML = "";
    };
  }, []);

  return <div className="hero-canvas-scene" ref={mountRef} aria-hidden />;
}
