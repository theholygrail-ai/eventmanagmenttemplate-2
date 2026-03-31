(() => {
  const mount = document.getElementById("hero-three-canvas");
  if (!mount || window.innerWidth < 960 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
  camera.position.set(0, 0.2, 4.3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.95);
  const key = new THREE.DirectionalLight(0xf1e0c3, 1.2);
  key.position.set(3, 2, 4);
  scene.add(ambient, key);

  const group = new THREE.Group();
  scene.add(group);

  const geo = new THREE.IcosahedronGeometry(1.1, 1);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xebe8e2,
    metalness: 0.15,
    roughness: 0.22,
    transmission: 0.4,
    thickness: 1.2,
    clearcoat: 1
  });
  const orb = new THREE.Mesh(geo, mat);
  group.add(orb);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.8, 0.04, 16, 120),
    new THREE.MeshBasicMaterial({ color: 0x6f634c, transparent: true, opacity: 0.4 })
  );
  ring.rotation.x = Math.PI / 2.6;
  group.add(ring);

  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 0.25;
  });

  const onResize = () => {
    camera.aspect = mount.clientWidth / mount.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
  };
  window.addEventListener("resize", onResize);

  let raf;
  const tick = () => {
    orb.rotation.y += 0.003;
    orb.rotation.x += 0.0012;
    group.rotation.y += (pointer.x - group.rotation.y) * 0.04;
    group.rotation.x += (-pointer.y - group.rotation.x) * 0.04;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
})();
