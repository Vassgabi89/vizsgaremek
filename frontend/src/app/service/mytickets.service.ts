import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from '../model/bill';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class MyticketsService {

  apiUrl: string = environment.apiUrl
  entityName: string = 'mytickets'

  constructor(
    private http: HttpClient
  ) { }

  get(id: string): Observable<Ticket> {
    const ticket = this.http.get<Ticket>(`${this.apiUrl}/${this.entityName}/${id}`)
    return ticket
  }

  getAll(): Observable<Ticket[]> {
    const tickets = this.http.get<Ticket[]>(`${this.apiUrl}/${this.entityName}`)
    return tickets
  }

  create(ticket: Ticket): Observable<any> {
    delete ticket._id;
    return this.http.post<any>(`${this.apiUrl}/${this.entityName}`, ticket)
  }

  getBill(id: string | undefined): Observable<Bill> {
    const bill = this.http.get<Bill>(`${this.apiUrl}/bills/${id}`)
    return bill
  }

  getAllBill(): Observable<Bill[]> {
    const bills = this.http.get<Bill[]>(`${this.apiUrl}/bills`)
    return bills
  }

}
