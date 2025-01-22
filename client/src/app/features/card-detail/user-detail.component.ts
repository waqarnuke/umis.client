import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router,RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { SnackbarService } from '../../core/services/snackbar.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { AccountService } from '../../core/services/account.service';
import { cardDetail, photo } from '../../shared/models/card';
import {
  MatDialog,
} from '@angular/material/dialog';
import { PopupBoxComponent } from '../../shared/components/popup-box/popup-box.component';




@Component({
  selector: 'app-user-detail',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButton,
    TextInputComponent,
    RouterLink, 
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snack = inject(SnackbarService);
  accountService = inject(AccountService);
  dashboardService = inject(DashboardService);
  readonly dialog = inject(MatDialog);

  photo?: photo;
  cardDetails? : cardDetail;
  userId : any;

  validationErrors: string[] = [];
  photoUrl : any;
  selectedFile: File | null = null;

  cardDetailsForm = this.fb.group({
    name:['', Validators.required],
    title:['',Validators.required],
    phone:['',Validators.required],
    email:['',[Validators.required, Validators.email]],
    organization:['', Validators.required],
    address:['', Validators.required],
    city:['', Validators.required],
    state:['', Validators.required],
    zipCode:['', Validators.required],
    weblink1:['', ],
    weblink2:['', ],
    weblink3:['', ],
    weblink4:['', ],
    userId:['', ],
    id:[0],
  });
  domain: string = '';
  qrData: string = '';
  
  ngOnInit(): void {
    this.domain = window.location.origin; // Get the domain URL
    console.log('Domain URL:', this.domain);
    this.userId = this.accountService.currentUser()?.id;
    this.qrData =this.domain +'/profile/'+ this.userId 

    this.userId = this.accountService.currentUser()?.id;
    console.log(this.userId)
    
    if(this.userId) this.dashboardService.getcarddetail(this.userId).subscribe({
      next:res => {
        if(res)
        {
          console.log(res)
          this.photo = res.photo;
          this.photoUrl = res.photo.url
          this.cardDetails = res;
          this.cardDetailsForm.patchValue(res);  
        }
      } ,
      error : error=> console.log(error),
    });
  }

  onSubmit(){
    const id = this.cardDetailsForm.get('id')?.value;
    console.log(id)
    this.cardDetailsForm.get('userId')?.patchValue(this.userId);
    if(id)
    {
      this.dashboardService.UpdateCard(id, this.cardDetailsForm.value).subscribe({
        next:() =>{
          this.snack.success('Successfully update the data');
          //this.router.navigateByUrl('account/login');
        },
        error: errors => {
          this.validationErrors = errors
          console.log(this.validationErrors)
        }
      })
    } 
    else
    {
      console.log(this.cardDetailsForm.value)
      this.dashboardService.CreateCard(this.cardDetailsForm.value).subscribe({
        next:() =>{
          this.snack.success('Successfully save the data');
          //this.router.navigateByUrl('account/login');
        },
        error: errors => {
          this.validationErrors = errors
          console.log(this.validationErrors)
        }
      })
    }
    
  }

  isAnyTouched(): boolean {
    return Object.values(this.cardDetailsForm.controls).some(control => control.touched);
  }

  onFileSelected(event: Event): void {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files[0]) {
    //   this.selectedFile = input.files[0];
    // }
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Check file size (optional, limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB!');
        return;
      }

      // Check file type (optional)
      const validFileTypes = ['image/png', 'image/jpeg', 'image/gif'];
      if (!validFileTypes.includes(file.type)) {
        alert('Invalid file type! Please upload PNG, JPG, or GIF.');
        return;
      }

      // Create a FileReader to preview the image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoUrl = e.target?.result; // Set the preview image URL
      };
      reader.readAsDataURL(file);
      if (input.files && input.files[0]) {
        this.selectedFile = input.files[0];
      }
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      
      this.dashboardService.uploadImage(this.userId, this.selectedFile).subscribe({
        next: (response) => {
          this.photo = response[0];
          this.photoUrl = response[0].url
          this.snack.success('Upload successful');
        },
        error: (err) => {
          this.snack.success('Image upload failed');
        }
      });
    } else {
      alert('No file selected!');
    }
  }
  
  deleteImage(id:number)
  {
    console.log(id);
    if(id) {
      this.dashboardService.DeleteImage(id).subscribe({
        next: _ => {
          this.snack.success('Delete successful');
          this.photoUrl = "";
        }
      })
      
    } 
  }

  deleteCard(id:number)
  {
    if(id) this.dashboardService.DeleteCard(id);
  }

  openDialog() {
    this.dialog.open(PopupBoxComponent,{
      data: {
        qrData: this.qrData

      },
    });
  }
}
