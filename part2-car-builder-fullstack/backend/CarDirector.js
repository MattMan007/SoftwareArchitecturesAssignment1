class CarDirector {
  constructor(builder) {
    this.builder = builder;
  }

  buildEconomyCar() {
    console.log("\n🚙 Building Economy Car...\n");
    return this.builder
      .setModel("Economy Sedan")
      .setEngine("V4")
      .setTransmission("manual")
      .setColor("White")
      .addSafetyFeature("ABS")
      .build();
  }

  buildLuxuryCar() {
    console.log("\n🏎️  Building Luxury Car...\n");
    return this.builder
      .setModel("Luxury Sport")
      .setEngine("V8")
      .setTransmission("automatic")
      .addInteriorFeatures([
        "Leather seats",
        "GPS navigation",
        "Premium sound system",
        "Heated seats",
        "Climate control"
      ])
      .setColor("Midnight Blue")
      .setRims("Chrome Alloy")
      .setSunroof(true)
      .addSafetyFeatures([
        "ABS",
        "Multiple airbags",
        "Rear camera",
        "Blind spot monitoring",
        "Lane departure warning"
      ])
      .build();
  }

  buildFamilySUV() {
    console.log("\n🚐 Building Family SUV...\n");
    return this.builder
      .setModel("Family SUV")
      .setEngine("V6")
      .setTransmission("automatic")
      .addInteriorFeatures([
        "GPS navigation",
        "Climate control"
      ])
      .setColor("Silver")
      .setRims("Standard")
      .setSunroof(false)
      .addSafetyFeatures([
        "ABS",
        "Multiple airbags",
        "Rear camera"
      ])
      .build();
  }

  buildSportsCar() {
    console.log("\n🏁 Building Sports Car...\n");
    return this.builder
      .setModel("Performance Coupe")
      .setEngine("V8")
      .setTransmission("manual")
      .addInteriorFeatures([
        "Premium sound system",
        "GPS navigation"
      ])
      .setColor("Racing Red")
      .setRims("Sport Alloy")
      .setSunroof(true)
      .addSafetyFeatures([
        "ABS",
        "Multiple airbags"
      ])
      .build();
  }
}

module.exports = CarDirector;

