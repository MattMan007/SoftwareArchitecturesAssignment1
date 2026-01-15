const Car = require('./Car');

class CarBuilder {
  constructor() {
    this.car = new Car();
  }

  setModel(model) {
    this.car.model = model;
    console.log(`✓ Model set: ${model}`);
    return this;
  }

  setEngine(engineType) {
    this.car.engine = engineType;
    console.log(`✓ Engine set: ${engineType}`);
    return this;
  }

  setTransmission(transmission) {
    const validTransmissions = ['manual', 'automatic'];
    if (!validTransmissions.includes(transmission.toLowerCase())) {
      throw new Error(`Invalid transmission type: ${transmission}`);
    }
    this.car.transmission = transmission.toLowerCase();
    console.log(`✓ Transmission set: ${transmission}`);
    return this;
  }

  addInteriorFeature(feature) {
    if (!this.car.interiorFeatures.includes(feature)) {
      this.car.interiorFeatures.push(feature);
      console.log(`✓ Added interior feature: ${feature}`);
    }
    return this;
  }

  addInteriorFeatures(features) {
    features.forEach(feature => this.addInteriorFeature(feature));
    return this;
  }

  setColor(color) {
    this.car.exteriorOptions.color = color;
    console.log(`✓ Color set: ${color}`);
    return this;
  }

  setRims(rims) {
    this.car.exteriorOptions.rims = rims;
    console.log(`✓ Rims set: ${rims}`);
    return this;
  }

  setSunroof(hasSunroof) {
    this.car.exteriorOptions.sunroof = hasSunroof;
    console.log(`✓ Sunroof: ${hasSunroof ? 'Added' : 'Not included'}`);
    return this;
  }

  addSafetyFeature(feature) {
    if (!this.car.safetyFeatures.includes(feature)) {
      this.car.safetyFeatures.push(feature);
      console.log(`✓ Added safety feature: ${feature}`);
    }
    return this;
  }

  addSafetyFeatures(features) {
    features.forEach(feature => this.addSafetyFeature(feature));
    return this;
  }

  build() {
    const validation = this.car.validate();
    
    if (!validation.isValid) {
      console.log("\n❌ Cannot build car - Missing required configurations:");
      validation.errors.forEach(error => console.log(`   - ${error}`));
      throw new Error("Car configuration incomplete");
    }

    console.log("\n✅ Car built successfully!");
    return this.car;
  }

  getCurrent() {
    return this.car;
  }

  reset() {
    this.car = new Car();
    console.log("🔄 Builder reset");
    return this;
  }
}

module.exports = CarBuilder;

