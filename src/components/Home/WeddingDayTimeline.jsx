import { observer } from 'mobx-react-lite';
import './WeddingDayTimeline.css';

const WeddingDayTimeline = observer(() => {
  const timelineEvents = [
    {
      title: 'Ceremony',
      description: 'Join us as we exchange vows',
      icon: '💍'
    },
    {
      title: 'Photos',
      description: 'Capturing memories',
      icon: '📸'
    },
    {
      title: 'First Dance',
      description: 'Our first dance as a married couple',
      icon: '💃'
    },
    {
      title: 'Toasts',
      description: 'Heartfelt words from loved ones',
      icon: '🥂'
    },
    {
      title: 'Dinner',
      description: 'A delicious feast awaits',
      icon: '🍽️'
    },
    {
      title: 'Euchre',
      description: 'Euchre Tournament begins',
      icon: '🏆'
    }
  ];

  return (
    <section style={styles.section} className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-wrapper">
          {timelineEvents.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-icon">{event.icon}</div>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-description">{event.description}</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const styles = {
  section: {
    padding: '1rem 2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
};

export default WeddingDayTimeline;
