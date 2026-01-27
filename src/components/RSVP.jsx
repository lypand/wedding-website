import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { weddingStore } from '../stores/WeddingStore';

const RSVP = observer(() => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      weddingStore.addRsvp({ name, email, attending });
      setName('');
      setEmail('');
      alert('Thank you for your RSVP!');
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>RSVP</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Your name"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="your@email.com"
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            <input
              type="checkbox"
              checked={attending}
              onChange={(e) => setAttending(e.target.checked)}
              style={styles.checkbox}
            />
            I will be attending
          </label>
        </div>
        <button type="submit" style={styles.button}>
          Submit RSVP
        </button>
      </form>
      <p style={styles.guestCount}>Total RSVPs: {weddingStore.totalGuests}</p>
    </section>
  );
});

const styles = {
  section: {
    padding: '4rem 2rem',
    maxWidth: '600px',
    margin: '0 auto',
    background: '#f8f9fa',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  checkbox: {
    marginRight: '0.5rem',
  },
  button: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  guestCount: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '1.1rem',
    color: '#666',
  },
};

export default RSVP;
