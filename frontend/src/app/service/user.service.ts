import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = environment.apiUrl
  entityName: string = 'users'

  constructor(
    private http: HttpClient
  ) { }

  get(id: string): Observable<User> {
    const user = this.http.get<User>(`${this.apiUrl}/${this.entityName}/${id}`)
    //user.subscribe(d => console.log(d))
    return user
  }

  getAll(): Observable<User[]> {
    const users = this.http.get<User[]>(`${this.apiUrl}/${this.entityName}`)
    return users
  }

  create(user: User): Observable<any> {
    delete user._id;
    return this.http.post<any>(`${this.apiUrl}/${this.entityName}`, user)
  }

  update(user: User): Observable<any> {
    const id = user._id;
    delete user._id;
    //console.log(user);
    return this.http.patch<any>(`${this.apiUrl}/${this.entityName}/${id}`, user)
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.entityName}/${id}`)
  }

}
