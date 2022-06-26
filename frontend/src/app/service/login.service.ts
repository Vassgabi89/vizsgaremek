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

    //Session storage vizsgálata, hogy van-e felhasználó (be vagyunk-e lépve)
    if (this.signedIn()) {
      const loginObject = JSON.parse(this.signedIn().toString());
      this.access_token$.next(loginObject.accessToken); //beleteszem az access_token$-t a loginObject.accessToken-be
      this.user$.next(loginObject.user); //beleteszem a user$-t a loginObject.user-be
    }

    this.user$.subscribe({ //változás esetén.. .belépésnél a tickets, kilépésnél loginra irányít
      next: user => {
        if (user) {
          this.router.navigate(['tickets']);
        } else {
          this.router.navigate(['/', 'login']);
          this.access_token$.next(''); //ürítjük az accesstokent
          sessionStorage.removeItem('loginData');
        }
      }
    });
  }

  //A belépés gombra kattintva http kérés megy a backendre, ahonnan - ha sikeres volt az azonosítás - választ kapunk, amely tartalmazza a usert és pawwordot
  login(loginData: ILoginData): void {
    this.http.post<IAuthModel>(`${this.apiUrl}/${this.entityName}`, loginData).subscribe({
      next: (response: IAuthModel) => {
        this.user$.next(response.user);
        this.access_token$.next(response.accessToken);
        sessionStorage.setItem('loginData', JSON.stringify(response)); //ezeket mentjük ki session storage-be
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
