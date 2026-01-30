import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { weddingStore } from '../../stores/WeddingStore';

const Header = observer(() => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const weddingDate = new Date('2026-08-15T13:00:00');
    const now = new Date();
    const difference = weddingDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return (
    <header style={styles.header}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>Andrew & Gretchen</h1>
        <p style={styles.date}>August 15th, 2026</p>
        <div style={styles.countdown}>
          <div style={styles.countdownItem}>
            <span style={styles.countdownNumber}>{timeLeft.days}</span>
            <span style={styles.countdownLabel}>Days Until the Wedding</span>
          </div>
        </div>
      </div>
    </header>
  );
});

const styles = {
  header: {
    position: 'relative',
    textAlign: 'center',
    padding: '6rem 1rem',
    backgroundImage: 'url(/images/IMG_6081.JPG)',
    backgroundSize: '100% auto',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    color: 'white',
    overflow: 'hidden',
    minHeight: '800px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  title: {
    fontSize: '4.5rem',
    margin: '0',
    fontWeight: '400',
    fontFamily: "'Montserrat', 'Helvetica', sans-serif",
    letterSpacing: '3px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: '2rem',
    margin: '1.5rem 0 0 0',
    fontWeight: '300',
    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    letterSpacing: '2px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
  },
  countdown: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '3rem',
    flexWrap: 'wrap',
  },
  countdownItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '80px',
  },
  countdownNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    fontFamily: "'Montserrat', 'Helvetica', sans-serif",
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
  },
  countdownLabel: {
    fontSize: '1rem',
    fontWeight: '300',
    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    letterSpacing: '1px',
    marginTop: '0.5rem',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
  },
};

export default Header;
