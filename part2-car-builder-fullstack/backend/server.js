const express = require('express');
const cors = require('cors');
const CarBuilder = require('./CarBuilder');
const CarDirector = require('./CarDirector');

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for car configurations
const cars = new Map();
let carIdCounter = 1;

// Get available options
app.get('/api/options', (req, res) => {
  res.json({
    success: true,
    options: {
      engines: ['V4', 'V6', 'V8', 'Electric', 'Hybrid'],
      transmissions: ['manual', 'automatic'],
      interiorFeatures: [
        'Leather seats',
        'GPS navigation',
        'Premium sound system',
        'Heated seats',
        'Climate control'
      ],
      colors: ['White', 'Black', 'Silver', 'Blue', 'Red', 'Green', 'Gray'],
      rims: ['Standard', 'Alloy', 'Chrome Alloy', 'Sport Alloy'],
      safetyFeatures: [
        'ABS',
        'Multiple airbags',
        'Rear camera',
        'Blind spot monitoring',
        'Lane departure warning'
      ]
    }
  });
});

// Start new car configuration
app.post('/api/cars/new', (req, res) => {
  try {
    const builder = new CarBuilder();
    const id = carIdCounter++;
    
    cars.set(id, {
      builder,
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: 'New car configuration started',
      carId: id
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Configure car step by step
app.post('/api/cars/:id/configure', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const carConfig = cars.get(id);

    if (!carConfig) {
      return res.status(404).json({
        error: 'Car configuration not found'
      });
    }

    const { action, value, values } = req.body;
    const builder = carConfig.builder;

    switch (action) {
      case 'setModel':
        builder.setModel(value);
        break;
      case 'setEngine':
        builder.setEngine(value);
        break;
      case 'setTransmission':
        builder.setTransmission(value);
        break;
      case 'addInteriorFeature':
        builder.addInteriorFeature(value);
        break;
      case 'addInteriorFeatures':
        builder.addInteriorFeatures(values);
        break;
      case 'setColor':
        builder.setColor(value);
        break;
      case 'setRims':
        builder.setRims(value);
        break;
      case 'setSunroof':
        builder.setSunroof(value);
        break;
      case 'addSafetyFeature':
        builder.addSafetyFeature(value);
        break;
      case 'addSafetyFeatures':
        builder.addSafetyFeatures(values);
        break;
      default:
        return res.status(400).json({
          error: `Unknown action: ${action}`
        });
    }

    const currentCar = builder.getCurrent();

    res.json({
      success: true,
      message: 'Configuration updated',
      car: getCarData(currentCar)
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// Build/finalize car
app.post('/api/cars/:id/build', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const carConfig = cars.get(id);

    if (!carConfig) {
      return res.status(404).json({
        error: 'Car configuration not found'
      });
    }

    const car = carConfig.builder.build();
    const validation = car.validate();

    res.json({
      success: true,
      message: 'Car built successfully!',
      car: {
        ...getCarData(car),
        price: car.calculatePrice(),
        validation: validation
      }
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      validation: carConfig.builder.getCurrent().validate()
    });
  }
});

// Get car configuration status
app.get('/api/cars/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const carConfig = cars.get(id);

    if (!carConfig) {
      return res.status(404).json({
        error: 'Car configuration not found'
      });
    }

    const currentCar = carConfig.builder.getCurrent();
    const validation = currentCar.validate();

    res.json({
      success: true,
      car: getCarData(currentCar),
      validation: validation,
      price: validation.isValid ? currentCar.calculatePrice() : null
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Get pre-configured car types
app.get('/api/cars/prebuilt/types', (req, res) => {
  res.json({
    success: true,
    types: [
      { id: 'economy', name: 'Economy Car', description: 'Affordable and efficient' },
      { id: 'luxury', name: 'Luxury Car', description: 'Premium features and comfort' },
      { id: 'family', name: 'Family SUV', description: 'Spacious and safe' },
      { id: 'sports', name: 'Sports Car', description: 'Performance and style' }
    ]
  });
});

// Build pre-configured car
app.post('/api/cars/prebuilt/:type', (req, res) => {
  try {
    const builder = new CarBuilder();
    const director = new CarDirector(builder);
    let car;

    switch (req.params.type) {
      case 'economy':
        car = director.buildEconomyCar();
        break;
      case 'luxury':
        car = director.buildLuxuryCar();
        break;
      case 'family':
        car = director.buildFamilySUV();
        break;
      case 'sports':
        car = director.buildSportsCar();
        break;
      default:
        return res.status(400).json({
          error: 'Invalid car type'
        });
    }

    res.json({
      success: true,
      message: 'Pre-configured car built successfully!',
      car: {
        ...getCarData(car),
        price: car.calculatePrice(),
        validation: car.validate()
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Helper function to extract car data
function getCarData(car) {
  return {
    model: car.model,
    engine: car.engine,
    transmission: car.transmission,
    interiorFeatures: car.interiorFeatures,
    exteriorOptions: car.exteriorOptions,
    safetyFeatures: car.safetyFeatures
  };
}

app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════════╗`);
  console.log(`║   Car Builder Server Running               ║`);
  console.log(`╚════════════════════════════════════════════╝`);
  console.log(`\n🚗 Server: http://localhost:${PORT}`);
  console.log(`🔧 API: http://localhost:${PORT}/api/cars`);
  console.log(`\nPress Ctrl+C to stop\n`);
});

