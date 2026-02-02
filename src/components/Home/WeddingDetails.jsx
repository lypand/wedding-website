import { observer } from 'mobx-react-lite';
import { weddingStore } from '../../stores/WeddingStore';
import WeddingDayTimeline from './WeddingDayTimeline';
import './WeddingDetails.css';

const WeddingDetails = observer(() => {
  const { date, time, address } = weddingStore.weddingInfo;

  return (
    <>
    <section id="wedding-details" style={styles.section} className="wedding-details-section">
      <h2 style={styles.heading} className="section-heading">Wedding Day</h2>
      <div style={styles.detailsContainer} className="details-container">
        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Date & Time</h3>
          <p className="card-text-primary">{date}</p>
          <p className="card-text-primary">{time}</p>
        </div>
        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Location</h3>
          <p className="card-text-primary">903 Lake Forest Drive</p>
          <p className="card-text-primary">Ronald, WA 98940</p>
        </div>
        <div style={styles.detailCard} className="detail-card">
          <h3 style={styles.cardTitle} className="card-title">Attire</h3>
          <p className="card-text-primary">Summer Semi-Formal</p>
        </div>
      </div>
    </section>
        <WeddingDayTimeline />
        </>
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
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  detailsContainer: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  detailCard: {
    background: '#e3f2fd',
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
