import { useState } from 'react'

function CustomBuilder({ options, onBuild }) {
  const [config, setConfig] = useState({
    model: '',
    engine: '',
    transmission: '',
    color: '',
    rims: 'Standard',
    sunroof: false,
    interiorFeatures: [],
    safetyFeatures: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onBuild(config)
  }

  const handleCheckbox = (name, value, checked) => {
    setConfig(prev => ({
      ...prev,
      [name]: checked 
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }))
  }

  return (
    <section className="card">
      <h2>Build Your Custom Car</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="model">Model Name: *</label>
          <input
            type="text"
            id="model"
            placeholder="e.g., Custom Sedan"
            value={config.model}
            onChange={(e) => setConfig({...config, model: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="engine">Engine Type: *</label>
          <select
            id="engine"
            value={config.engine}
            onChange={(e) => setConfig({...config, engine: e.target.value})}
            required
          >
            <option value="">Select engine...</option>
            {options.engines.map(engine => (
              <option key={engine} value={engine}>{engine}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="transmission">Transmission: *</label>
          <select
            id="transmission"
            value={config.transmission}
            onChange={(e) => setConfig({...config, transmission: e.target.value})}
            required
          >
            <option value="">Select transmission...</option>
            {options.transmissions.map(trans => (
              <option key={trans} value={trans}>
                {trans.charAt(0).toUpperCase() + trans.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="color">Color: *</label>
          <select
            id="color"
            value={config.color}
            onChange={(e) => setConfig({...config, color: e.target.value})}
            required
          >
            <option value="">Select color...</option>
            {options.colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="rims">Rims:</label>
          <select
            id="rims"
            value={config.rims}
            onChange={(e) => setConfig({...config, rims: e.target.value})}
          >
            {options.rims.map(rim => (
              <option key={rim} value={rim}>{rim}</option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={config.sunroof}
              onChange={(e) => setConfig({...config, sunroof: e.target.checked})}
            />
            Add Sunroof (+$2,500)
          </label>
        </div>

        <div className="form-group">
          <label>Interior Features:</label>
          <div className="checkbox-list">
            {options.interiorFeatures.map(feature => (
              <label key={feature}>
                <input
                  type="checkbox"
                  checked={config.interiorFeatures.includes(feature)}
                  onChange={(e) => handleCheckbox('interiorFeatures', feature, e.target.checked)}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Safety Features:</label>
          <div className="checkbox-list">
            {options.safetyFeatures.map(feature => (
              <label key={feature}>
                <input
                  type="checkbox"
                  checked={config.safetyFeatures.includes(feature)}
                  onChange={(e) => handleCheckbox('safetyFeatures', feature, e.target.checked)}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          🚗 Build My Car
        </button>
      </form>
    </section>
  )
}

export default CustomBuilder

