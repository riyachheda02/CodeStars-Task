import React, { useState, useRef, useCallback, useEffect } from 'react';
import { photosByYear, heroPhotos } from '../constant/photos';
import codestarsLogo from '../assets/djs_codestarsLogo.jpeg';
import Footer from '../components/Footer';

export default function Home() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [activeCards, setActiveCards] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('ALL');
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState(null);

  const heroRef = useRef(null);
  const photoIndexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const zIndexCounter = useRef(10);
  const inactivityTimerRef = useRef(null);

  // Switch year for hover photos
  const handleYearChange = (year) => {
    setSelectedYear(year);
    photoIndexRef.current = 0;
    setActiveCards([]);
  };

  // Reset inactivity countdown (photos disappear after 7s of stopped hover)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setActiveCards((prev) => prev.map((c) => ({ ...c, fading: true })));
      setTimeout(() => {
        setActiveCards([]);
      }, 800);
    }, 7000);
  }, []);

  // Spawn photo card (max 3 visible, smaller size, no border radius, no labels)
  const spawnPhoto = useCallback((x, y) => {
    const currentPool = photosByYear[selectedYear] || [];
    if (!currentPool.length) return;

    const currentPhoto = currentPool[photoIndexRef.current % currentPool.length];
    photoIndexRef.current += 1;
    zIndexCounter.current += 1;

    // Organic rotation
    const rotation = (Math.random() * 14 - 7).toFixed(1);
    const id = `${Date.now()}-${Math.random()}`;

    const newCard = {
      id,
      url: currentPhoto.url,
      x,
      y,
      rotation,
      zIndex: zIndexCounter.current,
      fading: false,
    };

    setActiveCards((prev) => {
      const updated = [...prev, newCard];
      if (updated.length > 3) {
        return updated.slice(updated.length - 3);
      }
      return updated;
    });

    // Fade after 2s
    setTimeout(() => {
      setActiveCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, fading: true } : c))
      );
    }, 2000);

    // Remove after 2.8s
    setTimeout(() => {
      setActiveCards((prev) => prev.filter((c) => c.id !== id));
    }, 2800);

    resetInactivityTimer();
  }, [selectedYear, resetInactivityTimer]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPos({ x, y, visible: true });

    const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);
    if (dist > 65 || (lastPosRef.current.x === 0 && lastPosRef.current.y === 0)) {
      spawnPhoto(x, y);
      lastPosRef.current = { x, y };
    } else {
      resetInactivityTimer();
    }
  };

  const handleMouseEnter = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPos({ x, y, visible: true });
    lastPosRef.current = { x, y };
    spawnPhoto(x, y);
  };

  const handleMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, visible: false }));
    lastPosRef.current = { x: 0, y: 0 };
    resetInactivityTimer();
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  const stats = [
    { number: '15+', label: 'Contests & Hackathons' },
    { number: '500+', label: 'Community Coders' },
    { number: 'ICPC', label: 'Regional Finalists' },
    { number: '100%', label: 'Student Driven' },
  ];

  const experiences = [
    {
      year: '2026',
      title: 'Mock Contest Series & ICPC Prep',
      description: 'Intense simulated algorithmic rounds designed to mirror ICPC regional difficulty, featuring live leaderboards and post-contest editorials.',
      tag: 'Competitive Programming',
    },
    {
      year: '2025',
      title: 'DJSCE Regionals & Finals',
      description: 'Annual flagship coding battle bringing together the sharpest minds across colleges for grueling problem-solving rounds and cash prizes.',
      tag: 'Flagship Event',
    },
    {
      year: '2025',
      title: 'Felicitation & Awards Gala',
      description: 'Celebrating winners, runners-up, mentors, and the top coders who represented DJSCE on national coding leaderboards.',
      tag: 'Awards Ceremony',
    },
  ];

  const filteredGallery = heroPhotos.filter((p) => {
    if (activeGalleryFilter === 'ALL') return true;
    return p.year === activeGalleryFilter;
  });

  return (
    <div className="landing-page-root">
      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        ref={heroRef}
        className="hero-section"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Navigation: Left = CODESTARS, Center = Menu with Circular Logo, Right = Year Switcher */}
        <header className="hero-nav">
          {/* Top Left: CODESTARS */}
          <div className="nav-brand">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
              CODESTARS
            </a>
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

          {/* Top Right: Year Switcher */}
          <div className="nav-year-switcher-right">
            <span className="year-label">MEMORIES</span>
            <div className="year-toggle-group">
              <button
                type="button"
                className={`year-btn ${selectedYear === '2026' ? 'active' : ''}`}
                onClick={() => handleYearChange('2026')}
                title="Switch to 2026 photos"
              >
                2026
              </button>
              <span className="year-divider">/</span>
              <button
                type="button"
                className={`year-btn ${selectedYear === '2025' ? 'active' : ''}`}
                onClick={() => handleYearChange('2025')}
                title="Switch to 2025 photos"
              >
                2025
              </button>
            </div>
          </div>
        </header>

        {/* Floating Photo Cards Trail (Active ONLY in Hero, Max 3, Smaller, No Radius, No Labels) */}
        <div className="photo-trail-container" aria-hidden="true">
          {activeCards.map((card) => (
            <div
              key={card.id}
              className={`floating-photo-card no-radius ${card.fading ? 'is-fading' : ''}`}
              style={{
                left: `${card.x}px`,
                top: `${card.y}px`,
                transform: `translate(-50%, -50%) rotate(${card.rotation}deg)`,
                zIndex: card.zIndex,
              }}
            >
              <div className="card-media-wrapper no-radius">
                <img src={card.url} alt="" loading="eager" />
              </div>
            </div>
          ))}
        </div>

        {/* Custom Minimalist Cursor Follower */}
        {cursorPos.visible && (
          <div
            className="hero-cursor-dot"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
            }}
          />
        )}

        {/* Center Hero Typography (Center Aligned: DJS CodeStars) */}
        <div className="hero-center-content hero-center-aligned">
          <h1 className="hero-giant-heading text-center">
            <span className="hero-word hero-word-djs uppercase-djs">DJS</span>
            <span className="hero-word hero-word-codestars">CodeStars</span>
          </h1>
        </div>

        {/* Hero Bottom Bar (Centered Tagline) */}
        <div className="hero-bottom-bar-clean">
          <p className="hero-tagline">
           programming club fostering coding, learning, and innovation among students.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main>
        {/* ABOUT SECTION */}
        <section id="about" className="content-section about-section">
          <div className="section-container">
            <div className="section-header">
              <span className="section-eyebrow">ABOUT THE COMMITTEE</span>
              <h2 className="section-title">Where Passion Meets Algorithmic Excellence</h2>
            </div>

            <div className="about-grid">
              <div className="about-text-card">
                <p className="about-lead">
                  <strong>DJS CodeStars</strong> is the premier coding and competitive programming community
                  at Dwarkadas J. Sanghvi College of Engineering (DJSCE).
                </p>
                <p className="about-description">
                  We empower aspiring software engineers, competitive programmers, and algorithmic thinkers through
                  rigorous mock contests, regionals, hands-on masterclasses, and national hackathons.
                  From beginner-friendly workshops to preparing top teams for ICPC and prestigious coding showdowns,
                  we build the next generation of tech leaders.
                </p>
              </div>

              <div className="stats-grid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="stat-card">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE / EVENTS SECTION */}
        <section id="experience" className="content-section experience-section">
          <div className="section-container">
            <div className="section-header">
              <span className="section-eyebrow">TRACK RECORD</span>
              <h2 className="section-title">Contests & Milestones</h2>
            </div>

            <div className="experience-list">
              {experiences.map((item, idx) => (
                <div key={idx} className="experience-item">
                  <div className="experience-meta">
                    <span className="exp-year">{item.year}</span>
                    <span className="exp-tag">{item.tag}</span>
                  </div>
                  <div className="experience-content">
                    <h3 className="exp-title">{item.title}</h3>
                    <p className="exp-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="content-section gallery-section">
          <div className="section-container">
            <div className="section-header gallery-header">
              <div>
                <span className="section-eyebrow">ARCHIVES</span>
                <h2 className="section-title">Moments & Highlights</h2>
              </div>
              <div className="filter-tabs">
                {['ALL', '2026', '2025'].map((filter) => (
                  <button
                    key={filter}
                    className={`filter-btn ${activeGalleryFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveGalleryFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="gallery-grid">
              {filteredGallery.map((photo) => (
                <div
                  key={photo.id}
                  className="gallery-card"
                  onClick={() => setSelectedGalleryPhoto(photo)}
                >
                  <div className="gallery-img-wrapper">
                    <img src={photo.url} alt={photo.title} loading="lazy" />
                    <div className="gallery-overlay">
                      <span className="gallery-tag">{photo.year}</span>
                      <h4 className="gallery-photo-title">{photo.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lightbox Modal */}
          {selectedGalleryPhoto && (
            <div className="lightbox-backdrop" onClick={() => setSelectedGalleryPhoto(null)}>
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-close" onClick={() => setSelectedGalleryPhoto(null)}>✕</button>
                <img src={selectedGalleryPhoto.url} alt={selectedGalleryPhoto.title} />
                <div className="lightbox-info">
                  <h3>{selectedGalleryPhoto.title}</h3>
                  <span className="lightbox-year">Batch of {selectedGalleryPhoto.year}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ================= FOOTER (Kept where it is) ================= */}
      <Footer />
    </div>
  );
}
