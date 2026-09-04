import React from 'react';
import './Loader.css';

export default function Loader({ theme, text = "Loading Nexus Market..." }) {
  return (
    <div 
      className={`min-h-screen ${theme?.pageBg || 'bg-slate-950'} ${theme?.textPrimary || 'text-white'} flex flex-col items-center justify-center gap-6`} 
      style={{ minHeight: '100dvh' }}
    >
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
      {text && <p className="font-semibold text-lg tracking-wide animate-pulse">{text}</p>}
    </div>
  );
}