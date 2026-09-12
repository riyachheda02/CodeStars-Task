import React from 'react';
import codestarsLogo from '../assets/djs_codestarsLogo.jpeg';

export default function Navbar({ selectedYear, onYearChange }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="hero-nav">
      {/* Top Left: Year Switcher */}
      <div className="nav-year-switcher">
        <span className="year-label">ARCHIVE</span>
        <div className="year-toggle-group">
          <button
            type="button"
            className={`year-btn ${selectedYear === '2026' ? 'active' : ''}`}
            onClick={() => onYearChange('2026')}
            title="Switch to 2026 photos"
          >
            2026
          </button>
          <span className="year-divider">/</span>
          <button
            type="button"
            className={`year-btn ${selectedYear === '2025' ? 'active' : ''}`}
            onClick={() => onYearChange('2025')}
            title="Switch to 2025 photos"
          >
            2025
          </button>
        </div>
      </div>

      {/* Center Nav: Events, Code UnCode, [Circular CodeStars Logo], Resources, Team */}
      <nav className="nav-center-menu">
        <a
          href="#events"
          className="nav-item"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('experience');
          }}
        >
          Events
        </a>

        <a
          href="#code-uncode"
          className="nav-item"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('about');
          }}
        >
          Code UnCode
        </a>

        {/* Circular Logo of CodeStars */}
        <a
          href="#hero"
          className="nav-logo-circle"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          title="DJS CodeStars"
        >
          <img
            src={codestarsLogo}
            alt="DJS CodeStars Logo"
            className="nav-logo-img"
          />
        </a>

        <a
          href="#resources"
          className="nav-item"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('gallery');
          }}
        >
          Resources
        </a>

        <a
          href="#team"
          className="nav-item"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('about');
          }}
        >
          Team
        </a>
      </nav>

      {/* Top Right Spacer to balance the layout */}
      <div className="nav-right-spacer" />
    </header>
  );
}
