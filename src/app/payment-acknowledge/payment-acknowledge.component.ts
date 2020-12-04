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
    this.params = this.activatedRoute.snapshot.paramMap;
  }

}
