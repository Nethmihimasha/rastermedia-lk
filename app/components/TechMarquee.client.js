"use client";

import React from "react";
import styles from "./TechMarquee.module.css";

// Icons from react-icons (Simple Icons)
// NOTE: ensure `react-icons` is installed: `npm i react-icons --save`
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

export default function TechMarquee({ speed = 30 }) {
  // Duplicate sequence to make seamless loop
  const repeated = [...logos, ...logos];

  return (
    <section className={styles.wrapper} aria-label="Our technology stack">
      <div
        className={styles.marquee}
        style={{ ["--speed"]: `${speed}s` }}
        aria-hidden={false}
        tabIndex={0}
      >
        <div className={styles.track}>
          {repeated.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <div
                key={`${item.label}-${idx}`}
                className={styles.item}
                title={item.label}
                role="img"
                aria-label={item.label}
                tabIndex={0}
              >
                {Icon ? (
                  <Icon className={styles.icon} />
                ) : (
                  <span className={styles.fallback}>{item.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
