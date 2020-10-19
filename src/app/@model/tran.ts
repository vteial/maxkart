import {Model} from './core';
import {HttpParams} from '@angular/common/http';
import {Merchant} from './merchant';
import {Address} from './address';

export class Tran extends Model {

  static KEY = 'TRAN';

  orderNo: string;

  amount: number;

  type: string;

  merchantId: number;

  merchant: Merchant;

  tranReceipt: TranReceipt;

  tranDetail: TranDetail;

  status: string;

  statusClazz: string;

  constructor() {
    super();
  }

  static createFrom(s: any): Tran {
    const d = new Tran();

    d.id = s.id;

    d.orderNo = s.orderNo;
    d.amount = s.total;
    d.type = s.type;
    d.merchantId = s.merchantId;

    if (s.receipts && s.receipts.length > 0) {
      d.tranReceipt = TranReceipt.createFrom(s.receipts[0]);
    }
    d.tranDetail = TranDetail.createFrom(s);

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
    return httpParams;
  }

  computeStatusClazz(): void {
    this.statusClazz = '';
    if (this.status === 'pending') {
      this.statusClazz = 'text-warning';
    }
    if (this.status === 'success') {
      this.statusClazz = 'text-success';
    }
  }

}

export class TranReceipt extends Model {

  orderType: string;

  totalPaid: number;

  tranCurrency: string;

  tranTime: Date;

  status: string;

  statusDescription: string;

  constructor() {
    super();
  }

  static createFrom(s: any): TranReceipt {
    const d = new TranReceipt();

    d.id = s.id;

    d.orderType = s.order_type;
    d.totalPaid = s.total_paid;
    d.tranCurrency = s.txn_currency;
    d.tranTime = s.seller_txn_time;
    d.status = s.status;
    d.statusDescription = s.status_desc;

    d.createdBy = s.created_by;
    d.createdTime = s.createdAt;
    d.updatedBy = s.updated_by;
    d.updatedTime = s.updatedAt;

    return d;
  }
}

export class TranDetail {

  customerName: string;

  customerEmail: string;

  customerMobile: string;

  referenceText: string;

  description: string;

  address: Address;

  constructor() {
  }

  static createFrom(s: any): TranDetail {
    const d = new TranDetail();

    d.customerName = s.name;
    d.customerEmail = s.email;
    d.customerMobile = s.mobile;
    d.referenceText = s.refNo;
    d.description = s.description;

    d.address = Address.createFrom(s);
    d.address.type = 'billing';

    return d;
  }
}
