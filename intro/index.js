const carsJSON = `[
    {
      "year": 1997,
      "make": "Honda",
      "model": "Accord",
      "price": 2800
    },
    {
      "year": 2000,
      "make": "Honda",
      "model": "Civic",
      "price": 3000
    },
    {
      "year": 2012,
      "make": "Toyota",
      "model": "Poop",
      "price": 5000
    },
    {
      "year": 2020,
      "make": "Chervolet",
      "model": "Panda",
      "price": 10000
    }
  ]`;

const cars = JSON.parse(carsJSON);

const formatCar = car => {
    const {
        year,
        make,
        model,
        price
    } = car;
    return `${year} ${make} ${model}: $${price}`;
};


const report = cars
    .filter(car => car.price < 5000)
    .map(formatCar)
    .join('\n');


const message = report;

document.getElementById('message-element').textContent = message;