"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const NODE_OPACITY = 0.14;
const LINE_OPACITY = 0.12;
const MOUSE_LINE_OPACITY = 0.24;
const CONNECT_DISTANCE = 130;
const MOUSE_CONNECT_DISTANCE = 220;
const MOUSE_LERP = 0.08;

function getNodeCount(width: number) {
  if (width < 640) return 32;
  if (width < 1024) return 55;
  return 80;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    let visible = true;

    const mouse = { x: -9999, y: -9999 };
    const rawPointer = { x: -9999, y: -9999 };
    let mouseActive = false;

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = getNodeCount(width);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    // Raw client coords only — the container-relative conversion happens
    // once per animation frame, not once per (much higher-frequency) event.
    function handlePointerMove(e: PointerEvent) {
      rawPointer.x = e.clientX;
      rawPointer.y = e.clientY;
    }

    function handlePointerLeave() {
      mouseActive = false;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    function draw() {
      rafId = requestAnimationFrame(draw);
      if (!visible) return;

      const rect = container!.getBoundingClientRect();
      const relX = rawPointer.x - rect.left;
      const relY = rawPointer.y - rect.top;
      mouseActive = relX >= 0 && relX <= width && relY >= 0 && relY <= height;

      mouse.x += (relX - mouse.x) * MOUSE_LERP;
      mouse.y += (relY - mouse.y) * MOUSE_LERP;

      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DISTANCE) {
            const alpha = LINE_OPACITY * (1 - dist / CONNECT_DISTANCE);
            ctx!.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      if (mouseActive) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_CONNECT_DISTANCE) {
            const alpha = MOUSE_LINE_OPACITY * (1 - dist / MOUSE_CONNECT_DISTANCE);
            ctx!.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.stroke();
          }
        }
        ctx!.fillStyle = "rgba(255,255,255,0.4)";
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.fillStyle = `rgba(255,255,255,${NODE_OPACITY})`;
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}
