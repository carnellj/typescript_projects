import * as faker from 'faker';
import { Mappable } from './CustomMap';

//How export to a file
export class User implements Mappable {
  //Note:  We do not need to explicitly but implement mappable.  It just makes it very clear to others AND also allows us to check within the class that we have implemented all of the methods
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    };
  }

  markerContent(): string {
    return `User Name: ${this.name}`;
  }
}
