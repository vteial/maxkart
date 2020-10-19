import {HttpParams} from '@angular/common/http';
import {compare, minLength, password, prop, required} from '@rxweb/reactive-form-validators';

export abstract class Model {

  id: number;

  createdBy: number;

  createdTime: Date;

  updatedBy: number;

  updatedTime: Date;

  sourceMap: any;

  constructor() {
  }

  asHttpParams(): HttpParams {
    const httpParams = new HttpParams();
    return httpParams;
  }

  asHttpParamsString(): string {
    let pstring = this.asHttpParams().toString();
    if (pstring && pstring.length > 0) {
      pstring = '?' + pstring;
    }
    return pstring;
  }
}

export class UserDto {

  userId: string;

  password: string;

  constructor() {
  }

}

export class ChangePasswordDto {

  @password({validation: {maxLength: 10, minLength: 5, digit: true, specialCharacter: true} })
  @required()
  newPassword: string;

  @compare({fieldName: 'newPassword'})
  @required()
  confirmPassword: string;

  constructor() {
  }

}

export class NeedMoreInfo {

  static TYPE_FILE = 'file';

  static TYPE_TEXT = 'text';

  @required()
  type: string;

  @required()
  message: string;

  @prop()
  fileName: string;

  constructor() {
    this.type = NeedMoreInfo.TYPE_TEXT;
  }

}

export interface SearchCriteria {

  asHttpParams(): HttpParams;

  asHttpParamsString(): string;

}

export class DefaultSearchCriteria implements SearchCriteria {

  size: number;

  page: number;

  pages: number;

  sort: string;

  order: string;

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.size) {
      httpParams = httpParams.set('size', '' + this.size);
    }
    if (this.page) {
      httpParams = httpParams.set('page', '' + this.page);
    }
    if (this.sort) {
      httpParams = httpParams.set('sort', this.sort);
    }
    if (this.order) {
      httpParams = httpParams.set('order', this.order);
    }
    return httpParams;
  }

  asHttpParamsString(): string {
    let pstring = this.asHttpParams().toString();
    if (pstring && pstring.length > 0) {
      pstring = '?' + pstring;
    }
    return pstring;
  }

}
