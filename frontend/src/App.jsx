import { useState } from 'react'
import AddDriver from './Components/AddDriver.jsx'
import RequestRide from './components/RequestRide.jsx'

function App() {
  const [activeTab, setActiveTab] = useState('drivers')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🚖</div>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: '700', margin: 0 }}>
            Cab Assignment System
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontSize: '14px' }}>
            Smart driver dispatch 
          </p>
        </div>

        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '24px'
        }}>
          {['drivers', 'rides'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
              background: activeTab === tab ? 'white' : 'transparent',
              color: activeTab === tab ? '#302b63' : 'rgba(255,255,255,0.6)',
            }}>
              {tab === 'drivers' ? '➕ Add Driver' : '🚕 Request Ride'}
            </button>
          ))}
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          {activeTab === 'drivers' ? <AddDriver /> : <RequestRide />}
        </div>

      </div>
    </div>
  )
}

export default App