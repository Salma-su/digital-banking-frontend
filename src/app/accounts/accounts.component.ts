import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup! : FormGroup
  operationsFormGroup! : FormGroup
  accountObservable! : Observable<AccountDetails>
  currentPage: number=0;
  pageSize: number =5;

  constructor(private fb : FormBuilder, private accountService : AccountsService) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control('')
    });
    this.operationsFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(null),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    })
  }

  handleSearchAccount(){
     let accountID : string = this.accountFormGroup.value.accountId;
     this.accountObservable = this.accountService.getAccount(accountID, this.currentPage, this.pageSize)
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId :string = this.accountFormGroup.value.accountId;
    let operationType = this.operationsFormGroup.value.operationType;
    let amount :number = this.operationsFormGroup.value.amount;
    let description :string =  this.operationsFormGroup.value.description;
    let accountDest :string = this.operationsFormGroup.value.accountDestination
    if(operationType=='DEBIT'){
      this.accountService.debit(accountId, amount, description).subscribe({
        next : (data)=>{
          alert("Success Debit");
          this.operationsFormGroup.reset();
          this.handleSearchAccount();
        },
        error : (err)=>{
          console.log(err);
        }
      });
    } else if(operationType == 'CREDIT'){
      this.accountService.credit(accountId, amount, description).subscribe({
        next : (data) =>{
          alert("success credit")
          this.operationsFormGroup.reset();
          this.handleSearchAccount()
        },
        error : (err) => {
          console.log(err)
        }
      });
    }else if(operationType == 'TRANSFER'){
      this.accountService.transfer(accountId, accountDest, amount, description).subscribe({
        next : (data) =>{
          alert("success transfer")
          this.operationsFormGroup.reset();
          this.handleSearchAccount()
        },
        error : (err) => {
          console.log(err)
        }
      });
    }
  }
}
