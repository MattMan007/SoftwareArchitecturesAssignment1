function ModeSelection({ onSelectMode }) {
  return (
    <section className="card">
      <h2>Choose Configuration Mode</h2>
      <div className="mode-buttons">
        <button 
          className="btn btn-primary" 
          onClick={() => onSelectMode('custom')}
        >
          🔧 Custom Build
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => onSelectMode('prebuilt')}
        >
          ⚡ Pre-configured
        </button>
      </div>
    </section>
  )
}

export default ModeSelection

