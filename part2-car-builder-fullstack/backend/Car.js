class Car {
  constructor() {
    this.model = null;
    this.engine = null;
    this.transmission = null;
    this.interiorFeatures = [];
    this.exteriorOptions = {};
    this.safetyFeatures = [];
  }

  validate() {
    const errors = [];

    if (!this.model) errors.push("Model is required");
    if (!this.engine) errors.push("Engine type is required");
    if (!this.transmission) errors.push("Transmission is required");
    if (!this.exteriorOptions.color) errors.push("Color is required");

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  calculatePrice() {
    let basePrice = 30000;
    
    if (this.engine === 'V8') basePrice += 8000;
    else if (this.engine === 'V6') basePrice += 4000;
    
    if (this.transmission === 'automatic') basePrice += 2000;
    
    const interiorPricing = {
      'Leather seats': 3000,
      'GPS navigation': 1500,
      'Premium sound system': 2000,
      'Heated seats': 800,
      'Climate control': 1200
    };
    this.interiorFeatures.forEach(feature => {
      basePrice += interiorPricing[feature] || 0;
    });
    
    if (this.exteriorOptions.rims !== 'Standard') basePrice += 1500;
    if (this.exteriorOptions.sunroof) basePrice += 2500;
    
    const safetyPricing = {
      'ABS': 1000,
      'Multiple airbags': 1500,
      'Rear camera': 800,
      'Blind spot monitoring': 1200,
      'Lane departure warning': 1000
    };
    this.safetyFeatures.forEach(feature => {
      basePrice += safetyPricing[feature] || 0;
    });
    
    return basePrice;
  }
}

module.exports = Car;

