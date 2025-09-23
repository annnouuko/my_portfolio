'use client';

import React, { useEffect, useState } from 'react';

export default function AFrameScene() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());
    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener('resize', handleResize);

    import('aframe').then(() => {
      import('aframe-extras').then(() => {
        if (!window.AFRAME.components['cursor-rotate-xy']) {
          window.AFRAME.registerComponent('cursor-rotate-xy', {
            schema: { rotationFactor: { type: 'number', default: 1 } },
            init: function () {
              this.rotation = { x: 0, y: 0 };
              this.isDragging = false;
              this.onMouseDown = this.onMouseDown.bind(this);
              this.onMouseMove = this.onMouseMove.bind(this);
              this.onMouseUp = this.onMouseUp.bind(this);
              if (this.el.sceneEl && this.el.sceneEl.canvas) {
                this.el.sceneEl.canvas.addEventListener('mousedown', this.onMouseDown);
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
            remove: function () {
              window.removeEventListener('mousemove', this.onMouseMove);
              window.removeEventListener('mouseup', this.onMouseUp);
              if (this.el.sceneEl && this.el.sceneEl.canvas) {
                this.el.sceneEl.canvas.removeEventListener('mousedown', this.onMouseDown);
              }
            },
          });
        }

        if (!window.AFRAME.components['touch-rotate']) {
          window.AFRAME.registerComponent('touch-rotate', {
            schema: { rotationFactor: { type: 'number', default: 1 } },
            init: function () {
              this.rotation = { x: 0, y: 0 };
              this.isDragging = false;
              this.onTouchStart = this.onTouchStart.bind(this);
              this.onTouchMove = this.onTouchMove.bind(this);
              this.onTouchEnd = this.onTouchEnd.bind(this);

              if (this.el.sceneEl && this.el.sceneEl.canvas) {
                const canvas = this.el.sceneEl.canvas;
                canvas.addEventListener('touchstart', this.onTouchStart, { passive: false });
                canvas.addEventListener('touchmove', this.onTouchMove, { passive: false });
                canvas.addEventListener('touchend', this.onTouchEnd);
              }
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
              if (this.el.sceneEl && this.el.sceneEl.canvas) {
                const canvas = this.el.sceneEl.canvas;
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scale = isMobile ? "0.5 0.5 0.5" : "1.5 1.5 1.5";
  const position = isMobile ? "0 -2.5 0" : "3 -1 2";
  const cameraPosition = isMobile ? "0 1.5 5" : "0 2.5 9";
  const cameraRotation = isMobile ? "-10 0 7" : "-20 10 0";

  if (!isClient) return null;

  return (
    <a-scene style={{ width: '100%', height: '100vh' }}>
      <a-camera position={cameraPosition} rotation={cameraRotation} look-controls="enabled: false" />
      <a-entity
        gltf-model="/assets/me2.gltf"
        position={position}
        scale={scale}
        rotation="10 610 10"
        cursor-rotate-xy
        touch-rotate
        animation-mixer="clip: *; loop: repeat; speed: 6"
        events={{ 'model-loaded': () => console.log('Model loaded!') }}
      />
    </a-scene>
  );
}
