import { observer } from 'mobx-react-lite';
import { weddingStore } from '../stores/WeddingStore';

const WeddingDetails = observer(() => {
  const { date, time, venue, address } = weddingStore.weddingInfo;

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Wedding Details</h2>
      <div style={styles.detailsContainer}>
        <div style={styles.detailCard}>
          <h3 style={styles.cardTitle}>Date & Time</h3>
          <p style={styles.cardText}>{date}</p>
          <p style={styles.cardText}>{time}</p>
        </div>
        <div style={styles.detailCard}>
          <h3 style={styles.cardTitle}>Venue</h3>
          <p style={styles.cardText}>{venue}</p>
          <p style={styles.cardText}>{address}</p>
        </div>
      </div>
    </section>
  );
});

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
    color: '#333',
  },
  detailsContainer: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  detailCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    minWidth: '300px',
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
  },
};

export default WeddingDetails;
