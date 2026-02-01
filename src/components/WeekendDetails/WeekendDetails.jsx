import './WeekendDetails.css';

const WeekendDetails = () => {
  return (
    <section id="weekend-details" style={styles.section} className="weekend-details-section">
      <h2 style={styles.heading} className="section-heading">Weekend Details</h2>
      <div style={styles.detailsContainer} className="weekend-details-container">
        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Dates</h3>
          <p style={styles.cardText} className="card-text">
            We would love to celebrate with you all weekend long! The fun will begin Friday August 14, 2026 at 3:00PM and will last until Monday August 17, 2026 at 11:00AM.
          </p>
        </div>


        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Lodging</h3>
          <p style={styles.cardText} className="card-text">Come stay with us at 903 Lake Forest Drive, Ronald, WA 98940. </p>
          <p style={styles.cardText} className="card-text">There is room for everyone! </p>
        </div>
        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Activities</h3>
          <p style={styles.cardText} className="card-text">Cards + Euchre Tournament</p>
          <p style={styles.cardText} className="card-text">Hot Tub</p>
          <p style={styles.cardText} className="card-text">Fire Pit</p>
          <p style={styles.cardText} className="card-text">Casual Hiking</p>
          <p style={styles.cardText} className="card-text">Wine Tasting</p>
        </div>
        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Meals</h3>
          <p style={styles.cardText} className="card-text">More information coming soon...</p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '4rem 2rem',
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
};

export default WeekendDetails;
