"use client";

import React, { useEffect, useState } from 'react';

export default function AFrameScene() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверяем是否是 мобильное устройство
    const checkMobile = () => {
      return window.innerWidth <= 768;
    };
    
    setIsMobile(checkMobile());
    
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);

    import('aframe').then(() => {
      import('aframe-extras').then(() => {
        setIsClient(true);
      });
    });

    // Регистрируем компонент вращения мышью, если он не зарегистрирован.
    if (typeof window !== 'undefined' && window.AFRAME && !window.AFRAME.components['cursor-rotate-xy']) {
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isClient) return null;

  // Настройки масштаба для разных устройств
  const scale = isMobile ? "0.5 0.5 0.5" : "1.5 1.5 1.5";
  const position = isMobile ? "0 -2.5 0" : "3 -1 2";
  const cameraPosition = isMobile ? "0 1.5 5" : "0 2.5 9";
  const cameraRotation = isMobile ? "-10 0 7" : "-20 10 0";

  return (
    <>
      <a-scene style={{ width: '100%', height: '100vh' }}>
        <a-camera position={cameraPosition} rotation={cameraRotation} look-controls="enabled: false" />

        <a-entity
          gltf-model="/assets/me.gltf"
          position={position}
          scale={scale}
          rotation="10 610 10"
          cursor-rotate-xy
          animation-mixer="clip: *; loop: repeat; speed: 6"
          events={{ 'model-loaded': () => console.log('Model loaded!') }}
        />
      </a-scene>

      {/* <div
        style={{
          position: 'absolute',
          top: '13%',
          right: '3%',
         
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            color: 'black',
            // transform: 'rotate(90deg)',
            transformOrigin: 'left top',
            position: 'absolute',
            top: '0%',
            right: '0%',
            fontFamily: 'Handjet, sans-serif',
          }}
        >
          Поверти
        </h2>
      </div> */}
    </>
  );
}