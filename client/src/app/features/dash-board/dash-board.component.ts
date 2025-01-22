import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { UserDetailComponent } from '../card-detail/user-detail.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { BusyService } from '../../core/services/busy.service';
import { ActivatedRoute } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Location  } from '@angular/common';
import { SafeUrl } from '@angular/platform-browser';
import {
  MatDialog,
} from '@angular/material/dialog';
import { PopupBoxComponent } from '../../shared/components/popup-box/popup-box.component';

@Component({
  selector: 'app-dash-board',
  imports: [
    UserDetailComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
})
export class DashBoardComponent implements OnInit {
  busyService = inject(BusyService);
  accountService = inject(AccountService);
  dashboardService = inject(DashboardService);
  private activatedRoute= inject(ActivatedRoute);
  private location = inject(Location);
  readonly dialog = inject(MatDialog);

  userId : any;
  user :any;
  qrData: string = ''; // The data to encode in the QR code
  showQRCode: boolean = false;
  
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  domain: string = '';

  constructor () {
    this.myAngularxQrCode = 'Your QR code data string';
  }

  ngOnInit(): void {
    this.domain = window.location.origin; // Get the domain URL
    console.log('Domain URL:', this.domain);
    this.userId = this.accountService.currentUser()?.id;
    this.qrData =this.domain +'/profile/'+ this.userId 
  }


  openDialog() {
    this.dialog.open(PopupBoxComponent,{
      data: {
        qrData: this.qrData

      },
    });
  }
}

