import { useState } from 'react'
import axios from 'axios'

function RequestRide() {
  const [userName, setUserName] = useState('')
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: '1.5px solid #e0e0e0', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box', background: '#fafafa'
  }

  const handleRequest = async () => {
    if (!userName || x === '' || y === '') {
      setError('Please fill all fields!')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/rides/request', {
        user_name: userName, user_x: parseInt(x), user_y: parseInt(y)
      })
      setResult(res.data)
      setError('')
      setUserName(''); setX(''); setY('')
    } catch {
      setError('No drivers available or server error!')
      setResult(null)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 6px', fontSize: '20px', color: '#1a1a2e' }}>Request a Ride</h2>
      <p style={{ margin: '0 0 24px', color: '#888', fontSize: '13px' }}>
        Enter your location to get the nearest driver
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>
            YOUR NAME
          </label>
          <input style={inputStyle} placeholder="e.g. Parul"
            value={userName} onChange={e => setUserName(e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>
              YOUR X
            </label>
            <input style={inputStyle} placeholder="e.g. 4" type="number"
              value={x} onChange={e => setX(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>
              YOUR Y
            </label>
            <input style={inputStyle} placeholder="e.g. 2" type="number"
              value={y} onChange={e => setY(e.target.value)} />
          </div>
        </div>

        <button onClick={handleRequest} disabled={loading} style={{
          padding: '14px', borderRadius: '12px', border: 'none',
          background: loading ? '#ccc' : 'linear-gradient(135deg, #f7971e, #ffd200)',
          color: loading ? 'white' : '#1a1a2e',
          fontWeight: '700', fontSize: '15px',
          cursor: loading ? 'not-allowed' : 'pointer', marginTop: '4px'
        }}>
          {loading ? 'Finding driver...' : '🚕 Request Ride'}
        </button>
      </div>

      {error && (
        <div style={{
          marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
          background: '#fdecea', color: '#c62828', fontSize: '13px', fontWeight: '500'
        }}>
          ❌ {error}
        </div>
      )}

      {result && (
        <div style={{
          marginTop: '20px', borderRadius: '14px', overflow: 'hidden',
          border: '1.5px solid #e8f5e9'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #302b63, #24243e)',
            padding: '16px 20px'
          }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '600' }}>
              RIDE ASSIGNED
            </p>
            <p style={{ margin: '4px 0 0', color: 'white', fontSize: '20px', fontWeight: '700' }}>
              🎉 {result.assigned_driver} is on the way!
            </p>
          </div>
          <div style={{ padding: '16px 20px', background: '#f9f9f9' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Passenger', value: result.user_name },
                { label: 'Driver', value: result.assigned_driver },
                { label: 'Driver Location', value: `(${result.driver_x}, ${result.driver_y})` },
                { label: 'Distance', value: `${result.distance} units` },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'white', borderRadius: '10px',
                  padding: '12px', border: '1px solid #eee'
                }}>
                  <p style={{ margin: 0, fontSize: '11px', color: '#999', fontWeight: '600' }}>{item.label.toUpperCase()}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: '700', color: '#1a1a2e' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RequestRide