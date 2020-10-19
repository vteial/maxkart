import {HttpParams} from '@angular/common/http';
import {DefaultSearchCriteria} from '../@model/core';

export class TransactionSearch {

  orderNo: string;

  name: string;

  status: string;
}

export class TransactionSearchCriteria extends DefaultSearchCriteria {

  orderNo: string;

  name: string;

  status: string;

  asHttpParams(): HttpParams {
    let httpParams = super.asHttpParams();
    if (this.orderNo) {
      httpParams = httpParams.set('filter[order_no]', this.orderNo);
    }
    if (this.name) {
      httpParams = httpParams.set('filter[name]', this.name);
    }
    if (this.status) {
      httpParams = httpParams.set('filter[status]', this.status);
    }
    return httpParams;
  }

  // asHttpParamsString(): string {
  //   let pstring = this.asHttpParams().toString();
  //   if (pstring && pstring.length > 0) {
  //     pstring = '?' + pstring;
  //   }
  //   return pstring;
  // }
}
