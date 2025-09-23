'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function AFrameScene3() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modelRef = useRef(null);
  const pauseDuration = 3000;

  useEffect(() => {
    import('aframe').then(() => {
      import('aframe-extras').then(() => {
        if (!window.AFRAME.components['cursor-rotate-xy']) {
          window.AFRAME.registerComponent('cursor-rotate-xy', {
            schema: { rotationFactor: { type: 'number', default: 1 } },

            init: function () {
              this.rotation = { x: 0, y: 0 };
              this.isDragging = false;

              // Мышь
              this.onMouseDown = this.onMouseDown.bind(this);
              this.onMouseMove = this.onMouseMove.bind(this);
              this.onMouseUp = this.onMouseUp.bind(this);

              // Сенсорные события
              this.onTouchStart = this.onTouchStart.bind(this);
              this.onTouchMove = this.onTouchMove.bind(this);
              this.onTouchEnd = this.onTouchEnd.bind(this);

              if (this.el.sceneEl && this.el.sceneEl.canvas) {
                const canvas = this.el.sceneEl.canvas;
                canvas.addEventListener('mousedown', this.onMouseDown);
                canvas.addEventListener('touchstart', this.onTouchStart, { passive: false });
                canvas.addEventListener('touchmove', this.onTouchMove, { passive: false });
                canvas.addEventListener('touchend', this.onTouchEnd);
              }
              window.addEventListener('mouseup', this.onMouseUp);
            },

            onMouseDown: function (event) {
              this.isDragging = true;
              this.lastX = event.clientX;
              this.lastY = event.clientY;
              const rot = this.el.getAttribute('rotation');
              this.rotation = { x: rot.x, y: rot.y };
              window.addEventListener('mousemove', this.onMouseMove);
            },

            onMouseMove: function (event) {
              if (!this.isDragging) return;
              const dx = event.clientX - this.lastX;
              const dy = event.clientY - this.lastY;
              this.lastX = event.clientX;
              this.lastY = event.clientY;
              this.rotation.y += dx * this.data.rotationFactor * 0.5;
              this.rotation.x += dy * this.data.rotationFactor * 0.5;
              this.el.setAttribute('rotation', {
                x: this.rotation.x,
                y: this.rotation.y,
                z: 0,
              });
            },

            onMouseUp: function () {
              this.isDragging = false;
              window.removeEventListener('mousemove', this.onMouseMove);
            },

            onTouchStart: function (event) {
              if (event.touches.length === 1) {
                event.preventDefault();
                this.isDragging = true;
                this.lastX = event.touches[0].clientX;
                this.lastY = event.touches[0].clientY;
                const rot = this.el.getAttribute('rotation');
                this.rotation = { x: rot.x, y: rot.y };
              }
            },

            onTouchMove: function (event) {
              if (!this.isDragging || event.touches.length !== 1) return;
              event.preventDefault();
              const dx = event.touches[0].clientX - this.lastX;
              const dy = event.touches[0].clientY - this.lastY;
              this.lastX = event.touches[0].clientX;
              this.lastY = event.touches[0].clientY;
              this.rotation.y += dx * this.data.rotationFactor * 0.5;
              this.rotation.x += dy * this.data.rotationFactor * 0.5;
              this.el.setAttribute('rotation', {
                x: this.rotation.x,
                y: this.rotation.y,
                z: 0,
              });
            },

            onTouchEnd: function () {
              this.isDragging = false;
            },

            remove: function () {
              window.removeEventListener('mousemove', this.onMouseMove);
              window.removeEventListener('mouseup', this.onMouseUp);
              if (this.el.sceneEl && this.el.sceneEl.canvas) {
                const canvas = this.el.sceneEl.canvas;
                canvas.removeEventListener('mousedown', this.onMouseDown);
                canvas.removeEventListener('touchstart', this.onTouchStart);
                canvas.removeEventListener('touchmove', this.onTouchMove);
                canvas.removeEventListener('touchend', this.onTouchEnd);
              }
            },
          });
        }
        setIsClient(true);
      });
    });
  }, []);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const el = modelRef.current;
    if (!el) return;

    let timeoutId;

    function onAnimationFinished() {
      el.components['animation-mixer'].timeScale = 0;
      timeoutId = setTimeout(() => {
        el.components['animation-mixer'].timeScale = 1;
        const mixer = el.components['animation-mixer'].mixer;
        if (mixer) {
          mixer.setTime(0);
          mixer.clipAction(mixer._actions[0]._clip).play();
        }
      }, pauseDuration);
    }

    function onModelLoaded() {
      el.components['animation-mixer'].timeScale = 1;
    }

    el.addEventListener('animation-finished', onAnimationFinished);
    el.addEventListener('model-loaded', onModelLoaded);

    return () => {
      el.removeEventListener('animation-finished', onAnimationFinished);
      el.removeEventListener('model-loaded', onModelLoaded);
      clearTimeout(timeoutId);
    };
  }, [isClient]);

  if (!isClient) return null;

  const scale = isMobile ? '0.5 0.5 0.5' : '1.5 1.5 1.5';
  const position = isMobile ? '0 -0.5 0' : '3 -1 2';
  const cameraPosition = isMobile ? '0 1.5 5' : '0 2.5 9';
  const cameraRotation = isMobile ? '-10 0 7' : '-20 10 0';

  return (
    <a-scene style={{ width: '100%', height: '100vh' }}>
      <a-camera position={cameraPosition} rotation={cameraRotation} look-controls="enabled: false" />
      <a-entity
        ref={modelRef}
        gltf-model="/assets/me2.gltf"
        position={position}
        scale={scale}
        rotation="10 610 10"
        cursor-rotate-xy
        animation-mixer="clip: *; loop: once; timeScale: 1"
        events={{ 'model-loaded': () => console.log('Model loaded!') }}
      />
    </a-scene>
  );
}
