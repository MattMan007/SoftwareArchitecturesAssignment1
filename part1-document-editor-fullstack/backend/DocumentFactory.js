const PDFDocument = require('./PDFDocument');
const WordDocument = require('./WordDocument');
const HTMLDocument = require('./HTMLDocument');

class DocumentFactory {
  static createDocument(type, content = "") {
    switch (type.toUpperCase()) {
      case 'PDF':
        return new PDFDocument(content);
      case 'WORD':
      case 'DOC':
      case 'DOCX':
        return new WordDocument(content);
      case 'HTML':
      case 'HTM':
        return new HTMLDocument(content);
      default:
        throw new Error(`Unsupported document type: ${type}`);
    }
  }

  static getSupportedTypes() {
    return ['PDF', 'WORD', 'HTML'];
  }
}

module.exports = DocumentFactory;

