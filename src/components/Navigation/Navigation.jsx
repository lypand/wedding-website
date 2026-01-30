import { useState } from 'react';

const Navigation = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

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
    <nav style={styles.nav}>
      <div style={styles.container}>
        <button
          onClick={() => scrollToSection('home')}
          style={getButtonStyle('home')}
          onMouseEnter={() => setHoveredLink('home')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('weekend-details')}
          style={getButtonStyle('weekend-details')}
          onMouseEnter={() => setHoveredLink('weekend-details')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Weekend Details
        </button>
        <button
          onClick={() => scrollToSection('photos')}
          style={getButtonStyle('photos')}
          onMouseEnter={() => setHoveredLink('photos')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          Photos
        </button>
        <button
          onClick={() => scrollToSection('rsvp')}
          style={getButtonStyle('rsvp')}
          onMouseEnter={() => setHoveredLink('rsvp')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          RSVP
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    padding: '1rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
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
