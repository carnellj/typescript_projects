const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
};

//tuples
const pepsi: [string, boolean, number] = ['brown', true, 40];

//type alias
type Drink = [string, boolean, number];

const pepsi2: Drink = ['brown', true, 40];
const sprite: Drink = ['yellow', true, 20];
