import { useState } from 'react'
import axios from 'axios'

const BASE_URL = "https://cab-assignment-production.up.railway.app"

function AddDriver() {
  const [name, setName] = useState('')
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: '1.5px solid #e0e0e0', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border 0.2s', background: '#fafafa'
  }

  const handleSubmit = async () => {
    if (!name || x === '' || y === '') {
      setMessage('Please fill all fields!')
      setIsSuccess(false)
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`${BASE_URL}/drivers`, {
        name, x: parseInt(x), y: parseInt(y)
      })
      setMessage(`Driver "${res.data.name}" added at (${res.data.x}, ${res.data.y})`)
      setIsSuccess(true)
      setName(''); setX(''); setY('')
    } catch {
      setMessage('Error adding driver. Is the server running?')
      setIsSuccess(false)
    }
    setLoading(false)
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 6px', fontSize: '20px', color: '#1a1a2e' }}>Add a Driver</h2>
      <p style={{ margin: '0 0 24px', color: '#888', fontSize: '13px' }}>
        Register a driver with their grid location
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>
            DRIVER NAME
          </label>
          <input style={inputStyle} placeholder="e.g. John Smith"
            value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>
              X COORDINATE
            </label>
            <input style={inputStyle} placeholder="e.g. 3" type="number"
              value={x} onChange={e => setX(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>
              Y COORDINATE
            </label>
            <input style={inputStyle} placeholder="e.g. 7" type="number"
              value={y} onChange={e => setY(e.target.value)} />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{
          padding: '14px', borderRadius: '12px', border: 'none',
          background: loading ? '#ccc' : 'linear-gradient(135deg, #302b63, #24243e)',
          color: 'white', fontWeight: '700', fontSize: '15px',
          cursor: loading ? 'not-allowed' : 'pointer', marginTop: '4px'
        }}>
          {loading ? 'Adding...' : '+ Add Driver'}
        </button>
      </div>

      {message && (
        <div style={{
          marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
          background: isSuccess ? '#e8f5e9' : '#fdecea',
          color: isSuccess ? '#2e7d32' : '#c62828',
          fontSize: '13px', fontWeight: '500'
        }}>
          {isSuccess ? '✅ ' : '❌ '}{message}
        </div>
      )}
    </div>
  )
}

export default AddDriver