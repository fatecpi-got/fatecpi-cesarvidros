import React from "react";
import "../../styles/Banner/Banner.css"; // Import external CSS file

interface BannerProps {
  title: string;
  subtitle?: string; // Optional subtitle
}

export const BannerComponent: React.FC<BannerProps> = ({ title, subtitle }) => {
  return (
    <div className="banner-container" aria-label={title}>
      {/* Left Section: Title */}
      <div className="banner-left">
        <h1 className="banner-title">{title}</h1>
      </div>

      {/* Right Section: Subtitle */}
      {subtitle && (
        <div className="banner-right">
          <p className="banner-subtitle">{subtitle}</p>
        </div>
      )}
    </div>
  );
};