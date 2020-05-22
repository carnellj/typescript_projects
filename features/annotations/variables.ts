let apples = 5;
let speed: string = 'fast';
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

//built in objects
let now: Date = new Date();

//Array
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3];
let truth: boolean[] = [true, true, false];

//Classess
class Car {}

let car: Car = new Car();

//Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20,
};

//Function
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

//Any
const json = '{"x":10, "y":10}';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);