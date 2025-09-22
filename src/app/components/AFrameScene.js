"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import TypeWritter from "./TypeWritter";

export default function AFrameScene() {
  const [isClient, setIsClient] = useState(false);
  const [roomScale, setRoomScale] = useState("1.1 1.1 1.1");

  // Управление отображением текста
  const [showFirstText, setShowFirstText] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);

  useEffect(() => {
    // Адаптация масштаба под ширину экрана
    function updateScale() {
      if (window.innerWidth < 768) {
        setRoomScale("0.8 0.8 0.8"); // мобильные
      } else if (window.innerWidth < 1024) {
        setRoomScale("1 1 1"); // планшеты
      } else {
        setRoomScale("1.1 1.1 1.1"); // десктоп
      }
    }

    updateScale();
    window.addEventListener("resize", updateScale);

    import("aframe").then(() => {
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

      if (!window.AFRAME.components["rain-cat"]) {
        window.AFRAME.registerComponent("rain-cat", {
          schema: {
            modelSrc: { type: "string", default: "/assets/cat.gltf" },
            active: { default: false },
          },
          init: function () {
            this.rainEntities = [];
            this.interval = null;
            this.toggleRain = this.toggleRain.bind(this);
            this.el.addEventListener("click", this.toggleRain);
          },
          toggleRain: function () {
            this.data.active = !this.data.active;
            if (this.data.active) {
              this.startRain();
            } else {
              this.stopRain();
            }
          },
          startRain: function () {
            this.interval = setInterval(() => {
              if (!this.data.active) return;
              for (let i = 0; i < 3; i++) {
                const entity = document.createElement("a-entity");
                entity.setAttribute("gltf-model", this.data.modelSrc);
                const scale = (0.3 + Math.random() * 1.2).toFixed(2);
                const x = (Math.random() * 8 - 4).toFixed(2);
                const y = 9 + Math.random() * 2;
                const z = (Math.random() * 6 - 3).toFixed(2);
                entity.setAttribute("scale", `${scale} ${scale} ${scale}`);
                entity.setAttribute("position", `${x} ${y} ${z}`);
                entity.setAttribute("animation", {
                  property: "position",
                  from: `${x} ${y} ${z}`,
                  to: `${x} 0 ${z}`,
                  dur: 2200 + Math.random() * 1500,
                  easing: "easeIn",
                });
                this.el.sceneEl.appendChild(entity);
                this.rainEntities.push(entity);
                setTimeout(() => {
                  if (entity.parentNode) entity.parentNode.removeChild(entity);
                }, 3500);
              }
            }, 200);
          },
          stopRain: function () {
            clearInterval(this.interval);
            this.rainEntities.forEach((entity) => {
              if (entity.parentNode) entity.parentNode.removeChild(entity);
            });
            this.rainEntities = [];
          },
          remove: function () {
            clearInterval(this.interval);
            this.stopRain();
            this.el.removeEventListener("click", this.toggleRain);
          },
        });
      }

      setIsClient(true);
    });

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  if (!isClient) return null;

  return (
    <>
      <a-scene style={{ width: "100%", height: "100vh" }}>
        <a-entity camera look-controls>
          <a-cursor
            fuse="false"
            raycaster="objects: .clickable"
            material="color: black; shader: flat"
          />
        </a-entity>

        <a-camera position="0 3 10.5" rotation="-20 0 0" look-controls="enabled: false" />

        {/* Комната со scale под устройство */}
        <a-entity
          gltf-model="/assets/room.gltf"
          position="0 -2 2"
          scale={roomScale}
          rotation="0 680 0"
          cursor-rotate-xy
        >
          <a-entity
            className="clickable"
            gltf-model="/assets/cat.gltf"
            position="1.8 3.6 -2.5"
            scale="0.7 0.7 0.7"
            rotation="0 170 0"
            rain-cat="modelSrc: /assets/cat.gltf"
          />
        </a-entity>
      </a-scene>

      {/* Фиксированная кнопка */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
          fontFamily: "Handjet, sans-serif",
        }}
      >
        <Button onClick={() => alert("Кнопка нажата!")}>связаться</Button>
      </div>

      {/* Первый текст с эффектом печатной машинки */}
      <div
        style={{
          position: "absolute",
          top: "51%",
          left: "9%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            color: "black",
            width: "100px",
            height: "200px",
            justifyContent: "center",
            padding: "5px 10px",
            fontFamily: "Handjet, sans-serif",
          }}
        >
          {showFirstText && (
            <TypeWritter
              text="Прривет! Меня зовут Аня, я веб-дизайнер"
              speed={100}
              onTypingEnd={() => setShowSecondText(true)}
            />
          )}
        </h2>
      </div>

      {/* Второй текст с эффектом печатной машинки */}
      <div
        style={{
          position: "absolute",
          top: "51%",
          right: "9%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          zIndex: 20,
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            color: "black",
            width: "100px",
            height: "200px",
            justifyContent: "center",
            padding: "5px 10px",
            fontFamily: "Handjet, sans-serif",
          }}
        >
          {showSecondText && (
            <TypeWritter
              text="Этто моя рабочая комната! Её можно покрутить"
              speed={100}
            />
          )}
        </h2>
      </div>
    </>
  );
}
