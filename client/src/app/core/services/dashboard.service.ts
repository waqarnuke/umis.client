import { inject, Injectable,signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { cardDetail, photo } from '../../shared/models/card';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  appurl = environment.appUrl; //"https://dcmis.azurewebsites.net/api/" //"http://localhost:5002/api/";
  private http = inject(HttpClient);
  card = signal<cardDetail | null>(null);  

  getcarddetail(userId : string){

    let params = new HttpParams()
                    .set('userId',userId)
    return this.http.get<cardDetail>(this.appurl + 'carddetail/GetByUserId',{params});
  }

  CreateCard(values : any){
    return this.http.post(this.appurl + 'carddetail', values);
  }

  UpdateCard(id:number , values : any){
    let params = new HttpParams()
                    .set('id',id)
                    console.log(id)
                    console.log(values)
    return this.http.put(this.appurl + 'carddetail/'+id, values);
  }

  uploadImage(userId:string, file: File): Observable<any> {
    let params = new HttpParams()
                    .set('userId',userId)
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<photo>(this.appurl + 'carddetail/addphoto' , formData, { params });
  }

  DeleteImage(id:number)
  {
    return this.http.delete(this.appurl + 'carddetail/deletephoto/' + id).pipe(
    );
  }
 
  CreateQRCode(userId:string)
  {
    let params = new HttpParams()
                    .set('userId',userId)
    return this.http.post(this.appurl + 'carddetail/CreateQRCode', { params });                
  }

  DeleteCard(id:number)
  {
    return this.http.delete(this.appurl + 'carddetail/' + id)
  }
}
