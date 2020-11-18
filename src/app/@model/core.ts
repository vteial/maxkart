import {compare, minLength, password, prop, required} from '@rxweb/reactive-form-validators';

export class User {

  userId: string;

  password: string;

  constructor() {
  }

}

export class Product {

  id: string;

  name: string;

  rate: number;

  quantity: number;

  constructor() {
  }

}
