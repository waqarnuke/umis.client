import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AccountService } from '../../../core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusyService } from '../../../core/services/busy.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  busyService = inject(BusyService);

  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router)
  private activatedRoute= inject(ActivatedRoute);
  returnUrl ="/dash-board";

  constructor(){
    const url = this.activatedRoute.snapshot.queryParams['returnUrl'];
    if(url) this.returnUrl = url
  }

  loginForm = this.fb.group({
    email: [''],
    password:['']
  })

  onSubmit(){
    this.accountService.login(this.loginForm.value).pipe(
      switchMap(() => this.accountService.getUserInfo())
    )
    .subscribe({
      next: () => {
        this.router.navigateByUrl(this.returnUrl);
      }
    })
  }
}
