import { useState, useEffect } from 'react'
import Header from './components/Header'
import CreateDocumentForm from './components/CreateDocumentForm'
import DocumentsList from './components/DocumentsList'
import DocumentModal from './components/DocumentModal'
import Message from './components/Message'
import './App.css'

const API_URL = '/api'

function App() {
  const [documents, setDocuments] = useState([])
  const [message, setMessage] = useState({ text: '', type: '' })
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await fetch(`${API_URL}/documents`)
      const data = await response.json()
      if (data.success) {
        setDocuments(data.documents)
      }
    } catch (error) {
      console.error('Error loading documents:', error)
    }
  }

  const handleCreateDocument = async (type, content) => {
    try {
      const response = await fetch(`${API_URL}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content }),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage(`Document created successfully! ID: ${data.document.id}`, 'success')
        loadDocuments()
        return true
      } else {
        showMessage(data.error || 'Failed to create document', 'error')
        return false
      }
    } catch (error) {
      showMessage('Error connecting to server', 'error')
      return false
    }
  }

  const handleSaveDocument = async (id) => {
    try {
      const response = await fetch(`${API_URL}/documents/${id}/save`, {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        showMessage(data.message, 'success')
      } else {
        showMessage(data.error || 'Failed to save document', 'error')
      }
    } catch (error) {
      showMessage('Error connecting to server', 'error')
    }
  }

  const handleViewDocument = async (id) => {
    try {
      const response = await fetch(`${API_URL}/documents/${id}/display`)
      const data = await response.json()

      if (response.ok) {
        setSelectedDocument(data.display)
        setShowModal(true)
      } else {
        showMessage(data.error || 'Failed to load document details', 'error')
      }
    } catch (error) {
      showMessage('Error connecting to server', 'error')
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
        <CreateDocumentForm onSubmit={handleCreateDocument} />
        
        {message.text && (
          <Message text={message.text} type={message.type} />
        )}
        
        <DocumentsList
          documents={documents}
          onRefresh={loadDocuments}
          onSave={handleSaveDocument}
          onView={handleViewDocument}
        />
      </main>

      {showModal && (
        <DocumentModal
          document={selectedDocument}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default App

