const express = require('express');
const cors = require('cors');
const DocumentEditor = require('./DocumentEditor');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for documents
const documents = new Map();
let documentIdCounter = 1;

// Create a new document
app.post('/api/documents', (req, res) => {
  try {
    const { type, content } = req.body;

    if (!type || !content) {
      return res.status(400).json({ 
        error: 'Type and content are required' 
      });
    }

    const editor = new DocumentEditor();
    const document = editor.newDocument(type, content);

    if (!document) {
      return res.status(400).json({ 
        error: `Unsupported document type: ${type}` 
      });
    }

    const id = documentIdCounter++;
    const docData = {
      id,
      type: document.getType(),
      content: document.content,
      createdAt: new Date().toISOString()
    };

    documents.set(id, { editor, docData });

    res.status(201).json({
      success: true,
      message: `${document.getType()} document created successfully`,
      document: docData
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

// Get all documents
app.get('/api/documents', (req, res) => {
  const allDocs = Array.from(documents.values()).map(d => d.docData);
  res.json({
    success: true,
    documents: allDocs
  });
});

// Get a specific document
app.get('/api/documents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const doc = documents.get(id);

  if (!doc) {
    return res.status(404).json({ 
      error: 'Document not found' 
    });
  }

  res.json({
    success: true,
    document: doc.docData
  });
});

// Save a document (simulates save operation)
app.post('/api/documents/:id/save', (req, res) => {
  const id = parseInt(req.params.id);
  const doc = documents.get(id);

  if (!doc) {
    return res.status(404).json({ 
      error: 'Document not found' 
    });
  }

  // Simulate save operation
  const saveResult = doc.editor.saveDocument();

  res.json({
    success: saveResult,
    message: `${doc.docData.type} document saved successfully`,
    document: doc.docData
  });
});

// Display document info
app.get('/api/documents/:id/display', (req, res) => {
  const id = parseInt(req.params.id);
  const doc = documents.get(id);

  if (!doc) {
    return res.status(404).json({ 
      error: 'Document not found' 
    });
  }

  const displayInfo = {
    id: doc.docData.id,
    type: doc.docData.type,
    content: doc.docData.content,
    createdAt: doc.docData.createdAt,
    features: getDocumentFeatures(doc.docData.type)
  };

  res.json({
    success: true,
    display: displayInfo
  });
});

// Get supported document types
app.get('/api/document-types', (req, res) => {
  res.json({
    success: true,
    types: ['PDF', 'WORD', 'HTML']
  });
});

// Helper function to get document features
function getDocumentFeatures(type) {
  const features = {
    'PDF': {
      format: 'Portable Document Format',
      features: ['Paginated', 'Print-ready', 'Cross-platform'],
      icon: '📄'
    },
    'WORD': {
      format: 'Microsoft Word Document',
      features: ['Editable', 'Styled text', 'Track changes'],
      icon: '📝'
    },
    'HTML': {
      format: 'HyperText Markup Language',
      features: ['Web-ready', 'Interactive', 'Styled with CSS'],
      icon: '🌐'
    }
  };
  return features[type] || {};
}

app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════════╗`);
  console.log(`║   Document Editor Server Running          ║`);
  console.log(`╚════════════════════════════════════════════╝`);
  console.log(`\n🚀 Server: http://localhost:${PORT}`);
  console.log(`📄 API: http://localhost:${PORT}/api/documents`);
  console.log(`\nPress Ctrl+C to stop\n`);
});

