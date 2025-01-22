import { Component } from '@angular/core';
import {RouterLink } from '@angular/router';
import { LoginComponent } from '../account/login/login.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
