import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { rsvpStore } from '../../stores/RsvpStore'
import AdminPasswordGate from './AdminPasswordGate'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

const Admin = observer(() => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Check if admin was previously authenticated (stored in sessionStorage)
  useEffect(() => {
    const authenticated = sessionStorage.getItem('admin_authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    sessionStorage.setItem('admin_authenticated', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
  }

  const handleBackToMain = () => {
    navigate('/')
  }

  if (!isAuthenticated) {
    return <AdminPasswordGate onAuthenticated={handleAuthenticated} />
  }

  return (
    <div style={styles.container} className="admin-container">
      <div style={styles.header} className="admin-header">
        <h1 style={styles.title} className="admin-title">Admin Dashboard</h1>
        <div style={styles.headerButtons} className="admin-header-buttons">
          <button onClick={handleBackToMain} style={styles.backButton} className="admin-button">
            Back to Main
          </button>
          <button onClick={handleLogout} style={styles.logoutButton} className="admin-button logout-button">
            Logout
          </button>
        </div>
      </div>

      <div style={styles.stats} className="admin-stats">
        <div style={styles.statCard} className="stat-card">
          <h3 style={styles.statNumber} className="stat-number">{rsvpStore.totalRsvps}</h3>
          <p style={styles.statLabel} className="stat-label">Total RSVPs</p>
        </div>
        <div style={{ ...styles.statCard, ...styles.statCardAttending }} className="stat-card">
          <h3 style={styles.statNumber} className="stat-number">{rsvpStore.attendingCount}</h3>
          <p style={styles.statLabel} className="stat-label">Attending</p>
        </div>
        <div style={{ ...styles.statCard, ...styles.statCardNotAttending }} className="stat-card">
          <h3 style={styles.statNumber} className="stat-number">{rsvpStore.notAttendingCount}</h3>
          <p style={styles.statLabel} className="stat-label">Not Attending</p>
        </div>
      </div>

      {rsvpStore.loading ? (
        <p style={styles.loading}>Loading RSVPs...</p>
      ) : rsvpStore.error ? (
        <p style={styles.error}>Error: {rsvpStore.error}</p>
      ) : (
        <div style={styles.tableContainer} className="admin-table-container">
          <h2 style={styles.sectionTitle} className="section-title">All RSVPs</h2>
          {rsvpStore.rsvps.length === 0 ? (
            <p style={styles.emptyMessage}>No RSVPs yet.</p>
          ) : (
            <table style={styles.table} className="admin-table">
              <thead>
                <tr>
                  <th style={styles.th} className="table-header">Name</th>
                  <th style={styles.th} className="table-header">Email</th>
                  <th style={styles.th} className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {rsvpStore.rsvps.map((rsvp, index) => (
                  <tr key={index} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.td} className="table-cell">{rsvp.name}</td>
                    <td style={styles.td} className="table-cell">{rsvp.email}</td>
                    <td style={styles.td} className="table-cell">
                      <span
                        style={
                          rsvp.attending
                            ? styles.statusAttending
                            : styles.statusNotAttending
                        }
                      >
                        {rsvp.attending ? 'Attending' : 'Not Attending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
})

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f5f5',
    padding: '2rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    margin: 0,
  },
  headerButtons: {
    display: 'flex',
    gap: '1rem',
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  logoutButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  statCardAttending: {
    borderTop: '4px solid #10b981',
  },
  statCardNotAttending: {
    borderTop: '4px solid #ef4444',
  },
  statNumber: {
    fontSize: '3rem',
    margin: '0 0 0.5rem 0',
    color: '#333',
  },
  statLabel: {
    fontSize: '1rem',
    margin: 0,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableContainer: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '1rem',
    borderBottom: '2px solid #e5e7eb',
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    letterSpacing: '0.5px',
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #f3f4f6',
    color: '#333',
  },
  trEven: {
    background: '#fafafa',
  },
  trOdd: {
    background: 'white',
  },
  statusAttending: {
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    background: '#d1fae5',
    color: '#065f46',
  },
  statusNotAttending: {
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    background: '#fee2e2',
    color: '#991b1b',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '2rem',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#ef4444',
    padding: '2rem',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#666',
    padding: '2rem',
  },
}

export default Admin
