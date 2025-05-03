import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  originalX: number;  // Store original position
  originalY: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  connectDistance?: number;
  repulseDistance?: number;
}

export default function ParticleBackground({
  particleCount = 120,
  connectDistance = 150,
  repulseDistance = 150,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null; speedX?: number; speedY?: number }>({ x: null, y: null });
  const touchRef = useRef<{ x: number | null; y: null; speedX?: number; speedY?: number }>({ x: null, y: null });
  const prevMousePosRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animationFrameRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const { isDarkMode } = useTheme();

  // Beautiful shades of blue for particles
  const blueShades = [
    // Light mode colors (lighter, softer blues)
    ...(isDarkMode ? [] : [
      "#E3F2FD", // Very light blue
      "#BBDEFB", // Light blue
      "#90CAF9", // Sky blue
      "#64B5F6", // Bright blue
      "#42A5F5", // Primary blue
      "#2196F3", // Standard blue
      "#1E88E5", // Medium blue
      "#1976D2", // Deep blue
      "#1565C0", // Rich blue
      "#0D47A1"  // Dark blue
    ]),
    // Dark mode colors (deeper, more vibrant blues)
    ...(isDarkMode ? [
      "#0288D1", // Ocean blue
      "#0277BD", // Deep ocean blue
      "#01579B", // Dark ocean blue
      "#039BE5", // Bright ocean blue
      "#03A9F4", // Sky blue
      "#00BCD4", // Cyan
      "#26C6DA", // Light cyan
      "#4DD0E1", // Bright cyan
      "#81D4FA", // Light sky blue
      "#B3E5FC"  // Very light sky blue
    ] : [])
  ];

  // Initialize particles with more initial movement
  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const particles: Particle[] = [];
    
    // Create particles with more initial energy
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 1;
      const speedY = (Math.random() - 0.5) * 1;
      const color = blueShades[Math.floor(Math.random() * blueShades.length)];
      const opacity = Math.random() * 0.5 + 0.3;
      
      particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        color,
        opacity,
        originalX: x,
        originalY: y
      });
    }
    
    particlesRef.current = particles;
  }, [particleCount, blueShades]);

  // Update canvas size and particle positions when window resizes or scrolls
  const updateCanvasSize = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    
    if (container) {
      const rect = container.getBoundingClientRect();
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.transform = `translateY(${window.scrollY}px)`;

      // Reinitialize particles if canvas was empty
      if (particlesRef.current.length === 0) {
        initParticles();
      } else {
        // Scale existing particle positions to new canvas size
        const scaleX = canvas.width / oldWidth;
        const scaleY = canvas.height / oldHeight;
        
        particlesRef.current.forEach(particle => {
          particle.x *= scaleX;
          particle.y *= scaleY;
          particle.originalX *= scaleX;
          particle.originalY *= scaleY;
        });
      }
      
      // Update particle positions relative to scroll
      const scrollDiff = window.scrollY - lastScrollY.current;
      if (scrollDiff !== 0) {
        particlesRef.current.forEach(particle => {
          particle.y -= scrollDiff;
          particle.originalY -= scrollDiff;
          particle.speedX += (Math.random() - 0.5) * Math.abs(scrollDiff) * 0.05;
        });
      }
      lastScrollY.current = window.scrollY;
    }
  }, [initParticles]);

  // Draw particles and connections
  const drawParticles = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Add base movement to all particles
    particlesRef.current.forEach((particle, i) => {
      // Add constant subtle movement
      particle.speedX += (Math.random() - 0.5) * 0.05;
      particle.speedY += (Math.random() - 0.5) * 0.05;
      
      // Mouse/touch interaction with enhanced responsiveness
      const interactionPoint = mouseRef.current.x !== null ? mouseRef.current : touchRef.current;
      
      if (interactionPoint.x !== null && interactionPoint.y !== null) {
        const dx = interactionPoint.x - particle.x;
        const dy = interactionPoint.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Expanded interaction zone
        const attractionDistance = repulseDistance * 2;
        
        if (distance < attractionDistance) {
          const angle = Math.atan2(dy, dx);
          let force: number;
          
          if (distance < repulseDistance) {
            // Stronger close range repulsion
            force = -0.15 * (1 - distance / repulseDistance);
          } else {
            // Stronger medium range attraction
            force = 0.08 * (1 - (distance - repulseDistance) / (attractionDistance - repulseDistance));
          }
          
          // Enhanced velocity influence
          const velocityMultiplier = Math.sqrt(
            (interactionPoint.speedX || 0) ** 2 + 
            (interactionPoint.speedY || 0) ** 2
          ) * 0.5; // Increased velocity impact

          const targetSpeedX = Math.cos(angle) * force * (1 + velocityMultiplier);
          const targetSpeedY = Math.sin(angle) * force * (1 + velocityMultiplier);
          
          // More immediate response
          particle.speedX += (targetSpeedX - particle.speedX) * 0.6;
          particle.speedY += (targetSpeedY - particle.speedY) * 0.6;
        } else {
          // Weaker return force for more freedom of movement
          const returnForceX = (particle.originalX - particle.x) * 0.01;
          const returnForceY = (particle.originalY - particle.y) * 0.01;
          particle.speedX += returnForceX;
          particle.speedY += returnForceY;
        }
      } else {
        // Lighter return force when no interaction
        const returnForceX = (particle.originalX - particle.x) * 0.01;
        const returnForceY = (particle.originalY - particle.y) * 0.01;
        particle.speedX += returnForceX;
        particle.speedY += returnForceY;
      }

      // Apply movement
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Reduced damping for more persistent movement
      particle.speedX *= 0.98;
      particle.speedY *= 0.98;
      
      // Increased max speed
      const maxSpeed = 5;
      const currentSpeed = Math.sqrt(particle.speedX ** 2 + particle.speedY ** 2);
      if (currentSpeed > maxSpeed) {
        particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
        particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
      }

      // Ensure particles stay within bounds with bounce
      if (particle.x > canvas.width) {
        particle.x = canvas.width;
        particle.speedX *= -1;
      } else if (particle.x < 0) {
        particle.x = 0;
        particle.speedX *= -1;
      }
      
      if (particle.y > canvas.height) {
        particle.y = canvas.height;
        particle.speedY *= -1;
      } else if (particle.y < 0) {
        particle.y = 0;
        particle.speedY *= -1;
      }

      // Enhanced glow effect based on speed
      const speedFactor = Math.sqrt(particle.speedX ** 2 + particle.speedY ** 2) / maxSpeed;
      const glowSize = particle.size * (1 + speedFactor * 2);
      
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, glowSize
      );
      gradient.addColorStop(0, `${particle.color}`);
      gradient.addColorStop(1, `${particle.color}00`);
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Connect particles with gradient lines
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const other = particlesRef.current[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectDistance) {
          const opacity = (1 - distance / connectDistance) * 0.5;
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y, other.x, other.y
          );
          gradient.addColorStop(0, `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(1, `${other.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });
    
    animationFrameRef.current = requestAnimationFrame(drawParticles);
  }, [repulseDistance, connectDistance]);

  // Handle mouse/touch movement with improved accuracy
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top + window.scrollY;

    if (prevMousePosRef.current.x !== null && prevMousePosRef.current.y !== null) {
      const speedX = (currentX - prevMousePosRef.current.x) * 0.5;
      const speedY = (currentY - prevMousePosRef.current.y) * 0.5;
      mouseRef.current = {
        x: currentX,
        y: currentY,
        speedX,
        speedY
      };
    } else {
      mouseRef.current = { x: currentX, y: currentY };
    }

    prevMousePosRef.current = { x: currentX, y: currentY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!canvasRef.current || !e.touches[0]) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.touches[0].clientX - rect.left;
    const currentY = e.touches[0].clientY - rect.top + window.scrollY;

    if (prevMousePosRef.current.x !== null && prevMousePosRef.current.y !== null) {
      const speedX = (currentX - prevMousePosRef.current.x) * 0.5;
      const speedY = (currentY - prevMousePosRef.current.y) * 0.5;
      touchRef.current = {
        x: currentX,
        y: currentY,
        speedX,
        speedY
      };
    } else {
      touchRef.current = { x: currentX, y: currentY };
    }

    prevMousePosRef.current = { x: currentX, y: currentY };
    e.preventDefault();
  }, []);

  // Handle mouse/touch leave
  const handleInteractionEnd = useCallback(() => {
    mouseRef.current = { x: null, y: null };
    touchRef.current = { x: null, y: null };
    prevMousePosRef.current = { x: null, y: null };
  }, []);

  // Setup event listeners and start animation
  useEffect(() => {
    // Initialize particles on mount
    initParticles();
    updateCanvasSize();
    
    window.addEventListener("resize", updateCanvasSize);
    window.addEventListener("scroll", updateCanvasSize, { passive: true });
    
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleInteractionEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleInteractionEnd);
    }
    
    animationFrameRef.current = requestAnimationFrame(drawParticles);
    
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("scroll", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleInteractionEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleInteractionEnd);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateCanvasSize, drawParticles, handleMouseMove, handleTouchMove, handleInteractionEnd, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ 
        backgroundColor: "transparent",
        willChange: "transform",
        transform: `translateY(${window.scrollY}px)`
      }}
    />
  );
}
