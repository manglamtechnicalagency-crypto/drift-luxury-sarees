'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SareeHeroCanvasProps {
  accentColor?: string;
  themeStyle?: 'gold' | 'crimson' | 'emerald' | 'indigo';
}

export default function SareeHeroCanvas({
  accentColor = '#D4AF37',
  themeStyle = 'gold',
}: SareeHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [materialType, setMaterialType] = useState<'brocade' | 'silk' | 'organza'>('brocade');
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  // References for animation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const clothMeshRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 1. Procedural 3D Saree Silk Cloth (Parametric Undulating Wave Mesh)
    const clothWidth = 4.8;
    const clothHeight = 6.2;
    const segmentsX = 64;
    const segmentsY = 64;
    const clothGeo = new THREE.PlaneGeometry(clothWidth, clothHeight, segmentsX, segmentsY);

    // Create high-luxury shader-like custom canvas texture for woven Zari & Brocade
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 512;
    textureCanvas.height = 512;
    const ctx = textureCanvas.getContext('2d');
    if (ctx) {
      // Base royal gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#5a0d18');
      grad.addColorStop(0.5, '#841324');
      grad.addColorStop(1, '#3b060d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Gold zari stripes & floral booti pattern simulation
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 512; i += 16) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
      }
      for (let j = 0; j < 512; j += 16) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(512, j);
        ctx.stroke();
      }

      // Gold Paisley Kalka accents
      ctx.fillStyle = 'rgba(245, 230, 163, 0.7)';
      for (let x = 32; x < 512; x += 64) {
        for (let y = 32; y < 512; y += 64) {
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    const fabricTexture = new THREE.CanvasTexture(textureCanvas);
    fabricTexture.wrapS = THREE.RepeatWrapping;
    fabricTexture.wrapT = THREE.RepeatWrapping;
    fabricTexture.repeat.set(2, 3);

    // Material with high metallic zari sheen
    const clothMaterial = new THREE.MeshPhysicalMaterial({
      map: fabricTexture,
      color: new THREE.Color(accentColor || '#8F1424'),
      roughness: 0.32,
      metalness: 0.65,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
      sheen: 1.0,
      sheenRoughness: 0.4,
      sheenColor: new THREE.Color('#F5E6A3'),
    });

    const clothMesh = new THREE.Mesh(clothGeo, clothMaterial);
    clothMesh.rotation.x = -0.25;
    clothMesh.rotation.y = 0.35;
    clothMesh.rotation.z = -0.05;
    scene.add(clothMesh);
    clothMeshRef.current = clothMesh;

    // Studio Lighting for Luxury Zari Reflection
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.9);
    scene.add(ambientLight);

    const keyGoldLight = new THREE.DirectionalLight(0xffecc2, 2.2);
    keyGoldLight.position.set(4, 5, 5);
    scene.add(keyGoldLight);

    const rimCrimsonLight = new THREE.DirectionalLight(0xff3355, 1.8);
    rimCrimsonLight.position.set(-5, -2, -3);
    scene.add(rimCrimsonLight);

    const zariRimLight = new THREE.PointLight(0xd4af37, 2.5, 15);
    zariRimLight.position.set(0, 3, 2);
    scene.add(zariRimLight);

    // Original vertex positions array for wave simulation
    const originalPositions = clothGeo.attributes.position.clone();

    // Mouse interaction listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    // Scroll interaction listener
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (clothMeshRef.current) {
        clothMeshRef.current.rotation.y = 0.35 + scrollY * 0.0008;
        clothMeshRef.current.position.y = -scrollY * 0.001;
      }
      if (camera) {
        camera.position.z = 7.5 + Math.sin(scrollY * 0.001) * 0.5;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 1. Procedural Cloth Billowing Wave simulation
      if (clothMeshRef.current) {
        const posAttr = clothMeshRef.current.geometry.attributes.position;
        const origAttr = originalPositions;

        for (let i = 0; i < posAttr.count; i++) {
          const u = origAttr.getX(i);
          const v = origAttr.getY(i);

          // Multi-frequency sine/cosine wave for realistic fluid silk flow
          const wave1 = Math.sin(u * 1.6 + elapsedTime * 1.8) * 0.28;
          const wave2 = Math.cos(v * 1.8 + elapsedTime * 1.4) * 0.22;
          const wave3 = Math.sin((u + v) * 2.2 + elapsedTime * 2.1) * 0.14;
          const flutter = Math.sin(u * 4.0 + elapsedTime * 3.5) * 0.06;

          // Mouse proximity displacement
          const mouseDist = Math.hypot(u - mouseRef.current.x * 2, v - mouseRef.current.y * 2);
          const mouseWave = Math.exp(-mouseDist * 1.5) * 0.35;

          const newZ = wave1 + wave2 + wave3 + flutter + mouseWave;
          posAttr.setZ(i, newZ);
        }
        posAttr.needsUpdate = true;
        clothMeshRef.current.geometry.computeVertexNormals();

        // Subtle idle rotation
        if (isRotatingRef.current) {
          clothMeshRef.current.rotation.y = 0.35 + Math.sin(elapsedTime * 0.4) * 0.08 + mouseRef.current.x * 0.15;
          clothMeshRef.current.rotation.x = -0.25 + Math.cos(elapsedTime * 0.3) * 0.05 + mouseRef.current.y * 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      clothGeo.dispose();
      clothMaterial.dispose();
      fabricTexture.dispose();
      renderer.forceContextLoss?.();
      renderer.dispose();
    };
  }, [accentColor]);

  // Handle dynamic material switch
  const handleMaterialChange = (type: 'brocade' | 'silk' | 'organza') => {
    setMaterialType(type);
    if (!clothMeshRef.current) return;
    const mat = clothMeshRef.current.material as THREE.MeshPhysicalMaterial;

    if (type === 'brocade') {
      mat.color.set('#8F1424');
      mat.sheenColor.set('#F5E6A3');
      mat.metalness = 0.7;
      mat.roughness = 0.3;
      mat.transparent = false;
      mat.opacity = 1.0;
    } else if (type === 'silk') {
      mat.color.set('#D4AF37');
      mat.sheenColor.set('#FFFFFF');
      mat.metalness = 0.4;
      mat.roughness = 0.2;
      mat.transparent = false;
      mat.opacity = 1.0;
    } else if (type === 'organza') {
      mat.color.set('#E5DEC9');
      mat.sheenColor.set('#FFD700');
      mat.metalness = 0.2;
      mat.roughness = 0.15;
      mat.transparent = true;
      mat.opacity = 0.65;
    }
  };

  return (
    <div className="relative w-full h-full min-h-[550px] lg:min-h-[720px] overflow-hidden flex items-center justify-center">
      {/* Three.js Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* 3D Floating Spatial Controls Pill */}
      <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 z-20 flex flex-wrap items-center justify-between md:justify-end gap-3 bg-drift-card/85 backdrop-blur-md px-4 py-2.5 rounded-full border border-drift-gold/30 shadow-gold-subtle">
        <div className="flex items-center gap-2 text-xs text-drift-sand/90 font-medium tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-drift-gold animate-ping" />
          <span className="hidden sm:inline">3D Cloth Shader:</span>
        </div>

        {/* Shader Material Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-drift-border">
          <button
            type="button"
            onClick={() => handleMaterialChange('brocade')}
            className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
              materialType === 'brocade'
                ? 'bg-drift-crimson text-drift-gold-light shadow-sm'
                : 'text-drift-sand/70 hover:text-white'
            }`}
          >
            Zari Brocade
          </button>
          <button
            type="button"
            onClick={() => handleMaterialChange('silk')}
            className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
              materialType === 'silk'
                ? 'bg-drift-gold text-drift-dark font-semibold shadow-sm'
                : 'text-drift-sand/70 hover:text-white'
            }`}
          >
            Mulberry Silk
          </button>
          <button
            type="button"
            onClick={() => handleMaterialChange('organza')}
            className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
              materialType === 'organza'
                ? 'bg-white/20 text-white font-semibold shadow-sm'
                : 'text-drift-sand/70 hover:text-white'
            }`}
          >
            Sheer Organza
          </button>
        </div>

        {/* Rotation toggle */}
        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          title="Toggle Silk Drift"
          className="p-1.5 text-xs text-drift-gold hover:text-drift-gold-light border border-drift-gold/30 rounded-full transition-colors"
        >
          {isRotating ? '⏸' : '▶'}
        </button>
      </div>

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-drift-dark via-transparent to-transparent opacity-90" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-drift-dark/80 via-transparent to-drift-dark/80" />
    </div>
  );
}
