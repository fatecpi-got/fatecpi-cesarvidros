'use client'

import React, { useState } from "react";
import "./header.css";

type Path = {
  name: string;
  path: string;
};

interface HeaderProps {
  paths: Path[];
}

export default function Header({ paths }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <span className="title-logo">César Vidros</span>
      </div>
      <nav className="navbar">
        <div className="hamburger-icon" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
          {paths.map((item: Path) => (
            <li key={item.name} className="nav-item">
              <a
                href={item.path}
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
