'use client';

import { useEffect, useRef } from 'react';

/**
 * PinkTrailCursor — premium fluid trailing red particle cursor.
 * Tracks pointer globally and renders hovering red particle trail mist using canvas.
 */
export default function PinkTrailCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const colors = ['#EF2E31', '#D92528', '#FF4D4F', '#BF1E20'];
    const mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;

      // Spawn 3 particles per mouse movement for thicker density
      for (let i = 0; i < 3; i++) {
        particlesArray.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 2.5 + 0.5,
          speedX: Math.random() * 1 - 0.5, // Tighten spread on X
          speedY: Math.random() * 1 - 0.5, // Tighten spread on Y
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1, // Start at 100% opacity
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        let p = particlesArray[i];

        // Apply movement (gravity +0.8 removed for hovering effect)
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.015; // Slow decay rate for a longer-lasting, smoother trail

        // Draw the particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove from memory once invisible
        if (p.life <= 0) {
          particlesArray.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Add CSS class to hide cursor
    document.documentElement.classList.add('hide-cursor');

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('hide-cursor');
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
