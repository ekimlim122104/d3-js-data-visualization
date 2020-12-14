// const factorial = n =>
//     n === 0
//         ? 1
//         : n * factorial(n - 1);

function factorial(n){
    if(n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// for (let index = 0; index < 10; index++) {
//     console.log(factorial(index));
// }


// function fibonacci(num) {
//     if(num < 1) return 1;
    
//     return fibonacci(num - 1) + fibonacci(num - 2);
// }

// console.log(fibonacci(5));


let car = {
    year: 1997,
    make: 'Honda',
    model: 'Accord',
    price: 2800
};


let cars = [];

// console.log(cars);

cars = [car];

// console.log(cars);


cars.push({year: 2000, make: 'Honda', model: 'Civic', price: 3000});
cars.push({year: 2012, make: 'Toyota', model: 'Poop', price: 5000});
cars.push({year: 2020, make: 'Chervolet', model: 'Panda', price: 10000});

// for (let index = 0; index < cars.length; index++) {
//     const car = cars[index];
//     console.log(car.price);  
// }

// let formatCar;

// cars.forEach(car => {
//     console.log(car.price);

//     formatCar = car => {

//         const {
//             year,
//             make,
//             model,
//             price
//         } = car;
//         return `${year} ${make} ${model}: $${price}`;
//     };
//     console.log(formatCar(car));
// });


const jsonCars = JSON.stringify(cars,null,2);
console.log(jsonCars);

const newCars = JSON.parse(jsonCars);
console.log(newCars);
