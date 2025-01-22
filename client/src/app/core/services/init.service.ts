import { inject, Injectable } from '@angular/core';
import { forkJoin, of, tap } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
    providedIn: 'root'
})
export class InitService {
    private accountService = inject(AccountService);
    init() {
        return forkJoin({
            user : this.accountService.getUserInfo()
        })
    }


}