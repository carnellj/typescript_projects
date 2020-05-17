const add = (a: number, b: number): number => {
  return a + b;
};

function divide(a: number, b: number): number {
  return a / b;
}

const multiply = function (a: number, b: number): number {
  return a * b;
};

//void function
const logger = (message: string): void => {
  console.log(message);
};

//Indicates that we will never return a value because it will always throw an exception.
const throwError = (message: string): never => {
  throw new Error(message);
};

//Destructuring functions
const forecast = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = ({
  date,
  weather,
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};
