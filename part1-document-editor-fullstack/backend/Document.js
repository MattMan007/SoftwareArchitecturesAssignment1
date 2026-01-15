/**
 * Abstract Document Interface
 * Defines the contract that all document types must follow
 */
class Document {
  constructor(content = "") {
    if (this.constructor === Document) {
      throw new Error("Cannot instantiate abstract class Document");
    }
    this.content = content;
  }

  save() {
    throw new Error("Method 'save()' must be implemented");
  }

  display() {
    throw new Error("Method 'display()' must be implemented");
  }

  getType() {
    throw new Error("Method 'getType()' must be implemented");
  }
}

module.exports = Document;

