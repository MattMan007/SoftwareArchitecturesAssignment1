import DocumentItem from './DocumentItem'

function DocumentsList({ documents, onRefresh, onSave, onView }) {
  const sortedDocs = [...documents].sort((a, b) => b.id - a.id)

  return (
    <section className="card">
      <h2>My Documents</h2>
      <button onClick={onRefresh} className="btn btn-secondary">
        🔄 Refresh
      </button>
      
      <div className="documents-list">
        {sortedDocs.length === 0 ? (
          <p className="empty-state">
            No documents yet. Create your first document above!
          </p>
        ) : (
          sortedDocs.map((doc) => (
            <DocumentItem
              key={doc.id}
              document={doc}
              onSave={onSave}
              onView={onView}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default DocumentsList

