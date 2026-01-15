import { useState, useEffect } from 'react'
import Header from './components/Header'
import ModeSelection from './components/ModeSelection'
import PrebuiltCars from './components/PrebuiltCars'
import CustomBuilder from './components/CustomBuilder'
import CarResult from './components/CarResult'
import Message from './components/Message'
import './App.css'

const API_URL = '/api'

function App() {
  const [mode, setMode] = useState(null) // 'custom' or 'prebuilt'
  const [options, setOptions] = useState(null)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [builtCar, setBuiltCar] = useState(null)

  useEffect(() => {
    loadOptions()
  }, [])

  const loadOptions = async () => {
    try {
      const response = await fetch(`${API_URL}/options`)
      const data = await response.json()
      if (data.success) {
        setOptions(data.options)
      }
    } catch (error) {
      console.error('Error loading options:', error)
    }
  }

  const handleBuildPrebuilt = async (type) => {
    try {
      const response = await fetch(`${API_URL}/cars/prebuilt/${type}`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        showMessage(data.message, 'success')
        setBuiltCar(data.car)
      } else {
        showMessage(data.error || 'Failed to build car', 'error')
      }
    } catch (error) {
      showMessage('Error connecting to server', 'error')
    }
  }

  const handleBuildCustom = async (config) => {
    try {
      // Create new car configuration
      const newCarResponse = await fetch(`${API_URL}/cars/new`, {
        method: 'POST'
      })
      const newCarData = await newCarResponse.json()
      const carId = newCarData.carId

      // Configure car step by step
      const configurations = [
        { action: 'setModel', value: config.model },
        { action: 'setEngine', value: config.engine },
        { action: 'setTransmission', value: config.transmission },
        { action: 'setColor', value: config.color },
        { action: 'setRims', value: config.rims },
        { action: 'setSunroof', value: config.sunroof }
      ]

      if (config.interiorFeatures.length > 0) {
        configurations.push({ 
          action: 'addInteriorFeatures', 
          values: config.interiorFeatures 
        })
      }

      if (config.safetyFeatures.length > 0) {
        configurations.push({ 
          action: 'addSafetyFeatures', 
          values: config.safetyFeatures 
        })
      }

      // Apply all configurations
      for (const cfg of configurations) {
        await fetch(`${API_URL}/cars/${carId}/configure`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cfg)
        })
      }

      // Build final car
      const buildResponse = await fetch(`${API_URL}/cars/${carId}/build`, {
        method: 'POST'
      })

      const buildData = await buildResponse.json()

      if (buildResponse.ok) {
        showMessage(buildData.message, 'success')
        setBuiltCar(buildData.car)
      } else {
        showMessage(buildData.error || 'Failed to build car', 'error')
        if (buildData.validation) {
          const errorMsg = 'Missing: ' + buildData.validation.errors.join(', ')
          showMessage(errorMsg, 'error')
        }
      }
    } catch (error) {
      showMessage('Error connecting to server', 'error')
      console.error(error)
    }
  }

  const showMessage = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage({ text: '', type: '' })
    }, 5000)
  }

  return (
    <div className="app">
      <Header />
      
      <main className="container">
        {!mode && (
          <ModeSelection onSelectMode={setMode} />
        )}

        {mode === 'prebuilt' && (
          <PrebuiltCars onBuild={handleBuildPrebuilt} />
        )}

        {mode === 'custom' && options && (
          <CustomBuilder options={options} onBuild={handleBuildCustom} />
        )}

        {message.text && (
          <Message text={message.text} type={message.type} />
        )}

        {builtCar && (
          <CarResult car={builtCar} />
        )}

        {mode && (
          <div className="card">
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setMode(null)
                setBuiltCar(null)
              }}
            >
              ← Back to Mode Selection
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

