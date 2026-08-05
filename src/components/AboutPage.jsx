import React from 'react';
import LogoLoop from './LogoLoop';
import { SiApple, SiSamsung, SiSony, SiPanasonic, SiLg } from 'react-icons/si';

const brandLogos = [
  { node: <SiApple />, title: "Apple" },
  { node: <SiSamsung />, title: "Samsung" },
  { node: <SiSony />, title: "Sony" },
  { node: <SiPanasonic />, title: "Panasonic" },
  { node: <SiLg />, title: "LG" },
];

export default function AboutPage() {
  return (
    <main className="layout" style={{ minHeight: '80vh', display: 'block' }}>
      <div style={{ padding: 'var(--space-6) 0' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>
          About BuyerHub
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', maxWidth: '800px', marginBottom: 'var(--space-5)' }}>
          Welcome to BuyerHub, your premium marketplace for the world's best brands. 
          We adhere to strict standards of design, quality, and functionality. Our selection 
          is curated carefully to ensure that every product meets our rigorous criteria.
        </p>

        <h2 className="section-header" style={{ marginTop: 'var(--space-7)' }}>
          Our Brand Partners
        </h2>
        
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden', border: '1px solid var(--color-black)', display: 'flex', alignItems: 'center' }}>
          <LogoLoop
            logos={brandLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Brand Partners"
          />
        </div>
      </div>
    </main>
  );
}
