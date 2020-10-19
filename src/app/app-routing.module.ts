import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {SignOutComponent} from './sign-out/sign-out.component';
import {PaymentMethodListComponent} from './payment-method/payment-method-list/payment-method-list.component';
import {PaymentMethodViewComponent} from './payment-method/payment-method-view/payment-method-view.component';
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
import {NeedMoreInfoComponent} from './common/need-more-info/need-more-info.component';

const routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'sign-out', component: SignOutComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile-edit', component: ProfileEditComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'user-list/:id/view', component: UserViewComponent},
  {path: 'user-list/:id/edit', component: UserEditComponent},
  {path: 'merchant-list', component: MerchantListComponent},
  {path: 'merchant-list/:id/view', component: MerchantViewComponent},
  {path: 'merchant-list/:id/edit', component: MerchantEditComponent},
  {path: 'transaction-list', component: TransactionListComponent},
  {path: 'transaction-list/:id/view', component: TransactionViewComponent},
  {path: 'payment-method-list', component: PaymentMethodListComponent},
  {path: 'payment-method-list/:id/add', component: PaymentMethodEditComponent},
  {path: 'payment-method-list/:id/view', component: PaymentMethodViewComponent},
  {path: 'payment-method-list/:id/edit', component: PaymentMethodEditComponent},
  {path: 'subscription-list', component: SubscriptionListComponent},
  {path: 'subscription-list/:id/add', component: SubscriptionEditComponent},
  {path: 'subscription-list/:id/view', component: SubscriptionViewComponent},
  {path: 'subscription-list/:id/edit', component: SubscriptionEditComponent},
  {path: 'need-more-info', component: NeedMoreInfoComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
