import {DefaultSearchCriteria} from '../@model/core';
import {HttpParams} from '@angular/common/http';

export class MerchantSearch {

  name: string;

  idno: string;

}

export class MerchantSearchCriteria extends DefaultSearchCriteria {

  idno: string;

  name: string;

  asHttpParams(): HttpParams {
    let httpParams = super.asHttpParams();
    if (this.idno) {
      httpParams = httpParams.set('filter[idno]', this.idno);
    }
    if (this.name) {
      httpParams = httpParams.set('filter[name]', this.name);
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
