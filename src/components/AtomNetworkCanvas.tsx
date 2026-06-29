import { useEffect, useRef } from 'react';

const PARTICLE_COLORS = ['#00d4ff', '#06b6d4', '#4f46e5', '#7c3aed', '#a855f7'];
const CONNECTION_DISTANCE = 150;
const PARTICLE_SPEED = 0.3;
const ATTRACTION_STRENGTH = 0.00005;
const GLOW_RADIUS_MULT = 6;
const PULSE_INTERVAL = 3000;
const TRAJECTORY_COUNT = 4;
const MOUSE_REPEL_RADIUS = 120;
const MOUSE_REPEL_STRENGTH = 0.8;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
}

interface PulseRing {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  startTime: number;
}

interface Trajectory {
  points: { x: number; y: number; vx: number; vy: number }[];
  dashOffset: number;
}

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function AtomNetworkCanvas({ opacity = 1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let time = 0;
    const mouse = { x: -1000, y: -1000 };
    let particles: Particle[] = [];
    let pulses: PulseRing[] = [];
    let trajectories: Trajectory[] = [];
    let lastPulseTime = 0;
    let dpr = 1;

    const isMobile = () => window.innerWidth < 768;

    const createParticles = () => {
      const isM = isMobile();
      const area = width * height;
      const densityFactor = isM ? 32000 : 18000;
      let count = Math.floor(area / densityFactor);
      count = Math.max(isM ? 25 : 40, Math.min(isM ? 60 : 120, count));

      particles = [];
      for (let i = 0; i < count; i++) {
        const colorIdx = i % 5 === 0 ? 0 : i % 5 === 1 ? 1 : i % 5 === 2 ? 2 : i % 3 === 0 ? 3 : 4;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: randomRange(-PARTICLE_SPEED, PARTICLE_SPEED),
          vy: randomRange(-PARTICLE_SPEED, PARTICLE_SPEED),
          radius: randomRange(2, 5),
          color: PARTICLE_COLORS[colorIdx],
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const createTrajectories = () => {
      trajectories = [];
      for (let t = 0; t < TRAJECTORY_COUNT; t++) {
        const points = [];
        for (let p = 0; p < 4; p++) {
          points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: randomRange(-0.2, 0.2),
            vy: randomRange(-0.2, 0.2),
          });
        }
        trajectories.push({ points, dashOffset: t * 20 });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      createParticles();
      createTrajectories();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < p.radius) { p.x = p.radius; p.vx *= -0.8; }
        if (p.x > width - p.radius) { p.x = width - p.radius; p.vx *= -0.8; }
        if (p.y < p.radius) { p.y = p.radius; p.vy *= -0.8; }
        if (p.y > height - p.radius) { p.y = height - p.radius; p.vy *= -0.8; }

        // Gentle attraction to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE && dist > 1) {
            const force = ATTRACTION_STRENGTH * dist;
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * force;
            p.vy += ny * force;
            q.vx -= nx * force;
            q.vy -= ny * force;
          }
        }

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_REPEL_RADIUS && mDist > 1) {
          const force = (1 - mDist / MOUSE_REPEL_RADIUS) * MOUSE_REPEL_STRENGTH;
          const nx = mdx / mDist;
          const ny = mdy / mDist;
          p.vx += nx * force;
          p.vy += ny * force;
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;
      }
    };

    const drawBonds = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p = particles[i];
          const q = particles[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.4;
            const grad = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
            grad.addColorStop(0, p.color + Math.floor(alpha * 102).toString(16).padStart(2, '0'));
            grad.addColorStop(1, q.color + Math.floor(alpha * 102).toString(16).padStart(2, '0'));
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        const pulseAlpha = 0.6 + 0.4 * Math.sin(time * 2 + p.phase);

        // Outer glow
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * GLOW_RADIUS_MULT);
        const glowColor = p.color + '26'; // ~15% alpha
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, p.color + '00');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * GLOW_RADIUS_MULT, 0, Math.PI * 2);
        ctx.fill();

        // Mouse proximity glow boost
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_REPEL_RADIUS) {
          const boost = (1 - mDist / MOUSE_REPEL_RADIUS) * 0.3;
          const boostGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * GLOW_RADIUS_MULT * 1.5);
          boostGrad.addColorStop(0, p.color + Math.floor((0.15 + boost) * 255).toString(16).padStart(2, '0'));
          boostGrad.addColorStop(1, p.color + '00');
          ctx.fillStyle = boostGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * GLOW_RADIUS_MULT * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        ctx.fillStyle = p.color + Math.floor(pulseAlpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const updatePulses = () => {
      const now = time * 1000;
      if (now - lastPulseTime > PULSE_INTERVAL) {
        lastPulseTime = now;
        const p = particles[Math.floor(Math.random() * particles.length)];
        if (!isMobile()) {
          pulses.push({ x: p.x, y: p.y, radius: 0, alpha: 0.3, startTime: now });
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const elapsed = now - pulse.startTime;
        pulse.radius = elapsed * 0.015;
        pulse.alpha = Math.max(0, 0.3 - elapsed * 0.00015);
        if (pulse.alpha <= 0) {
          pulses.splice(i, 1);
        }
      }
    };

    const drawPulses = () => {
      for (const pulse of pulses) {
        ctx.strokeStyle = `rgba(0, 212, 255, ${pulse.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const updateTrajectories = () => {
      for (const traj of trajectories) {
        for (const pt of traj.points) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.x < 0 || pt.x > width) pt.vx *= -1;
          if (pt.y < 0 || pt.y > height) pt.vy *= -1;
          pt.vx += randomRange(-0.01, 0.01);
          pt.vy += randomRange(-0.01, 0.01);
          pt.vx = Math.max(-0.5, Math.min(0.5, pt.vx));
          pt.vy = Math.max(-0.5, Math.min(0.5, pt.vy));
        }
        traj.dashOffset -= 0.3;
      }
    };

    const drawTrajectories = () => {
      for (const traj of trajectories) {
        const pts = traj.points;
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = traj.dashOffset;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.bezierCurveTo(pts[1].x, pts[1].y, pts[2].x, pts[2].y, pts[3].x, pts[3].y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      drawGrid();
      updateTrajectories();
      drawTrajectories();
      updateParticles();
      drawBonds();
      drawParticles();
      updatePulses();
      drawPulses();

      time += 0.016;
      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        opacity,
      }}
    />
  );
}
