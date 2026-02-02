import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Home/Header'
import Navigation from './components/Navigation/Navigation'
import WeddingDetails from './components/Home/WeddingDetails'
import WeekendDetails from './components/WeekendDetails/WeekendDetails'
import PhotoGallery from './components/Photos/PhotoGallery'
import RSVP from './components/RSVP/RSVP'
import PasswordGate from './components/PasswordGate/PasswordGate'
import Admin from './components/Admin/Admin'

function MainPage() {
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
      <div id="home">
        <Header />
      </div>
      <Navigation />
      <WeddingDetails />
      <WeekendDetails />
      <RSVP />
      <PhotoGallery />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
