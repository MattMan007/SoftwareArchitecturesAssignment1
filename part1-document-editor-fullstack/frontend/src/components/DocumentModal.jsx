function DocumentModal({ document, onClose }) {
  if (!document) return null

  const features = document.features || {}

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        
        <h2>{features.icon || '📄'} {document.type} Document</h2>
        
        <div className="detail-row">
          <div className="detail-label">Document ID:</div>
          <div className="detail-value">{document.id}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Format:</div>
          <div className="detail-value">{features.format || document.type}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Content:</div>
          <div className="detail-value" style={{ whiteSpace: 'pre-wrap' }}>
            {document.content}
          </div>
        </div>

        {features.features && features.features.length > 0 && (
          <div className="detail-row">
            <div className="detail-label">Features:</div>
            <ul className="feature-list">
              {features.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="detail-row">
          <div className="detail-label">Created:</div>
          <div className="detail-value">
            {new Date(document.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentModal

