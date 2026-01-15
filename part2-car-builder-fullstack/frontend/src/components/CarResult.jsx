function CarResult({ car }) {
  if (!car) return null

  return (
    <section className="card">
      <h2>Your Car Configuration</h2>
      
      <div className="car-details">
        <div className="detail-section">
          <h3><span className="icon">🚗</span> Basic Information</h3>
          <div className="detail-row">
            <span className="detail-label">Model:</span>
            <span className="detail-value">{car.model}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Engine:</span>
            <span className="detail-value">{car.engine}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Transmission:</span>
            <span className="detail-value">{car.transmission}</span>
          </div>
        </div>

        <div className="detail-section">
          <h3><span className="icon">🎨</span> Exterior</h3>
          <div className="detail-row">
            <span className="detail-label">Color:</span>
            <span className="detail-value">{car.exteriorOptions.color}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Rims:</span>
            <span className="detail-value">{car.exteriorOptions.rims || 'Standard'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Sunroof:</span>
            <span className="detail-value">{car.exteriorOptions.sunroof ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {car.interiorFeatures && car.interiorFeatures.length > 0 && (
          <div className="detail-section">
            <h3><span className="icon">🪑</span> Interior Features</h3>
            <ul className="feature-list">
              {car.interiorFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {car.safetyFeatures && car.safetyFeatures.length > 0 && (
          <div className="detail-section">
            <h3><span className="icon">🛡️</span> Safety Features</h3>
            <ul className="feature-list">
              {car.safetyFeatures.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {car.validation && (
          <div className={`validation-status ${car.validation.isValid ? 'valid' : 'invalid'}`}>
            {car.validation.isValid ? '✅ READY TO ORDER' : '❌ INCOMPLETE CONFIGURATION'}
            {!car.validation.isValid && (
              <ul className="error-list">
                {car.validation.errors.map((e, i) => (
                  <li key={i}>- {e}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {car.price && (
          <div className="price-box">
            <div className="price-label">Estimated Total Price</div>
            <div className="price-value">${car.price.toLocaleString()}</div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CarResult

