const prebuiltTypes = [
  { id: 'economy', name: 'Economy Car', description: 'Affordable and efficient', icon: '🚙' },
  { id: 'luxury', name: 'Luxury Car', description: 'Premium features and comfort', icon: '🏎️' },
  { id: 'family', name: 'Family SUV', description: 'Spacious and safe', icon: '🚐' },
  { id: 'sports', name: 'Sports Car', description: 'Performance and style', icon: '🏁' }
]

function PrebuiltCars({ onBuild }) {
  return (
    <section className="card">
      <h2>Pre-configured Cars</h2>
      <div className="prebuilt-grid">
        {prebuiltTypes.map((type) => (
          <div 
            key={type.id}
            className="prebuilt-card"
            onClick={() => onBuild(type.id)}
          >
            <div className="prebuilt-icon">{type.icon}</div>
            <h3>{type.name}</h3>
            <p>{type.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PrebuiltCars

