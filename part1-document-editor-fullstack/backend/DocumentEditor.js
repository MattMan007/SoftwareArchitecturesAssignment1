const DocumentFactory = require('./DocumentFactory');

class DocumentEditor {
  constructor() {
    this.currentDocument = null;
  }

  newDocument(type, content = "") {
    try {
      this.currentDocument = DocumentFactory.createDocument(type, content);
      console.log(`✓ Created new ${this.currentDocument.getType()} document`);
      return this.currentDocument;
    } catch (error) {
      console.error(`✗ Error: ${error.message}`);
      return null;
    }
  }

  saveDocument() {
    if (!this.currentDocument) {
      return false;
    }
    return this.currentDocument.save();
  }

  displayDocument() {
    if (!this.currentDocument) {
      return;
    }
    this.currentDocument.display();
  }

  getCurrentDocumentType() {
    return this.currentDocument ? this.currentDocument.getType() : null;
  }
}

module.exports = DocumentEditor;

