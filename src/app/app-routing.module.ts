import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {HomeComponent} from "./Components/home/home.component";
import {RegisterComponent} from "./Components/register/register.component";
import {ProfileComponent} from "./Components/profile/profile.component";
import {LoginComponent} from "./Components/login/login.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";

const routes: Routes = [
  {path : "customers" , component : CustomersComponent},
  {path : "accounts" , component : AccountsComponent},
  {path : "new-customer" , component : NewCustomerComponent},
  {path : "customer-accounts" , component : CustomerAccountsComponent},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
