import { Component, inject } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { cardDetail } from '../../shared/models/card';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { PhonePipe } from '../../shared/pipes/PhonePipe';



@Component({
  selector: 'app-profile',
  imports: [TitleCasePipe,PhonePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  acitvateRoute = inject(ActivatedRoute);
  dashboardService = inject(DashboardService);
  cardDetail?: cardDetail;
  
  constructor() { }

  ngOnInit() {
    this.loadCard();
  }

  loadCard(){
    const id = this.acitvateRoute.snapshot.paramMap.get('id')
    if(id) this.dashboardService.getcarddetail(id).subscribe({
      next: card => {
        this.cardDetail = card
      },
      error:error => console.log(error)
    });
  }
}
