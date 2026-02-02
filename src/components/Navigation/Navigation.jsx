import { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
      // Show navigation after scrolling past the header (around 750px)
      setShowNav(scrollPosition > 750);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getButtonStyle = (linkName) => ({
    ...styles.navLink,
    ...(hoveredLink === linkName ? styles.navLinkHover : {}),
  });

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''} ${showNav ? 'visible' : 'hidden'}`}>
      <div className="nav-container">
        <button
          onClick={() => scrollToSection('home')}
          style={getButtonStyle('home')}
          className="nav-button"
          onMouseEnter={() => setHoveredLink('home')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('wedding-details')}
          style={getButtonStyle('wedding-details')}
          className="nav-button"
          onMouseEnter={() => setHoveredLink('wedding-details')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Wedding Day
        </button>
        <button
          onClick={() => scrollToSection('weekend-details')}
          style={getButtonStyle('weekend-details')}
          className="nav-button"
          onMouseEnter={() => setHoveredLink('weekend-details')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Weekend Details
        </button>
        <button
          onClick={() => scrollToSection('rsvp')}
          style={getButtonStyle('rsvp')}
          className="nav-button"
          onMouseEnter={() => setHoveredLink('rsvp')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          RSVP
        </button>
        <button
          onClick={() => scrollToSection('photos')}
          style={getButtonStyle('photos')}
          className="nav-button"
          onMouseEnter={() => setHoveredLink('photos')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Photos
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navLink: {
    background: 'none',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#667eea',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    transition: 'all 0.3s ease',
    borderRadius: '4px',
  },
  navLinkHover: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    transform: 'translateY(-2px)',
  },
};

export default Navigation;
