import React, { useEffect, useRef } from 'react';
import './animation.scss';

const Animation = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      const particles = [];
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: (Math.random() - 0.5) * 0.02,
          waveOffset: Math.random() * Math.PI * 2,
          waveSpeed: Math.random() * 0.02 + 0.01,
          waveAmplitude: Math.random() * 20 + 10
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    const drawWave = (ctx, x, y, size, color, angle, waveOffset) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Draw wave shape
      ctx.beginPath();
      ctx.moveTo(-size, 0);

      for (let i = -size; i <= size; i += 5) {
        const waveY = Math.sin(i * 0.1 + waveOffset) * 10;
        ctx.lineTo(i, waveY);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#2d2d2d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.angle += particle.angleSpeed;
        particle.waveOffset += particle.waveSpeed;

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

        // Draw particle
        drawWave(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.color,
          particle.angle,
          particle.waveOffset
        );
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="animation-container">
      <canvas ref={canvasRef} className="wave-canvas" />
      <div className="floating-text">
        <h2>Mesmerizing Waves</h2>
        <p>Watch the beautiful dance of colors</p>
      </div>
    </div>
  );
};

export default Animation;