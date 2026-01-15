const Document = require('./Document');

class PDFDocument extends Document {
  constructor(content = "") {
    super(content);
  }

  save() {
    console.log("🔴 Saving PDF document...");
    return true;
  }

  display() {
    console.log("📄 Displaying PDF document");
  }

  getType() {
    return "PDF";
  }
}

module.exports = PDFDocument;

