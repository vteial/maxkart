import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../base.component';
import {ApiService} from '../@shared/api.service';

@Component({
  selector: 'app-payment-acknowledge',
  templateUrl: './payment-acknowledge.component.html',
  styleUrls: ['./payment-acknowledge.component.scss']
})
export class PaymentAcknowledgeComponent extends BaseComponent implements OnInit {

  params: any;

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    super();
    this.viewName = 'Payment Acknowledgment';
  }

  ngOnInit(): void {
    // http://localhost:4200/payment-acknowledge?refNo=Some%20Ref%20No.&status=pending&statusDesc=null&transactionRef=0024-0000-0114
    this.params = new Map<string, any>();
    this.activatedRoute.queryParams.subscribe( params => {
      this.params = params;
      console.log(this.params);
    });
  }

}
