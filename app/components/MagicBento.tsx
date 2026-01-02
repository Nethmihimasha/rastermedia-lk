'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
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

const DEFAULT_PARTICLE_COUNT = 15; // Increased for more visible effect
const DEFAULT_SPOTLIGHT_RADIUS = 400; // Larger radius for smoother glow
const DEFAULT_GLOW_COLOR = '93, 205, 219'; // Cyan
const MOBILE_BREAKPOINT = 1024; // Switched to tablet breakpoint for stack layout

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute; width: 10px; height: 10px; border-radius: 0%;
    background: rgba(${color}, 1); box-shadow: 0 0 8px rgba(${color}, 0.7);
    pointer-events: none; z-index: 100; left: ${x}px; top: ${y}px;
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
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () => createParticleElement(Math.random() * width, Math.random() * height, glowColor));
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
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
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;
    const handleMouseEnter = () => { isHoveredRef.current = true; animateParticles(); if (enableTilt) gsap.to(element, { rotateX: 2, rotateY: 2, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 }); };
    const handleMouseLeave = () => { isHoveredRef.current = false; clearAllParticles(); if (enableTilt) gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' }); if (enableMagnetism) gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' }); };
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top; const centerX = rect.width / 2; const centerY = rect.height / 2;
      if (enableTilt) gsap.to(element, { rotateX: ((y - centerY) / centerY) * -5, rotateY: ((x - centerX) / centerX) * 5, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      if (enableMagnetism) magnetismAnimationRef.current = gsap.to(element, { x: (x - centerX) * 0.05, y: (y - centerY) * 0.05, duration: 0.3, ease: 'power2.out' });
    };
    element.addEventListener('mouseenter', handleMouseEnter); element.addEventListener('mouseleave', handleMouseLeave); element.addEventListener('mousemove', handleMouseMove);
    return () => { isHoveredRef.current = false; element.removeEventListener('mouseenter', handleMouseEnter); element.removeEventListener('mouseleave', handleMouseLeave); element.removeEventListener('mousemove', handleMouseMove); clearAllParticles(); };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, glowColor]);

  return <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>{children}</div>;
};

const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }: GlobalSpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `position: fixed; width: 800px; height: 800px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(${glowColor}, 0.1) 0%, rgba(${glowColor}, 0.05) 20%, transparent 70%); z-index: 200; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      if (!rect || e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) { gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 }); return; }
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      const cards = gridRef.current.querySelectorAll('.card');
      let minDistance = Infinity;
      cards.forEach((card: Element) => {
        const cardElement = card as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
        const distance = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2)) - Math.max(rect.width, rect.height) / 2;
        minDistance = Math.min(minDistance, Math.max(0, distance));
        const intensity = distance <= proximity ? 1 : distance <= fadeDistance ? (fadeDistance - distance) / (fadeDistance - proximity) : 0;
        updateCardGlowProperties(cardElement, e.clientX, e.clientY, intensity, spotlightRadius);
      });
      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 });
      gsap.to(spotlightRef.current, { opacity: minDistance <= proximity ? 0.6 : 0, duration: 0.2 });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => { document.removeEventListener('mousemove', handleMouseMove); spotlightRef.current?.remove(); };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);
  return null;
};

const MagicBento = ({ items, enableStars = false, enableSpotlight = true, enableBorderGlow = true, disableAnimations = false, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, particleCount = DEFAULT_PARTICLE_COUNT, enableTilt = false, glowColor = "93, 205, 219", enableMagnetism = true }: MagicBentoProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile(); window.addEventListener('resize', checkMobile); return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%; --glow-y: 50%; --glow-intensity: 0; --glow-radius: 400px;
            --glow-color: ${glowColor}; --border-color: rgba(255, 255, 255, 0.08); --background-dark: rgba(20, 20, 20, 0.4);
          }
          .card-responsive { display: flex; flex-direction: column; gap: 30px; width: 100%; max-width: 1080px; margin: 0 auto; }
          .card {
            width: 100%; min-height: 360px; position: relative; background: var(--background-dark);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--border-color); border-radius: 22px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow: hidden;
          }
          .card--border-glow::after {
            content: ''; position: absolute; inset: 0; padding: 1.5px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 0%, transparent 60%);
            border-radius: inherit; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; opacity: 1; z-index: 1;
          }
          /* Custom Grid Layout for Content */
          .card-grid {
            display: grid;
            grid-template-columns: 1fr 300px; /* Main Content - Features */
            gap: 48px;
            height: 100%;
            padding: 56px;
            align-items: start;
            position: relative;
            z-index: 2;
          }
          .card-content-left {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .card-icon-num {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 12px;
          }
          .icon-box {
            width: 68px;
            height: 68px;
            background: rgba(93, 205, 219, 0.08);
            border: 1px solid rgba(93, 205, 219, 0.15);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgb(${glowColor});
            box-shadow: 0 8px 24px -8px rgba(93, 205, 219, 0.08);
            flex-shrink: 0;
          }
          .card-number {
            font-family: 'Cousine', monospace;
            font-size: 20px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.3);
          }
          .card-title {
            font-family: 'Erbaum', 'Cousine', monospace;
            font-size: 28px;
            font-weight: 700;
            color: #FFFFFF;
            line-height: 1.3;
          }
          .card-desc {
            font-family: 'Cousine', monospace;
            font-size: 16px;
            line-height: 28px;
            color: #A0A0A0;
          }
          .card-learn-more {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: rgb(${glowColor});
            font-family: 'Cousine', monospace;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 8px;
            transition: opacity 0.2s;
          }
          .card-learn-more:hover {
            opacity: 0.8;
          }
          .features-right {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .feature-item {
            padding-bottom: 18px;
            border-bottom: 1px solid rgba(93, 205, 219, 0.08);
          }
          .feature-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .feature-tag {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.06);
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 13px;
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
          
          /* Responsive Layout */
          @media (max-width: 1024px) {
            .card-grid {
              grid-template-columns: 1fr;
              gap: 24px;
              padding: 32px;
            }
            .features-right {
              flex-direction: row;
              flex-wrap: wrap;
              gap: 8px;
            }
            .feature-item {
              border-bottom: none;
              padding-bottom: 0;
              flex: 0 1 auto;
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
                {/* Left Column: Main Content */}
                <div className="card-content-left">
                  <div className="card-icon-num">
                    <div className="icon-box">
                      {service.icon}
                    </div>
                    <span className="card-number">{service.number}</span>
                  </div>
                  <h3 className="card-title">{service.title}</h3>
                  <p className="card-desc">{service.description}</p>
                  <div className="card-learn-more">
                    Learn More
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Right Column: Features */}
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