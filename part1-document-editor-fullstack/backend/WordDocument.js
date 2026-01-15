const Document = require('./Document');

class WordDocument extends Document {
  constructor(content = "") {
    super(content);
  }

  save() {
    console.log("📘 Saving Word document...");
    return true;
  }

  display() {
    console.log("📝 Displaying Word document");
  }

  getType() {
    return "WORD";
  }
}

module.exports = WordDocument;

