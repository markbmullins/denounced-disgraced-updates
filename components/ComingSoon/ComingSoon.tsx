import Image from "next/image";
import React from "react";

export const ComingSoon = ({ isMobile, font }) => {
  return (
    <main>
      <div className="flex-container">
        <div className="img-container">
          <div className="mobile">
            <Image src="/ddLogoSquare.png" alt="Denounced Disgraced" fill />
          </div>
          <div className="desktop">
            <Image src="/ddLogo.png" alt="Denounced Disgraced" fill />
          </div>
        </div>
        <div className={`${font.className} hero-text`}>Coming Soon...</div>
      </div>
    </main>
  );
};
