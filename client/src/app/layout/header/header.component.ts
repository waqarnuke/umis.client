import { Component, inject } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton,MatButtonModule} from '@angular/material/button';
import { AccountService } from '../../core/services/account.service';
import { MatMenu, MatMenuTrigger,MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { BusyService } from '../../core/services/busy.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatButton,
    MatButtonModule,
    MatMenuTrigger,
    MatMenu,
    RouterLink,
    MatProgressBar,
    MatMenuModule,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  accountService = inject(AccountService)
  private router = inject(Router);
  busyService = inject(BusyService);
  isMenuOpen = false; // Track menu state

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout()
  {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/');
      }
    })
  }
}
