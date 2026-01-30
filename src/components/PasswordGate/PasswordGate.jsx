import { useState } from 'react'
import './PasswordGate.css'

function PasswordGate({ onAuthenticated }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password === 'password') {
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
        <h1>Welcome</h1>
        <p>Please enter the password to view the wedding details</p>

        <form onSubmit={handleSubmit}>
          <input
            type="euchre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
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

export default PasswordGate
