import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import WeddingDetails from './components/WeddingDetails'
import RSVP from './components/RSVP'
import PasswordGate from './components/PasswordGate'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user was previously authenticated (stored in sessionStorage)
  useEffect(() => {
    const authenticated = sessionStorage.getItem('wedding_authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    sessionStorage.setItem('wedding_authenticated', 'true')
  }

  if (!isAuthenticated) {
    return <PasswordGate onAuthenticated={handleAuthenticated} />
  }

  return (
    <div className="App">
      <Header />
      <WeddingDetails />
      <RSVP />
    </div>
  )
}

export default App
