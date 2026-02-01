import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { rsvpStore } from '../../stores/RsvpStore';
import { styles } from './RSVP.styles';
import './RSVP.css';

const RSVP = observer(() => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email) {
      const result = await rsvpStore.submitRsvp({
        name,
        email,
        attending,
      });

      if (result.success) {
        setName('');
        setEmail('');
        setAttending(true);
        alert('Thank you for your RSVP!');
      }
    }
  };

  return (
    <section style={styles.section} className="rsvp-section">
      <h2 style={styles.heading} className="section-heading">RSVP</h2>
      <form onSubmit={handleSubmit} style={styles.form} className="rsvp-form">
        <div style={styles.formGroup}>
          <label style={styles.label} className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            className="form-input"
            placeholder="Guest Name(s)"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            className="form-input"
            placeholder="your@email.com"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} className="form-label checkbox-label">
            <input
              type="checkbox"
              checked={attending}
              onChange={(e) => setAttending(e.target.checked)}
              style={styles.checkbox}
            />
            I can't wait to celebrate! I'll be there!
          </label>
        </div>
        {rsvpStore.error && <p style={styles.error}>{rsvpStore.error}</p>}
        <button type="submit" style={styles.button} className="submit-button" disabled={rsvpStore.submitting}>
          {rsvpStore.submitting ? 'Submitting...' : 'Submit RSVP'}
        </button>
      </form>
    </section>
  );
});

export default RSVP;
