"use client";

import React, { useEffect, useState, useRef } from "react";

export default function AFrameScene() {
  const [isClient, setIsClient] = useState(false);
  const modelRef = useRef(null);
  const pauseDuration = 3000; // пауза 3 секунды

  useEffect(() => {
    import("aframe").then(() => {
      import("aframe-extras").then(() => {
        if (!window.AFRAME.components["cursor-rotate-xy"]) {
          window.AFRAME.registerComponent("cursor-rotate-xy", {
            schema: { rotationFactor: { type: "number", default: 1 } },
            init: function () {
              this.rotation = { x: 0, y: 0 };
              this.isDragging = false;
              this.onMouseDown = this.onMouseDown.bind(this);
              this.onMouseMove = this.onMouseMove.bind(this);
              this.onMouseUp = this.onMouseUp.bind(this);
              if (this.el.sceneEl && this.el.sceneEl.canvas) {
                this.el.sceneEl.canvas.addEventListener("mousedown", this.onMouseDown);
              }
              window.addEventListener("mouseup", this.onMouseUp);
            },
            onMouseDown: function (event) {
              this.isDragging = true;
              this.lastX = event.clientX;
              this.lastY = event.clientY;
              const rot = this.el.getAttribute("rotation");
              this.rotation = { x: rot.x, y: rot.y };
              window.addEventListener("mousemove", this.onMouseMove);
            },
            onMouseMove: function (event) {
              if (!this.isDragging) return;
              const dx = event.clientX - this.lastX;
              const dy = event.clientY - this.lastY;
              this.lastX = event.clientX;
              this.lastY = event.clientY;
              this.rotation.y += dx * this.data.rotationFactor * 0.5;
              this.rotation.x += dy * this.data.rotationFactor * 0.5;
              this.el.setAttribute("rotation", {
                x: this.rotation.x,
                y: this.rotation.y,
                z: 0,
              });
            },
            onMouseUp: function () {
              this.isDragging = false;
              window.removeEventListener("mousemove", this.onMouseMove);
            },
            remove: function () {
              window.removeEventListener("mousemove", this.onMouseMove);
              window.removeEventListener("mouseup", this.onMouseUp);
              if (this.el.sceneEl && this.el.sceneEl.canvas) {
                this.el.sceneEl.canvas.removeEventListener("mousedown", this.onMouseDown);
              }
            },
          });
        }
        setIsClient(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const el = modelRef.current;
    if (!el) return;

    let timeoutId;

    function onAnimationFinished() {
      // Останавливаем анимацию, установив скорость 0 (заморозка на последнем кадре)
      el.components["animation-mixer"].timeScale = 0;

      // Через паузу запускаем анимацию заново с нормальной скоростью
      timeoutId = setTimeout(() => {
        el.components["animation-mixer"].timeScale = 1;
        // Запускаем анимацию с начала
        const mixer = el.components["animation-mixer"].mixer;
        if (mixer) {
          mixer.setTime(0);
          mixer.clipAction(mixer._actions[0]._clip).play();
        }
      }, pauseDuration);
    }

    el.addEventListener("animation-finished", onAnimationFinished);

    // Запускаем анимацию сразу после загрузки модели
    function onModelLoaded() {
      el.components["animation-mixer"].timeScale = 1;
    }
    el.addEventListener("model-loaded", onModelLoaded);

    return () => {
      el.removeEventListener("animation-finished", onAnimationFinished);
      el.removeEventListener("model-loaded", onModelLoaded);
      clearTimeout(timeoutId);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <a-scene style={{ width: "100%", height: "100vh" }}>
      <a-camera position="0 2.5 9" rotation="-20 10 0" look-controls="enabled: false" />

      <a-entity
        ref={modelRef}
        gltf-model="/assets/me2.gltf"
        position="2.5 -1 2"
        scale="1.5 1.5 1.5"
        rotation="10 610 10"
        cursor-rotate-xy
        animation-mixer="clip: *; loop: once; timeScale: 1"
        events={{ "model-loaded": () => console.log("Model loaded!") }}
      />
    </a-scene>
  );
}
