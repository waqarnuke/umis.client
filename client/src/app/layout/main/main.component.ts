import { Component } from '@angular/core';
import { LoginComponent } from '../../features/account/login/login.component';

@Component({
  selector: 'app-main',
  imports: [LoginComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
