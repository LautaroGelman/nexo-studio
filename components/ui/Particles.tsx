"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Capa de partículas para el Home.
 * - Canvas full-bleed, posicionado absoluto detrás del contenido.
 * - Respeta prefers-reduced-motion (no anima).
 * - Densidad baja por defecto para no saturar visualmente.
 * - Sin librerías externas.
 */
export const Particles = ({
  className = "",
  density = 70,
  color = "rgba(0,0,0,0.55)",
  linkDistance = 130,
}: {
  className?: string;
  density?: number;
  color?: string;
  linkDistance?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Retry si el layout aún no asignó tamaño (puede pasar en hidratación / layout-shift)
      if (width === 0 || height === 0) {
        return false;
      }

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densidad escalada al área (no demasiado en mobile).
      const area = width * height;
      const target = Math.min(
        density,
        Math.max(20, Math.floor((area / 1_000_000) * density * 1.2))
      );
      particles = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.4,
      }));
      return true;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Update
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // Lines
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDistance * linkDistance) {
            const alpha = 1 - Math.sqrt(d2) / linkDistance;
            ctx.strokeStyle = color.replace(
              /rgba?\(([^)]+)\)/,
              (_m, body: string) => {
                const parts = body.split(",").map((s) => s.trim());
                const r = parts[0] ?? "0";
                const g = parts[1] ?? "0";
                const bl = parts[2] ?? "0";
                return `rgba(${r},${g},${bl},${(alpha * 0.18).toFixed(3)})`;
              }
            );
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Dots
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      const ok = resize();
      if (!ok) return; // esperaremos al ResizeObserver
      if (reduced) {
        drawStatic();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    // Iniciar tras un frame para asegurar que el layout del contenedor esté listo
    const initRaf = requestAnimationFrame(start);

    const onWindowResize = () => {
      cancelAnimationFrame(raf);
      resize();
      if (reduced) drawStatic();
      else raf = requestAnimationFrame(tick);
    };
    window.addEventListener("resize", onWindowResize);

    // ResizeObserver para detectar cambios de tamaño del contenedor (layout-shift, fuentes, etc)
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        resize();
        if (reduced) drawStatic();
        else raf = requestAnimationFrame(tick);
      });
      ro.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(initRaf);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onWindowResize);
      if (ro) ro.disconnect();
    };
  }, [density, color, linkDistance, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default Particles;
