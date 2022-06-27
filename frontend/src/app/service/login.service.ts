import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

export interface IAuthModel {
  success: boolean;
  accessToken: string;
  user: User,
}

export interface ILoginData {
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = environment.apiUrl
  entityName: string = 'login'

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null); //a behaviorSubject olyan promise, aminek az utolsó állapotát akkor is lekérdezhetjük, ha nem vagyunk rá feliratkozva

  access_token$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    if (this.signedIn()) {
      const loginObject = JSON.parse(this.signedIn().toString());
      this.access_token$.next(loginObject.accessToken);
      this.user$.next(loginObject.user);
    }

    this.user$.subscribe({
      next: user => {
        if (user) {
          this.router.navigate(['tickets']);
        } else {
          this.router.navigate(['/', 'login']);
          this.access_token$.next('');
          sessionStorage.removeItem('loginData');
        }
      }
    });
  }

  login(loginData: ILoginData): void {
    this.http.post<IAuthModel>(`${this.apiUrl}/${this.entityName}`, loginData).subscribe({
      next: (response: IAuthModel) => {
        this.user$.next(response.user);
        this.access_token$.next(response.accessToken);
        sessionStorage.setItem('loginData', JSON.stringify(response));
      },
      error: (err) => console.error(err)
    });
  }

  logout(): void {
    this.user$.next(null);
  }

  signedIn(): string | boolean {
    const loginInfo = sessionStorage.getItem('loginData');
    if (loginInfo) return loginInfo
      else return false
  }


}
