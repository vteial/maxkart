import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidenavModule} from 'angular-ng-sidenav';
import {SWSizeObserverModule} from '@service-work/size-observer';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ClipboardModule} from 'ngx-clipboard';
import {ToastrModule} from 'ngx-toastr';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignOutComponent} from './sign-out/sign-out.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {DocViewerComponent} from './common/doc-viewer/doc-viewer.component';
import {JsonViewerComponent} from './common/json-viewer/json-viewer.component';
import {DocComponent} from './common/doc/doc.component';
import {NeedMoreInfoComponent} from './common/need-more-info/need-more-info.component';
import {PaymentMethodViewComponent} from './payment-method/payment-method-view/payment-method-view.component';
import {PaymentMethodListComponent} from './payment-method/payment-method-list/payment-method-list.component';
import {SubscriptionListComponent} from './subscription/subscription-list/subscription-list.component';
import {SubscriptionViewComponent} from './subscription/subscription-view/subscription-view.component';
import {MerchantViewComponent} from './merchant/merchant-view/merchant-view.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {MerchantListComponent} from './merchant/merchant-list/merchant-list.component';
import {UserViewComponent} from './user/user-view/user-view.component';
import {TransactionListComponent} from './transaction/transaction-list/transaction-list.component';
import {PaymentMethodEditComponent} from './payment-method/payment-method-edit/payment-method-edit.component';
import {MerchantEditComponent} from './merchant/merchant-edit/merchant-edit.component';
import {SubscriptionEditComponent} from './subscription/subscription-edit/subscription-edit.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {TransactionViewComponent} from './transaction/transaction-view/transaction-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    SignInComponent,
    SignOutComponent,
    ProfileComponent,
    ProfileEditComponent,
    ChangePasswordComponent,
    UserListComponent,
    UserViewComponent,
    UserEditComponent,
    MerchantListComponent,
    MerchantViewComponent,
    MerchantEditComponent,
    TransactionListComponent,
    TransactionViewComponent,
    SubscriptionListComponent,
    SubscriptionViewComponent,
    SubscriptionEditComponent,
    PaymentMethodEditComponent,
    PaymentMethodViewComponent,
    PaymentMethodListComponent,
    DocComponent,
    DocViewerComponent,
    JsonViewerComponent,
    NeedMoreInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SWSizeObserverModule,
    SidenavModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    ClipboardModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    InfiniteScrollModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
