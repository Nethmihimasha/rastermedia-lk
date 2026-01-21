'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

type ParticleCardProps = {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
};

type GlobalSpotlightProps = {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
};

type MagicBentoItem = {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  features?: string[];
};

type MagicBentoProps = {
  items: MagicBentoItem[];
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  enableMagnetism?: boolean;
};

const DEFAULT_PARTICLE_COUNT = 15;
const DEFAULT_SPOTLIGHT_RADIUS = 400;
const DEFAULT_GLOW_COLOR = '93, 205, 219';
const MOBILE_BREAKPOINT = 1024;

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute; width: 10px; height: 10px; border-radius: 50%;
    background: rgba(${color}, 1); box-shadow: 0 0 8px rgba(${color}, 0.7);
    pointer-events: none; z-index: 100; left: ${x}px; top: ${y}px;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard = ({ children, className = '', disableAnimations = false, style, particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR, enableTilt = true, enableMagnetism = false }: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () => createParticleElement(Math.random() * width, Math.random() * height, glowColor));
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    intervalsRef.current.forEach((id) => window.clearInterval(id));
    timeoutsRef.current = [];
    intervalsRef.current = [];
    
    particlesRef.current.forEach(particle => {
      particle.style.opacity = '0';
      particle.style.transform = 'scale(0)';
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 300);
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();
    
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = window.setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        
        // Animate in
        setTimeout(() => {
          clone.style.opacity = '1';
          clone.style.transform = 'scale(1)';
        }, 10);
        
        // Float animation
        const startX = parseFloat(clone.style.left);
        const startY = parseFloat(clone.style.top);
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = (Math.random() - 0.5) * 100;
        let progress = 0;
        
        const intervalId = window.setInterval(() => {
          if (!isHoveredRef.current) return;
          progress += 0.01;
          const offset = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
          clone.style.left = `${startX + moveX * offset}px`;
          clone.style.top = `${startY + moveY * offset}px`;
          clone.style.opacity = `${0.3 + Math.sin(progress * Math.PI * 4) * 0.3}`;
        }, 50);
        
        intervalsRef.current.push(intervalId);
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;
    
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        element.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(2deg)';
      }
    };
    
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
      if (enableMagnetism) {
        element.style.transform = 'translate(0, 0)';
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      if (enableTilt) {
        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = ((y - centerY) / centerY) * -5;
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      
      if (enableMagnetism) {
        const translateX = (x - centerX) * 0.05;
        const translateY = (y - centerY) * 0.05;
        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    };
    
    element.style.transition = 'transform 0.3s ease-out';
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism]);

  return <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>{children}</div>;
};

const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }: GlobalSpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(${glowColor}, 0.1) 0%, rgba(${glowColor}, 0.05) 20%, transparent 70%);
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: opacity 0.3s ease, left 0.1s ease, top 0.1s ease;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      
      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      
      if (!rect || e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
        spotlightRef.current.style.opacity = '0';
        return;
      }
      
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      const cards = gridRef.current.querySelectorAll('.card');
      let minDistance = Infinity;
      
      cards.forEach((card: Element) => {
        const cardElement = card as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
        const distance = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        ) - Math.max(rect.width, rect.height) / 2;
        
        minDistance = Math.min(minDistance, Math.max(0, distance));
        const intensity = distance <= proximity ? 1 : distance <= fadeDistance ? (fadeDistance - distance) / (fadeDistance - proximity) : 0;
        updateCardGlowProperties(cardElement, e.clientX, e.clientY, intensity, spotlightRadius);
      });
      
      spotlightRef.current.style.left = `${e.clientX}px`;
      spotlightRef.current.style.top = `${e.clientY}px`;
      spotlightRef.current.style.opacity = minDistance <= proximity ? '0.6' : '0';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlightRef.current?.remove();
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);
  
  return null;
};

const MagicBento = ({ items = [], enableStars = false, enableSpotlight = true, enableBorderGlow = true, disableAnimations = false, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, particleCount = DEFAULT_PARTICLE_COUNT, enableTilt = false, glowColor = "93, 205, 219", enableMagnetism = true }: MagicBentoProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisableAnimations = disableAnimations || isMobile;
  
  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%; --glow-y: 50%; --glow-intensity: 0; --glow-radius: 400px;
            --glow-color: ${glowColor}; --border-color: rgba(255, 255, 255, 0.08); --background-dark: rgba(20, 20, 20, 0.4);
          }
          .card-responsive { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 24px; 
            width: 100%; 
            max-width: 1400px; 
            margin: 0 auto; 
          }
          .card {
            position: relative; background: var(--background-dark);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--border-color); border-radius: 22px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow: hidden;
            min-height: 320px;
          }
          .card:nth-child(1) { grid-column: span 1; grid-row: span 1; }
          .card:nth-child(2) { grid-column: span 1; grid-row: span 1; }
          .card:nth-child(3) { grid-column: span 1; grid-row: span 2; }
          .card:nth-child(4) { grid-column: span 2; grid-row: span 1; }
          .card:nth-child(5) { grid-column: span 1; grid-row: span 1; }
          .card:nth-child(6) { grid-column: span 2; grid-row: span 1; }
          .card--border-glow::after {
            content: ''; position: absolute; inset: 0; padding: 1.5px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 0%, transparent 60%);
            border-radius: inherit; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; opacity: 1; z-index: 1;
          }
          .card-grid {
            display: flex;
            flex-direction: column;
            gap: 20px;
            height: 100%;
            padding: 32px;
            align-items: start;
            position: relative;
            z-index: 2;
          }
          .card-content-left {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .card-icon-num {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
          }
          .icon-box {
            width: 48px;
            height: 48px;
            background: rgba(93, 205, 219, 0.08);
            border: 1px solid rgba(93, 205, 219, 0.15);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(${glowColor});
            box-shadow: 0 8px 24px -8px rgba(93, 205, 219, 0.08);
            flex-shrink: 0;
          }
          .icon-box svg {
            width: 22px;
            height: 22px;
          }
          .card-number {
            font-family: 'Cousine', monospace;
            font-size: 15px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.3);
          }
          .card-title {
            font-family: 'Erbaum', 'Cousine', monospace;
            font-size: 20px;
            font-weight: 700;
            color: #FFFFFF;
            line-height: 1.3;
          }
          .card-desc {
            font-family: 'Cousine', monospace;
            font-size: 13px;
            line-height: 22px;
            color: #A0A0A0;
          }
          .card-learn-more {
            display: none;
          }
          .features-right {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: auto;
          }
          .feature-item {
            border-bottom: none;
            padding-bottom: 0;
          }
          .feature-tag {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 11px;
            color: #999;
            font-family: 'Cousine', monospace;
            display: inline-block;
            transition: all 0.2s;
          }
          .feature-tag:hover {
            background: rgba(93, 205, 219, 0.1);
            color: rgb(${glowColor});
            border-color: rgba(93, 205, 219, 0.2);
          }
          
          @media (max-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
            .card:nth-child(1) { grid-column: span 1; grid-row: span 1; }
            .card:nth-child(2) { grid-column: span 1; grid-row: span 1; }
            .card:nth-child(3) { grid-column: span 2; grid-row: span 1; }
            .card:nth-child(4) { grid-column: span 1; grid-row: span 1; }
            .card:nth-child(5) { grid-column: span 1; grid-row: span 1; }
            .card:nth-child(6) { grid-column: span 2; grid-row: span 1; }
          }
          
          @media (max-width: 768px) {
            .card-responsive {
              grid-template-columns: 1fr;
              gap: 16px;
            }
            .card {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
              min-height: 280px;
            }
            .card-grid {
              padding: 24px;
            }
          }
        `}
      </style>

      {enableSpotlight && <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} glowColor={glowColor} />}

      <div className="bento-section" ref={gridRef}>
        <div className="card-responsive">
          {items.map((service: MagicBentoItem, index: number) => {
            const baseClassName = `card ${enableBorderGlow ? 'card--border-glow' : ''}`;
            
            const CardContent = () => (
              <div className="card-grid">
                <div className="card-content-left">
                  <div className="card-icon-num">
                    <div className="icon-box">
                      {service.icon}
                    </div>
                    <span className="card-number">{service.number}</span>
                  </div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.description}</p>
                </div>

                <div className="features-right">
                  {service.features && service.features.map((f: string, i: number) => (
                    <div key={i} className="feature-item">
                      <span className="feature-tag">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );

            if (enableStars) {
              return (
                <ParticleCard key={index} className={baseClassName} disableAnimations={shouldDisableAnimations} particleCount={particleCount} glowColor={glowColor} enableTilt={enableTilt} enableMagnetism={enableMagnetism}>
                  <CardContent />
                </ParticleCard>
              );
            }
            return (
              <div key={index} className={baseClassName}>
                <CardContent />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MagicBento;