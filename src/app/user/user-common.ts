import {DefaultSearchCriteria, SearchCriteria} from '../@model/core';
import {HttpParams} from '@angular/common/http';

export class UserSearch {

  by: string;

  name: string;

  idno: string;

}

export class UserSearchCriteria extends DefaultSearchCriteria {

  filterFullName: string;

  asHttpParams(): HttpParams {
    let httpParams = super.asHttpParams();
    if (this.filterFullName) {
      httpParams = httpParams.set('filter[fullname]', this.filterFullName);
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
