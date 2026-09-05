import React from 'react';

function ThemeFX({ fxColor, fxStage, fxOrigin }) {
  const radius = fxStage === "cover" ? 150 : 0;

  return (
    <>
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="lg" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <style>{`
        .glass-surface {
          backdrop-filter: url(#lg) blur(3px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.35);
        }
      `}</style>

      <div
        className="fixed inset-0 z-[200] pointer-events-none transition-[clip-path] duration-[550ms] ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none"
        style={{
          backgroundColor: fxColor,
          clipPath: `circle(${radius}% at ${fxOrigin.x}px ${fxOrigin.y}px)`,
          willChange: "clip-path"
        }}
      ></div>
    </>
  );
}

export default React.memo(ThemeFX);