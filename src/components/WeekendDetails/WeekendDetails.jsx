const WeekendDetails = () => {
  return (
    <section id="weekend-details" style={styles.section}>
      <h2 style={styles.heading}>Weekend Details</h2>
      <div style={styles.detailsContainer}>
        <div style={styles.detailCard}>
          <h3 style={styles.cardTitle}>Dates</h3>
          <p style={styles.cardText}>
            We would love to celebrate with you all weekend long! The fun will begin Friday August 14, 2026 at 3:00PM and will last until Monday August 17, 2026 at 11:00AM.
          </p>
        </div>


        <div style={styles.detailCard}>
          <h3 style={styles.cardTitle}>Lodging</h3>
          <p style={styles.cardText}>Come stay with us at 903 Lake Forest Drive, Ronald, WA 98940. </p>
          <p style={styles.cardText}>There is room for everyone! </p>
        </div>
        <div style={styles.detailCard}>
          <h3 style={styles.cardTitle}>Activities</h3>
          <p style={styles.cardText}>Cards + Euchre Tournament</p>
          <p style={styles.cardText}>Hot Tub</p>
          <p style={styles.cardText}>Fire Pit</p>
          <p style={styles.cardText}>Casual Hiking</p>
          <p style={styles.cardText}>Wine Tasting</p>
        </div>
        <div style={styles.detailCard}>
          <h3 style={styles.cardTitle}>Meals</h3>
          <p style={styles.cardText}>More information coming soon...</p>
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
