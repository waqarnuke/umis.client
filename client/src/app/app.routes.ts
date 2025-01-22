import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './features/account/login/login.component';
import { RegisterComponent } from './features/account/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { ContactUsComponent } from './features/contact-us/contact-us.component';
import { DashBoardComponent } from './features/dash-board/dash-board.component';
import { authGuard } from './core/guard/auth.guard';
import { ProfileComponent } from './features/profile/profile.component';
import { AccountService } from './core/services/account.service';
import { TestErrorComponent } from './features/test-error/test-error.component';

export const routes: Routes = [
    {path : '', component:HomeComponent},
    {path : 'Home', component:HomeComponent},
    {path : 'dash-board', component:DashBoardComponent , canActivate:[authGuard]},
    {path : 'about-us', component:AboutUsComponent, canActivate:[authGuard]},
    {path : 'contact-us', component:ContactUsComponent,canActivate:[authGuard]},
    {path : 'profile', component:ProfileComponent},
    {path : 'profile/:id', component:ProfileComponent},
    {path : 'account/login' ,component:LoginComponent},
    {path : 'account/register' ,component:RegisterComponent},
    {path : 'test-error' ,component:TestErrorComponent},
    {path : '**', redirectTo: '' , pathMatch:'full'},
];
