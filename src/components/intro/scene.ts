// Cena 3D da abertura (three.js). Carregada sob demanda só quando a abertura
// toca, para não pesar o site. O monograma VC é construído com tubos que seguem
// exatamente os traços do logo, em material metálico com reflexos reais
// (ambiente de estúdio) e um halo de luz em volta dos traços.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { TIMELINE, LOGO_W, cameraDistance } from "./timeline";

const BG = 0x00141a; // mesmo tom do fundo do site (hsl 193 100% 5%)
const CYAN = 0x00c8f0;
const SCALE = LOGO_W / 120;
const RADIUS = 4.5 * SCALE; // metade da espessura do traço (9px no SVG)

// Converte coordenadas do SVG (120×64, y para baixo) para a cena (centro na origem, y para cima)
const toScene = (x: number, y: number) => new THREE.Vector3((x - 60) * SCALE, -(y - 32) * SCALE, 0);

// V: "M 12 12 L 34 52 L 56 12"
const vCurve = (() => {
  const path = new THREE.CurvePath<THREE.Vector3>();
  path.add(new THREE.LineCurve3(toScene(12, 12), toScene(34, 52)));
  path.add(new THREE.LineCurve3(toScene(34, 52), toScene(56, 12)));
  return path;
})();

// C: "M 104 17 A 21 21 0 1 0 104 47" — arco longo pelo lado esquerdo
const cCurve = (() => {
  const r = 21;
  const cx = 104 - Math.sqrt(r * r - 15 * 15);
  const cy = 32;
  const a0 = Math.atan2(17 - cy, 104 - cx);
  const a1 = Math.atan2(47 - cy, 104 - cx) - Math.PI * 2;
  const pts: THREE.Vector3[] = [];
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const a = a0 + (a1 - a0) * (i / steps);
    pts.push(toScene(cx + r * Math.cos(a), cy + r * Math.sin(a)));
  }
  return new THREE.CatmullRomCurve3(pts);
})();

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const phase = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

// Um traço do logo: tubo que "cresce" ao longo do caminho, tampas arredondadas
// e uma cabeça luminosa na ponta enquanto desenha
const makeStroke = (curve: THREE.Curve<THREE.Vector3>, material: THREE.Material, halo: THREE.Material, segments: number, sharp = false) => {
  const group = new THREE.Group();
  const geo = new THREE.TubeGeometry(curve, segments, RADIUS, 32, false);
  const tube = new THREE.Mesh(geo, material);
  group.add(tube);
  // Halo: tubo mais grosso, translúcido e aditivo em volta do metal (o "brilho")
  const haloGeo = new THREE.TubeGeometry(curve, segments, RADIUS * 2.4, 24, false);
  const haloMesh = new THREE.Mesh(haloGeo, halo);
  haloMesh.renderOrder = 2;
  group.add(haloMesh);
  const capGeo = new THREE.SphereGeometry(RADIUS, 32, 16);
  const capStart = new THREE.Mesh(capGeo, material);
  const capEnd = new THREE.Mesh(capGeo, material);
  capStart.position.copy(curve.getPointAt(0));
  capEnd.position.copy(curve.getPointAt(1));
  group.add(capStart, capEnd);
  // junta do V (bico) arredondada
  if (sharp) {
    const joint = new THREE.Mesh(capGeo, material);
    joint.position.copy(toScene(34, 52));
    group.add(joint);
    joint.visible = false;
    group.userData.joint = joint;
  }
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS * 1.05, 24, 12),
    new THREE.MeshBasicMaterial({ color: 0xeaffff, toneMapped: false }),
  );
  group.add(head);
  const total = geo.index!.count;
  const haloTotal = haloGeo.index!.count;
  const setProgress = (p: number) => {
    geo.setDrawRange(0, Math.floor((total * p) / 6) * 6);
    haloGeo.setDrawRange(0, Math.floor((haloTotal * p) / 6) * 6);
    capStart.visible = p > 0;
    capEnd.visible = p >= 1;
    head.visible = p > 0 && p < 1;
    if (head.visible) head.position.copy(curve.getPointAt(p));
    const joint = group.userData.joint as THREE.Mesh | undefined;
    if (joint) joint.visible = p >= 0.5;
  };
  setProgress(0);
  return { group, setProgress, dispose: () => { geo.dispose(); haloGeo.dispose(); capGeo.dispose(); } };
};

export interface IntroScene {
  /** Atualiza a cena para o instante t (segundos desde o início). */
  render: (t: number) => void;
  resize: () => void;
  dispose: () => void;
}

export const createScene = (canvas: HTMLCanvasElement): IntroScene => {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(BG, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(BG, 8, 16);

  // Reflexos de estúdio (ambiente procedural, sem baixar imagens)
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.05, 50);

  // Materiais: V em cromo claro, C em metal ciano
  const chrome = new THREE.MeshPhysicalMaterial({
    color: 0xdfe9ec, metalness: 1, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.0,
  });
  const cyanMetal = new THREE.MeshPhysicalMaterial({
    color: CYAN, metalness: 0.85, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1,
    emissive: CYAN, emissiveIntensity: 0.25, envMapIntensity: 1.1,
  });

  // Brilho: tubo maior visto por dentro, mais forte nas bordas (efeito "rim" /
  // atmosfera) e somado à cena — some no centro e se espalha suave pelas bordas
  const rimGlow = (color: number, strength: number) =>
    new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(color) }, strength: { value: strength } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vView = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 color;
        uniform float strength;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          float facing = abs(dot(normalize(vNormal), normalize(vView)));
          float glow = pow(facing, 3.0) * strength;
          gl_FragColor = vec4(color * glow, glow);
        }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
  const haloV = rimGlow(0xbfefff, 0.35);
  const haloC = rimGlow(CYAN, 0.6);

  const logo = new THREE.Group();
  scene.add(logo);
  const v = makeStroke(vCurve, chrome, haloV, 120, true);
  const c = makeStroke(cCurve, cyanMetal, haloC, 160);
  logo.add(v.group, c.group);

  // Luzes: uma ciano de recorte atrás e uma branca que varre a frente (reflexo passando)
  const rim = new THREE.PointLight(CYAN, 30, 12, 2);
  rim.position.set(-2.5, 1.5, -2.5);
  const sweep = new THREE.PointLight(0xffffff, 0, 10, 2);
  sweep.position.set(-4, 0.6, 2.2);
  const key = new THREE.DirectionalLight(0xffffff, 0.6);
  key.position.set(2, 3, 4);
  scene.add(rim, sweep, key);

  // Chão de grade ciano em perspectiva (estúdio virtual)
  const grid = new THREE.GridHelper(40, 60, CYAN, CYAN);
  const gridMat = grid.material as THREE.Material;
  gridMat.transparent = true;
  gridMat.opacity = 0.12;
  grid.position.y = -1.6;
  scene.add(grid);

  // Poeira de luz flutuando ao redor
  const dustGeo = new THREE.BufferGeometry();
  const dustCount = 260;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 14;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 7;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: CYAN, size: 0.025, transparent: true, opacity: 0.7, depthWrite: false }));
  scene.add(dust);

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.userData.dist = cameraDistance(w, h);
    // névoa começa depois do logo (no celular a câmera fica mais longe)
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.near = camera.userData.dist + 2;
      scene.fog.far = camera.userData.dist + 10;
    }
    camera.updateProjectionMatrix();
  };
  resize();

  const render = (t: number) => {
    const T = TIMELINE;
    v.setProgress(easeInOut(phase(t, T.vStart, T.vEnd)));
    c.setProgress(easeInOut(phase(t, T.cStart, T.cEnd)));

    // Logo: começa de lado e gira até ficar de frente, com leve flutuação
    const settle = easeOut(phase(t, 0, T.lock));
    logo.rotation.y = (1 - settle) * -0.9 + Math.sin(t * 1.6) * 0.18 * (1 - phase(t, 2.6, T.lock));
    logo.rotation.x = (1 - settle) * 0.25;
    logo.position.y = Math.sin(t * 1.2) * 0.04;

    // Pulso no travamento
    const lockPulse = Math.exp(-Math.pow((t - T.lock) / 0.12, 2));
    cyanMetal.emissiveIntensity = 0.25 + lockPulse * 0.7;
    chrome.emissive.setHex(0xbfefff);
    chrome.emissiveIntensity = lockPulse * 0.12;
    haloV.uniforms.strength.value = 0.35 + lockPulse * 0.9;
    haloC.uniforms.strength.value = 0.6 + lockPulse * 1.2;

    // Luz branca varrendo a frente entre 2.0s e 3.0s
    const sw = phase(t, 2.0, 3.0);
    sweep.intensity = Math.sin(sw * Math.PI) * 40;
    sweep.position.x = -4 + sw * 8;
    rim.intensity = 20 + Math.sin(t * 2) * 8;

    // Câmera: orbita devagar e termina de frente para o logo
    const dist = camera.userData.dist as number;
    const orbit = (1 - easeOut(phase(t, 0, T.lock))) * 0.9;
    camera.position.set(Math.sin(orbit) * dist * 0.5, orbit * 0.4, dist);
    camera.lookAt(0, 0, 0);

    dust.rotation.y = t * 0.05;
    grid.position.z = (t * 0.6) % (40 / 60);

    renderer.render(scene, camera);
  };

  const dispose = () => {
    v.dispose();
    c.dispose();
    dustGeo.dispose();
    chrome.dispose();
    cyanMetal.dispose();
    envTex.dispose();
    pmrem.dispose();
    haloV.dispose();
    haloC.dispose();
    renderer.dispose();
  };

  return { render, resize, dispose };
};
