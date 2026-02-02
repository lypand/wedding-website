// Quick test script to check backend connection
fetch('http://localhost:3001/api/health')
  .then(res => res.json())
  .then(data => console.log('✓ Backend is working:', data))
  .catch(err => console.error('✗ Backend connection failed:', err.message));
