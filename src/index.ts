// export const printName = (name: string) => {
//   return `hello ${name}`;
// };

// console.log(printName("foobar"));

class Car {
  make: string;
  model: string;
  noOfWheels: number;
  isElectric: boolean;
  milage?: number;

  constructor(_make:string, _model: string, _noOfWheels: number,  _isElectric: boolean){
    this.make = _make;
    this.model = _model;
    this.noOfWheels = _noOfWheels;
    this.isElectric = _isElectric;
  }
}

class Truck {
  make: string
  model: string
  noOfWheels: number
  carringCapacity: string
  milage?: number;

  constructor(_make:string, _model: string, _noOfWheels: number, _carringCapacity: string) {
    this.make = _make;
    this.model = _model;
    this.noOfWheels = _noOfWheels;
    this.carringCapacity = _carringCapacity;
  }
}

function getMilage(vehicle: {make: string, model: string}): {make: string, model: string, milage: number} {
  console.log(vehicle);
  return {...vehicle, milage: 10}
}
 const car = new Car("Ford", "Mustang", 4, false);
 const truck = new Truck("Ford", "F-150", 6, "flatbed");

 getMilage(car);
 getMilage(truck);
 const lambo: Car = {make: "Lamborgini", model: "Hurracan", noOfWheels: 4, isElectric: false}
 getMilage(lambo)