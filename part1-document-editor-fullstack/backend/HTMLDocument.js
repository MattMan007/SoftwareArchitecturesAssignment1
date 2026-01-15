const Document = require('./Document');

class HTMLDocument extends Document {
  constructor(content = "") {
    super(content);
  }

  save() {
    console.log("🌐 Saving HTML document...");
    return true;
  }

  display() {
    console.log("🌍 Displaying HTML document");
  }

  getType() {
    return "HTML";
  }
}

module.exports = HTMLDocument;

