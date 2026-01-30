import { useState } from 'react'
import '../PasswordGate/PasswordGate.css'

function AdminPasswordGate({ onAuthenticated }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === 'admin') {
      setError(false)
      onAuthenticated()
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="password-gate">
      <div className="password-container">
        <h1>Admin Access</h1>
        <p>Please enter the admin password to view RSVPs</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className={error ? 'error' : ''}
            autoFocus
          />

          {error && <p className="error-message">Incorrect password. Please try again.</p>}

          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  )
}

export default AdminPasswordGate
