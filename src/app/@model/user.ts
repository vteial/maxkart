import {alpha, prop, required} from '@rxweb/reactive-form-validators';
import {HttpParams} from '@angular/common/http';
import {Model} from './core';
import {Doc} from './doc';
import {Merchant} from './merchant';

export enum UserStatus {
  PENDING_APPROVAL = 'pending_approval',
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
  REJECTED = 'rejected'
}

export class User extends Model {

  static KEY = 'USER';

  @required()
  name: string;

  @required()
  userId: string;

  password: string;

  @required()
  idNo: string;

  @required()
  email: string;

  @required()
  mobile: string;

  // @required()
  @prop()
  address: string;

  // @required()
  @prop()
  bankName: string;

  // @required()
  @prop()
  bankNo: string;

  docs: Doc[] = new Array<Doc>();

  approvalRemarks: string;

  status: string;

  statusClazz: string;

  merchantOwnId: number;

  merchantOwn: Merchant;

  merchantOwns: Array<Merchant>;

  merchantModerateId: number;

  merchantModerate: Merchant;

  merchantModerates: Array<Merchant>;

  constructor() {
    super();
    this.merchantOwns = new Array<Merchant>();
    this.merchantModerates = new Array<Merchant>();
  }

  static createFrom(s: any): User {
    const d = new User();
    d.id = s.id;

    d.name = s.fullName;
    d.userId = s.username;
    d.idNo = s.idNo;
    d.email = s.email;
    d.mobile = s.mobile;
    // d.address = s.address;
    d.bankName = s.bankName;
    d.bankNo = s.bankNo;
    d.approvalRemarks = s.approvalRemarks;

    d.merchantOwnId = s.defaultMerchant;
    if (s.owns) {
      s.owns.forEach(o => {
        const m = Merchant.createFrom(o);
        d.merchantOwns.push(m);
        if (m.id === d.merchantOwnId) {
          d.merchantOwn = m;
        }
      });
    }
    if (s.moderates) {
      s.moderates.forEach(o => {
        d.merchantModerates.push(Merchant.createFrom(o));
      });
      if(d.merchantModerates.length > 0) {
        d.merchantModerate = d.merchantModerates[0];
        d.merchantModerateId = d.merchantModerate.id;
      }
    }

    // d.createDocs(s.files);

    d.status = s.status;
    d.computeStatusClazz();
    d.createdBy = s.createdBy;
    d.createdTime = s.createdAt;
    d.updatedBy = s.updatedBy;
    d.updatedTime = s.updatedAt;

    d.sourceMap = s;

    return d;
  }

  asHttpParams(): HttpParams {
    let httpParams = new HttpParams();
    if (this.id) {
      httpParams = httpParams.set('id', '' + this.id);
    }
    if (this.name) {
      httpParams = httpParams.set('fullname', '' + this.name);
    }
    if (this.userId) {
      httpParams = httpParams.set('username', this.userId);
    }
    if (this.password) {
      httpParams = httpParams.set('password', this.password);
    }
    if (this.idNo) {
      httpParams = httpParams.set('idno', this.idNo);
    }
    if (this.email) {
      httpParams = httpParams.set('email', this.email);
    }
    if (this.mobile) {
      httpParams = httpParams.set('mobile', this.mobile);
    }
    if (this.address) {
      httpParams = httpParams.set('address', this.address);
    }
    if (this.bankName) {
      httpParams = httpParams.set('bank_name', this.bankName);
    }
    if (this.bankNo) {
      httpParams = httpParams.set('bank_no', this.bankNo);
    }
    return httpParams;
  }

  createDocs(sdocs: any): void {
    if (!sdocs) { return; } let i = 0;
    const docTypesMap = Doc.asTypesMap();
    for (const [key, val] of Object.entries(sdocs)) {
      const doc = new Doc();
      doc.id = ++i;
      doc.name = key;
      doc.type = 'image';
      doc.fileName = val as string;
      if (doc.fileName.substring(doc.fileName.indexOf('.')) === '.pdf') {
        doc.type = 'pdf';
      }
      const docType = docTypesMap[doc.name];
      if (docType) {
        doc.type = docType.type;
        doc.label = docType.label;
      }
      doc.srcPath = '/user/' + this.id + '/file/' + doc.name;
      this.docs.push(doc);
    }
  }

  computeStatusClazz(): void {
    this.statusClazz = '';
    if (this.status === UserStatus.PENDING_APPROVAL) {
      this.statusClazz = 'text-warning';
    }
    if (this.status === UserStatus.ACTIVE) {
      this.statusClazz = 'text-success';
    }
    if (this.status === UserStatus.IN_ACTIVE) {
      this.statusClazz = 'text-danger';
    }
    if (this.status === UserStatus.REJECTED) {
      this.statusClazz = 'text-secondary';
    }
  }

}
