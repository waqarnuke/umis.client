import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Address, User } from '../../shared/models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.umisUrl;
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);   

  login(values:any){
    let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<User>(this.baseUrl + 'login', values,{params});
  }
  
  registerUser(values : any){
    return this.http.post(this.baseUrl + 'account/register', values);
  }
  
  getUserInfo(){
    return this.http.get<User>(this.baseUrl + 'account/user-info').pipe(
      map(user => {
        console.log(user)
        this.currentUser.set(user);
        return user;
      })
    )
    // return this.http.get<User>(this.baseUrl + 'account/user-info', {withCredentials:true}).subscribe({
    //   next: user => console.log(user) //user => this.currentUser.set(user)
    // })

    // this.http.get<User>(`${this.baseUrl}account/user-info`, { withCredentials: true }).subscribe({
    //   next: (user) => {
    //     console.log(user); // Log the user data or handle it appropriately
    //     // Optionally, set it in your service state
    //     // this.currentUser.set(user);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching user info:', err); // Handle errors
    //   },
    //   complete: () => {
    //     console.log('Request completed'); // Optional logging
    //   }
    // });
    
  }
  
  logout(){
    return this.http.post(this.baseUrl + 'account/logout', {});
  }

  updateAddress(address:Address){
    return this.http.post(this.baseUrl + 'account/address', address);
  }

  getAuthState(){
    return this.http.get<{isAuthenticated: Boolean}>(this.baseUrl + 'account/auth-status' );
  }
}
