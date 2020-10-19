import {Model} from './core';
import {required} from '@rxweb/reactive-form-validators';
import {HttpParams} from '@angular/common/http';

export enum PaymentMethodType {

  ABSOLUTE= 'absolute',

  PERCENTAGE= 'percentage',

}

export enum PaymentMethodStatus {

  ACTIVE= 'active',

  IN_ACTIVE= 'inactive'

}

export class PaymentMethod extends Model {

  static KEY = 'PAYMENT_METHOD';

  @required()
  code: string;

  @required()
  name: string;

  @required()
  type: string;

  @required()
  amount: number;

  @required()
  settlementPeriod: number;

  @required()
  status: string;

  statusClazz: string;

  paymentMethodId: number;

  constructor() {
    super();
    this.type = '-';
    this.status = PaymentMethodStatus.ACTIVE;
  }

  static createFrom(s: any): PaymentMethod {
    const d = new PaymentMethod();

    d.id = s.id;

    d.code = s.code;
    d.name = s.name;
    d.type = s.type;
    d.amount = s.amount;
    d.settlementPeriod = s.settlePeriod;

    d.paymentMethodId = s.paymentSettingId;

    d.status = s.status;
    d.createdBy = s.createdBy;
    d.createdTime = s.createdAt;
    d.updatedBy = s.updatedBy;
    d.updatedTime = s.updatedAt;

    d.sourceMap = s;
    d.compute();

    return d;
  }

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.code) {
      httpParams = httpParams.set('code', this.code);
    }
    if (this.name) {
      httpParams = httpParams.set('name', this.name);
    }
    if (this.type) {
      httpParams = httpParams.set('type', this.type);
    }
    if (this.amount) {
      httpParams = httpParams.set('amount', '' + this.amount);
    }
    if (this.settlementPeriod) {
      httpParams = httpParams.set('settlePeriod', '' + this.settlementPeriod);
    }
    if (this.status) {
      httpParams = httpParams.set('status', this.status);
    }
    if (this.paymentMethodId) {
      httpParams = httpParams.set('paymentSettingId', '' + this.paymentMethodId);
    }
    return httpParams;
  }

  compute(): void {
    if (this.type) {
      this.type = this.type.toLowerCase();
    }
    this.statusClazz = '';
    if (this.status === 'active') {
      this.statusClazz = 'text-success';
    }
    if (this.status === 'inactive') {
      this.statusClazz = 'text-danger';
    }
  }

}
