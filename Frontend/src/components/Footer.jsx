import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer">
      <div className="section-container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">DJS CODESTARS</h3>
            <p className="footer-sub">
              The official competitive coding & algorithms chapter of Dwarkadas J. Sanghvi College of Engineering.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Navigation</h4>
              <a href="#hero">Hero</a>
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#gallery">Gallery</a>
            </div>

            <div className="footer-col">
              <h4>Community</h4>
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://discord.com" target="_blank" rel="noreferrer">Discord</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 DJS CodeStars. All rights reserved.</p>
          <button className="back-to-top-btn" onClick={scrollToTop}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
