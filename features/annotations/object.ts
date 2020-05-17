const profile = {
  name: 'alext',
  age: 20,
  coords: {
    lat: 0,
    lng: 14,
  },

  setAge(age: number): void {
    this.age = age;
  },
};

//destructuing from an object.  Pulling out the age value
//const { age, name }: { age: number; name: string } = profile;
const {
  coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;

//tuples
