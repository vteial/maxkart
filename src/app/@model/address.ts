import {Model} from './core';

export class Address extends Model {

  static KEY = 'ADDRESS';

  type: string;

  line: string;

  lineOne: string;

  lineTwo: string;

  cityCode: string;

  stateCode: string;

  countryCode: string;

  postalCode: string;

  latitude: string;

  longitude: string;

  constructor() {
    super();
  }

  static createFrom(s: any): Address {
    const d = new Address();

    d.lineOne = s.billingAddress1;
    d.lineTwo = s.billingAddress2;
    d.cityCode = s.billingCity;
    d.stateCode = s.billingState;
    d.countryCode = s.billingCountry;
    d.postalCode = s.billingPostcode;

    return d;
  }
}
