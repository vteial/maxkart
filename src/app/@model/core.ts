import {compare, minLength, password, prop, required} from '@rxweb/reactive-form-validators';
import {HttpParams} from '@angular/common/http';
import {Md5} from 'ts-md5';

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

export class Cart {

  items: Array<CartItem>;

  totalAmount: 0;

  constructor() {
    this.items = new Array<CartItem>();
  }

  addItem(citem: CartItem): void {
    const eitem = this.items.find(item => item.id === citem.id);
    if (eitem) {
      eitem.quantity += 1;
    } else {
      this.items.push(citem);
    }
    this.computeTotalAmount();
  }

  removeItem(citem: CartItem): void {
    const index = this.items.findIndex(item => item.id === citem.id);
    this.removeItemByIndex(index);
  }

  removeItemByIndex(index: number): void {
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.computeTotalAmount();
  }

  computeTotalAmount(): void {
    this.totalAmount = 0;
    for (const eitem of this.items) {
      eitem.computeAmount();
      this.totalAmount += eitem.amount;
    }
    console.log(`totalAmount : ${this.totalAmount}`);
  }

}

export class CartItem {

  id: string;

  name: string;

  rate: number;

  quantity: number;

  amount: number;

  constructor() {
    this.rate = 0;
    this.quantity = 1;
    this.computeAmount();
  }

  computeAmount(): void {
    this.amount = this.quantity * this.rate;
  }
}

export class PTran {

  refNo: string;

  name: string;

  email: string;

  mobile: string;

  total: number;

  description: string;

  merchantId: number;

  collectionId: number;

  // returnUrlDirect: string;

  returnUrlInDirect: string;

  apiKey: string;

  checksum: string;

  computeCheckSum(): void {
    const value = `${this.refNo}|${this.merchantId}|${this.collectionId}|${this.total}|${this.mobile}|${this.apiKey}`;
    console.log(`checkSum String : ${value}`);
    this.checksum =  Md5.hashStr(value) as string;
    console.log(`checkSum Value : ${this.checksum}`);
  }

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.refNo) {
      httpParams = httpParams.set('refNo', this.refNo);
    }
    if (this.name) {
      httpParams = httpParams.set('name', this.name);
    }
    if (this.email) {
      httpParams = httpParams.set('email', this.email);
    }
    if (this.mobile) {
      httpParams = httpParams.set('mobile', this.mobile);
    }
    if (this.total) {
      httpParams = httpParams.set('total', '' + this.total);
    }
    if (this.description) {
      httpParams = httpParams.set('description', this.description);
    }
    if (this.merchantId) {
      httpParams = httpParams.set('merchantId', '' + this.merchantId);
    }
    if (this.collectionId) {
      httpParams = httpParams.set('collectionId', '' + this.collectionId);
    }
    // if (this.returnUrlDirect) {
    //   httpParams = httpParams.set('returnUrlDirect', this.returnUrlDirect);
    // }
    if (this.returnUrlInDirect) {
      httpParams = httpParams.set('returnUrlInDirect', this.returnUrlInDirect);
    }
    if (this.checksum) {
      httpParams = httpParams.set('checksum', this.checksum);
    }
    return httpParams;
  }
}
