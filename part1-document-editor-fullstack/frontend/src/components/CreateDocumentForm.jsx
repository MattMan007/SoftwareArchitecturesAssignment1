import { useState } from 'react'

function CreateDocumentForm({ onSubmit }) {
  const [type, setType] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await onSubmit(type, content)
    if (success) {
      setType('')
      setContent('')
    }
  }

  return (
    <section className="card">
      <h2>Create New Document</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="docType">Document Type:</label>
          <select
            id="docType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select type...</option>
            <option value="PDF">PDF Document</option>
            <option value="WORD">Word Document</option>
            <option value="HTML">HTML Document</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="docContent">Content:</label>
          <textarea
            id="docContent"
            rows="5"
            placeholder="Enter document content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Document
        </button>
      </form>
    </section>
  )
}

export default CreateDocumentForm

