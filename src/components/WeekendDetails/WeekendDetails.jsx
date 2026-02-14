import './WeekendDetails.css';

const WeekendDetails = () => {
  const activities = [
    {
      title: 'Euchre Tournament',
      description: 'Show off your card skills',
      icon: '🏆'
    },
    {
      title: 'Hot Tub',
      description: 'Relax and unwind',
      icon: '♨️'
    },
    {
      title: 'Fire Pit',
      description: 'Cozy evening gatherings',
      icon: '🔥'
    },
    {
      title: 'Casual Hiking',
      description: 'Explore the beautiful trails',
      icon: '🥾'
    },
    {
      title: 'Wine/Beer Tasting',
      description: 'Sample local favorites',
      icon: '🍷'
    },
    {
      title: 'Games & Fun',
      description: 'Board games and more',
      icon: '🎲'
    }
  ];

  return (
    <section id="weekend-details" style={styles.section} className="weekend-details-section">
      <h2 style={styles.heading} className="section-heading">Weekend Details</h2>

      <div style={styles.detailsContainer} className="weekend-details-container">
        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Weekend Dates</h3>
          <p className="card-text-primary">Celebrate with us all weekend long!</p>
          <p className="card-text-primary">Friday, August 14 -</p>
          <p className="card-text-primary">Monday, August 17</p>
          <div style={styles.timesSection} className="times-section">
            <p style={styles.timeText}>Check-in: 3:00 PM</p>
            <p style={styles.timeText}>Check-out: 11:00 AM</p>
          </div>
        </div>

        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Lodging</h3>
          <p className="card-text-primary">Stay with us at the venue</p>
          <p className="card-text-primary">There is room for everyone!</p>
        </div>

        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Meals</h3>
          <p className="card-text-primary">Details coming soon</p>
        </div>
      </div>

      <div className="activities-section">
        <div className="activities-container">
          <div className="activities-wrapper">
            {activities.map((activity, index) => (
              <div key={index} className="activity-card">
                <div className="activity-icon">{activity.icon}</div>
                <h4 className="activity-title">{activity.title}</h4>
                <p className="activity-description">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '0rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '3rem',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  detailsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    justifyContent: 'center',
  },
  detailCard: {
    background: '#e3f2fd',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#667eea',
  },
  cardText: {
    fontSize: '1.1rem',
    margin: '0.5rem 0',
    color: '#666',
    lineHeight: '1.6',
  },
  timesSection: {
    marginTop: '1.5rem',
  },
  timeText: {
    fontSize: '1.1rem',
    margin: '0.5rem 0',
    color: '#666',
    lineHeight: '1.6',
  },
};

export default WeekendDetails;
