'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SilkScene({ color, progress }: { color: string; progress: number }) {
  const host = useRef<HTMLDivElement>(null);
  const drawRef = useRef<((time: number) => void) | null>(null);
  const latestRef = useRef({ color, progress });
  latestRef.current = { color, progress };
  const reduceMotion = useReducedMotion();
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      setUnavailable(true);
      return;
    }

    const width = Math.max(1, element.clientWidth);
    const height = Math.max(1, element.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    element.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const keyLight = new THREE.DirectionalLight('#fff1d0', 2.4);
    keyLight.position.set(3, 5, 7);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight('#c68f4b', 28);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const geometry = new THREE.PlaneGeometry(4.5, 5.5, 56, 72);
    const positions = geometry.attributes.position;
    const original = Float32Array.from(positions.array);
    const material = new THREE.MeshPhysicalMaterial({
      color: latestRef.current.color,
      roughness: 0.31,
      metalness: 0.18,
      clearcoat: 0.7,
      clearcoatRoughness: 0.28,
      side: THREE.DoubleSide,
    });
    const cloth = new THREE.Mesh(geometry, material);
    cloth.position.x = 0.3;
    scene.add(cloth);

    let frame = 0;
    let isIntersecting = false;

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = Math.max(1, element.clientWidth);
      const nextHeight = Math.max(1, element.clientHeight);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight, false);
      renderer.render(scene, camera);
    });
    resizeObserver.observe(element);

    const targetColor = new THREE.Color();
    const render = (time: number) => {
      frame = 0;
      const current = latestRef.current;
      targetColor.set(current.color);
      if (reduceMotion) material.color.copy(targetColor);
      else material.color.lerp(targetColor, 0.035);
      if (!reduceMotion) {
        for (let index = 0; index < positions.count; index += 1) {
          const x = original[index * 3];
          const y = original[index * 3 + 1];
          const wave = Math.sin(x * 1.65 + time * 0.0007 + current.progress * Math.PI * 2) * 0.23;
          const fold = Math.sin(y * 1.2 - time * 0.00042 + x * 0.6) * 0.17;
          positions.setZ(index, wave + fold);
        }
        positions.needsUpdate = true;
        geometry.computeVertexNormals();
        cloth.rotation.y = Math.sin(time * 0.00018) * 0.12 + current.progress * 0.18;
        cloth.rotation.z = Math.sin(time * 0.00013) * 0.035;
      }
      renderer.render(scene, camera);
      if (!reduceMotion && isIntersecting) {
        frame = requestAnimationFrame(render);
      }
    };
    drawRef.current = render;

    const startAnimation = () => {
      if (!reduceMotion && isIntersecting && frame === 0) {
        frame = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (frame !== 0) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isIntersecting = entry?.isIntersecting ?? false;
        if (isIntersecting) {
          renderer.render(scene, camera);
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(element);

    return () => {
      stopAnimation();
      drawRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.forceContextLoss?.();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) drawRef.current?.(performance.now());
  }, [color, progress, reduceMotion]);

  return <div ref={host} className="absolute inset-0 h-full w-full" aria-hidden="true">{unavailable && <div className="silk-scene-fallback" />}</div>;
}
