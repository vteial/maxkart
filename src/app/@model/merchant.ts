import {prop, required} from '@rxweb/reactive-form-validators';
import {HttpParams} from '@angular/common/http';
import {Model} from './core';
import {Doc} from './doc';
import {User} from './user';
import {Subscription} from './subscriptin';

export enum MerchantStatus {
  PENDING_APPROVAL = 'pending_approval',
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
  REJECTED = 'rejected'
}

export class Merchant extends Model {

  static KEY = 'MERCHANT';

  @required()
  name: string;

  @required()
  nickName: string;

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

  // @required()
  @prop()
  directReturnUrl: string;

 // @required()
  @prop()
  indirectReturnUrl: string;

  type: string;

  docs: Doc[] = new Array<Doc>();

  approvalRemarks: string;

  status: string;

  statusClazz: string;

  subscriptionId: number;

  subscription: Subscription;

  userOwnerId: number;

  userOwner: User;

  userModeratorId: number;

  userModerator: User;

  userModerators: Array<User>;

  constructor() {
    super();
    this.userModerators = new Array<User>();
  }

  static createFrom(s: any): Merchant {
    const d = new Merchant();
    d.id = s.id;

    d.name = s.name;
    d.nickName = s.nickname;
    d.idNo = s.idNo;
    d.email = s.email;
    d.mobile = s.mobile;
    d.address = s.address;
    d.bankName = s.bankName;
    d.bankNo = s.bankNo;
    d.directReturnUrl = s.returnUrlDirect;
    d.indirectReturnUrl = s.returnUrlIndirect;
    d.type = s.merchantType;
    d.approvalRemarks = s.approvalRemarks;

    d.createDocs(s.files);

    d.subscriptionId = s.subscriptionId;
    if (s.subscription) {
      d.subscription = Subscription.createFrom(s.subscription);
    }
    d.userOwnerId = s.userId;
    if (s.owner) {
      d.userOwner = User.createFrom(s.owner);
    }
    if (s.moderators) {
      s.moderators.forEach(o => {
        d.userModerators.push(User.createFrom(o));
      });
      if (d.userModerators.length > 0) {
        d.userModerator = d.userModerators[0];
        d.userModeratorId = d.userModerator.id;
      }
    }

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
      httpParams = httpParams.set('name', '' + this.name);
    }
    if (this.nickName) {
      httpParams = httpParams.set('nickname', this.nickName);
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
    if (this.directReturnUrl) {
      httpParams = httpParams.set('return_url_direct', this.directReturnUrl);
    }
    if (this.indirectReturnUrl) {
      httpParams = httpParams.set('return_url_indirect', this.indirectReturnUrl);
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
      doc.srcPath = '/merchant/' + this.id + '/file/' + doc.name;
      this.docs.push(doc);
    }
  }

  computeStatusClazz(): void {
    this.statusClazz = '';
    if (this.status === MerchantStatus.PENDING_APPROVAL) {
      this.statusClazz = 'text-warning';
    }
    if (this.status === MerchantStatus.ACTIVE) {
      this.statusClazz = 'text-success';
    }
    if (this.status === MerchantStatus.IN_ACTIVE) {
      this.statusClazz = 'text-danger';
    }
    if (this.status === MerchantStatus.REJECTED) {
      this.statusClazz = 'text-secondary';
    }
  }

}
