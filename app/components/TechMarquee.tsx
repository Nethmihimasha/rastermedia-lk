"use client";

import React from "react";
import type { CSSProperties } from "react";
import {
  SiAdobe,
  SiDavinciresolve,
  SiFacebook,
  SiMailchimp,
  SiFigma,
  SiCanva,
  SiMilanote,
  SiWordpress,
  SiNextdotjs,
  SiReact,
} from "react-icons/si";

const logos = [
  { Icon: SiAdobe, label: "Adobe Suite" },
  { Icon: SiDavinciresolve, label: "DaVinci Resolve" },
  { Icon: SiFacebook, label: "Meta Ads Manager" },
  { Icon: SiMailchimp, label: "Mailchimp" },
  { Icon: SiFigma, label: "Figma" },
  { Icon: null, label: "Midjourney" },
  { Icon: SiCanva, label: "Canva Pro" },
  { Icon: SiMilanote, label: "Milanote" },
  { Icon: SiWordpress, label: "WordPress" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiReact, label: "React.js" },
];

export default function TechMarquee({ speed = 30 }: { speed?: number }) {
  const repeated = [...logos, ...logos];

  return (
    <section style={styles.wrapper} aria-label="Our technology stack">
      <div
        className="tech-marquee-container"
        style={{ ...styles.marquee, "--speed": `${speed}s` } as any}
        aria-hidden={false}
        tabIndex={0}
      >
        <div className="tech-marquee-track" style={styles.track}>
          {repeated.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <div
                key={`${item.label}-${idx}`}
                className="tech-marquee-item"
                style={styles.item}
                title={item.label}
                role="img"
                aria-label={item.label}
                tabIndex={0}
              >
                {Icon ? (
                  <Icon className="tech-marquee-icon" style={styles.icon} />
                ) : (
                  <span style={styles.fallback}>{item.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        :root {
          --marquee-height: 74px;
        }
        .tech-marquee-container:hover .tech-marquee-track,
        .tech-marquee-container:focus-within .tech-marquee-track {
          animation-play-state: paused !important;
        }
        .tech-marquee-track {
          animation: tech-marquee-scroll var(--speed, 30s) linear infinite;
        }
        .tech-marquee-item:focus,
        .tech-marquee-item:hover {
          transform: translateY(-4px) scale(1.02) !important;
          box-shadow: 0 8px 20px rgba(7, 14, 31, 0.45) !important;
        }
        @keyframes tech-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 900px) {
          :root { --marquee-height: 60px; }
          .tech-marquee-container { padding: 8px 12px !important; border-radius: 10px !important; }
          .tech-marquee-item { min-width: 110px !important; height: 48px !important; padding: 6px 12px !important; }
          .tech-marquee-icon { width: 34px !important; height: 34px !important; }
        }
        @media (max-width: 600px) {
          :root { --marquee-height: 52px; }
          .tech-marquee-container { padding: 6px 10px !important; border-radius: 8px !important; }
          .tech-marquee-track { gap: 16px !important; }
          .tech-marquee-item { min-width: 90px !important; height: 44px !important; padding: 4px 10px !important; }
          .tech-marquee-icon { width: 30px !important; height: 30px !important; }
        }
        @media (max-width: 480px) {
          :root { --marquee-height: 48px; }
          .tech-marquee-item { min-width: 80px !important; height: 40px !important; padding: 4px 8px !important; }
          .tech-marquee-icon { width: 26px !important; height: 26px !important; }
        }
      `}</style>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: { width: '100%', display: 'flex', justifyContent: 'center', padding: '24px 0' },
  marquee: { width: '100%', maxWidth: '1200px', background: 'rgba(10, 12, 15, 0.6)', borderRadius: '14px', padding: '10px 14px', backdropFilter: 'blur(6px)', boxShadow: '0 6px 20px rgba(2,6,23,0.35)', overflow: 'hidden' },
  track: { display: 'flex', gap: '22px', alignItems: 'center', height: 'var(--marquee-height)' },
  item: { display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '140px', height: '56px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '8px 14px', color: '#fff', gap: '10px', transition: 'transform 220ms ease, box-shadow 220ms ease' },
  icon: { width: '42px', height: '42px', color: '#fff' },
  fallback: { color: '#fff', fontWeight: 600, fontSize: '14px' },
};
