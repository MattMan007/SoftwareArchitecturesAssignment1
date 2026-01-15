function DocumentItem({ document, onSave, onView }) {
  const getDocIcon = (type) => {
    const icons = { PDF: '📄', WORD: '📝', HTML: '🌐' }
    return icons[type] || '📄'
  }

  const truncateText = (text, length) => {
    return text.length <= length ? text : text.substring(0, length) + '...'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="document-item">
      <div className="document-header">
        <div>
          <span className="document-type">
            {getDocIcon(document.type)} {document.type}
          </span>
          <span className="document-id">ID: {document.id}</span>
        </div>
      </div>
      
      <div className="document-content">
        {truncateText(document.content, 150)}
      </div>
      
      <div className="document-date">
        Created: {formatDate(document.createdAt)}
      </div>
      
      <div className="document-actions">
        <button
          className="btn-small"
          onClick={() => onSave(document.id)}
        >
          💾 Save
        </button>
        <button
          className="btn-small secondary"
          onClick={() => onView(document.id)}
        >
          👁️ View Details
        </button>
      </div>
    </div>
  )
}

export default DocumentItem

