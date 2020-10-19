import {Model} from './core';
import {HttpParams} from '@angular/common/http';
import {prop, required} from '@rxweb/reactive-form-validators';

export class Doc extends Model {

  static TYPES = [
    {name: 'profilePhoto', type: 'image', label: 'Profile Photo'},
    {name: 'icCopy', type: 'image', label: 'IC Copy'},
    {name: 'directorIcFront', type: 'image', label: 'Director IC Front'},
    {name: 'directorIcBack', type: 'image', label: 'Director IC Back'},
    {name: 'bankStatement', type: 'pdf', label: 'Bank Statement'},
    {name: 'ssmStatement', type: 'pdf', label: 'SSM Statement'},
    {name: 'outletImage', type: 'image', label: 'Outlet Image'},
    {name: 'companyStamp', type: 'image', label: 'Company Stamp'},
  ];

  @required()
  name: string;

  @prop()
  description: string;

  type: string;

  // @required()
  fileName: string;

  @required()
  file: any;

  label: string;

  srcPath: string;

  srcUrl: string;

  static asTypesMap(): {} {
    const typesMap = {};
    Doc.TYPES.forEach(docType => {
      typesMap[docType.name] = docType;
    });
    return typesMap;
  }

  constructor() {
    super();
  }

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.id) {
      httpParams = httpParams.set('id', '' + this.id);
    }
    if (this.name) {
      httpParams = httpParams.set('name', this.name);
    }
    if (this.type) {
      httpParams = httpParams.set('type', this.type);
    }
    if (this.description) {
      httpParams = httpParams.set('description', this.description);
    }
    return httpParams;
  }

}
