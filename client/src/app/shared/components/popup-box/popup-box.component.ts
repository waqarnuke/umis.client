import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  
} from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'app-popup-box',
  imports: [MatButtonModule,MatDialogContent,MatDialogActions,MatDialogClose,MatDialogTitle,QRCodeComponent],
  templateUrl: './popup-box.component.html',
  styleUrl: './popup-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupBoxComponent {
  readonly dialog = inject(MatDialog);
  data = inject(MAT_DIALOG_DATA);
  public qrCodeDownloadLink: SafeUrl = "";
  public url = "";
  
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
