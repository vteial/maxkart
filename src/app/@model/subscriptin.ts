import {Model} from './core';
import {HttpParams} from '@angular/common/http';
import {required} from '@rxweb/reactive-form-validators';
import {PaymentMethod} from './payment-method';

export class Subscription extends Model {

  static KEY = 'SUBSCRIPTION';

  @required()
  name: string;

  @required()
  pricePerMonth: number;

  @required()
  description: string;

  @required()
  isItForPublic = 'yes';

  @required()
  status = 'active';

  statusClazz: string;

  paymentMethods: Array<PaymentMethod>;

  constructor() {
    super();
    this.id = 0;
    this.paymentMethods = new Array<PaymentMethod>();
  }

  static createFrom(s: any): Subscription {
    const d = new Subscription();

    d.id = s.id;

    d.name = s.name;
    d.pricePerMonth = s.feeMonthly;
    d.description = s.description;
    if (s.public) {
      d.isItForPublic = 'yes';
    } else {
      d.isItForPublic = 'no';
    }
    d.status = s.status;
    d.createdBy = s.createdBy;
    d.createdTime = s.createdAt;
    d.updatedBy = s.updatedBy;
    d.updatedTime = s.updatedAt;

    d.sourceMap = s;
    d.compute();

    // d.paymentMethods = new Array<PaymentMethod>();
    if (s.paymentMethods) {
      for (const o of s.paymentMethods) {
        d.paymentMethods.push(PaymentMethod.createFrom(o));
      }
    }

    return d;
  }

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.id) {
      httpParams = httpParams.set('id', '' + this.id);
    }
    if (this.name) {
      httpParams = httpParams.set('name', '' + this.name);
    }
    if (this.pricePerMonth) {
      httpParams = httpParams.set('feeMonthly', '' + this.pricePerMonth);
    }
    if (this.description) {
      httpParams = httpParams.set('description', '' + this.description);
    }
    if (this.isItForPublic) {
      httpParams = httpParams.set('public', '' + (this.isItForPublic === 'Yes' ? 1 : 0));
    }
    if (this.status) {
      httpParams = httpParams.set('status', '' + this.status);
    }
    return httpParams;
  }

  compute(): void {
    this.statusClazz = '';
    if (this.status === 'active') {
      this.statusClazz = 'text-success';
    }
    if (this.status === 'inactive') {
      this.statusClazz = 'text-danger';
    }
  }

}
