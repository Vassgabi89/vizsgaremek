import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Train } from '../model/train';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  apiUrl: string = environment.apiUrl
  entityName: string = 'trains'

  constructor(
    private http: HttpClient
  ) { }

  get(id: string | number): Observable<Train> {
    const train = this.http.get<Train>(`${this.apiUrl}/${this.entityName}/${id}`)
    return train
  }

  getAll(): Observable<Train[]> {
    const datas = this.http.get<Train[]>(`${this.apiUrl}/${this.entityName}`)
    /*datas.subscribe(
      trains => {
        trains.forEach(train => {
          train.pic= (`../../assets/img/trains/${train._id}.jpg`)
      })
      console.log(trains);
      }
    )
    */
    return datas
  }

  create(train:Train): Observable<any> {
    //console.log('new train');
    //console.log(train);
    delete train._id;
    return this.http.post<any>(`${this.apiUrl}/${this.entityName}`, train)
  }

  update(train:Train): Observable<any> {
    const id = train._id;
    delete train._id;
    return this.http.patch<any>(`${this.apiUrl}/${this.entityName}/${id}`, train)
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.entityName}/${id}`)
  }
}
