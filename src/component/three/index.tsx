import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

function init() {
  const { innerWidth, innerHeight } = window;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGL1Renderer();
  renderer.setSize(innerWidth, innerHeight);

  return {
    scene,
    camera,
    renderer,
  };
}

function getCube() {
  const boxGeometrySize = [1, 1, 1];
  const geometry = new THREE.BoxGeometry(...boxGeometrySize);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  return cube;
}


const Three: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { renderer, scene, camera } = init();
  const { domElement } = renderer;
  const cube = getCube();

  const cube2 = getCube();

  const animate = useCallback(() => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);

  }, [renderer, camera, scene, cube]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.appendChild(domElement);
    }
  }, []);

  useEffect(() => {

    cube2.position.x = 2;
    cube2.position.y = 2;

    scene.add(cube);
    scene.add(cube2);
    camera.position.z = 5;

    renderer.render(scene, camera);
    animate();
  }, [scene, camera, renderer]);

  return <div ref={ref}></div>;
};

export default Three;
