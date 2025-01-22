import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AccountService } from '../../../core/services/account.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { TextInputComponent } from "../../../shared/components/text-input/text-input.component";

@Component({
  selector: 'app-register',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButton,
    TextInputComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private snack = inject(SnackbarService);
  validationErrors: string[] = [];

  registerForm = this.fb.group({
    firstName:['', Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    password:['', Validators.required],
  });

  onSubmit(){
    this.accountService.registerUser(this.registerForm.value).subscribe({
      next:() =>{
        this.snack.success('Registration successful - you can login');
        this.router.navigateByUrl('account/login');
      },
      error: errors => {
        this.validationErrors = errors
        console.log(this.validationErrors)
      }
    })
  }
}
