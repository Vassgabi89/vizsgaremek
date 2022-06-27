import { TrainService } from './train.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../model/ticket';
import { Train } from '../model/train';
import { VariableBinding } from '@angular/compiler';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  apiUrl: string = environment.apiUrl
  entityName: string = 'tickets'

  constructor(
    private http: HttpClient,
    private trainService: TrainService,
  ) { }

  get(id: string): Observable<Ticket> {
    const ticket = this.http.get<Ticket>(`${this.apiUrl}/${this.entityName}/${id}`)
    return ticket
  }

  getAll(): Observable<Ticket[]> {
    const tickets = this.http.get<Ticket[]>(`${this.apiUrl}/${this.entityName}`)
    const trains = this.trainService.getAll()
    const ticketsWithTrains = forkJoin([tickets, trains]).pipe(
      map(([ticketlist, trainlist]) => {
        ticketlist.map((ticket) => {
          const train = trainlist.find((train) => train._id === ticket.trainID) || new Train()
          ticket.train = train
        })
        return ticketlist
      }
      )
    )
    return ticketsWithTrains

  }

  create(ticket: Ticket): Observable<any> {
    delete ticket._id;
    return this.http.post<any>(`${this.apiUrl}/${this.entityName}`, ticket)
  }

  update(ticket: Ticket): Observable<any> {
    const id = ticket._id;
    delete ticket._id;
    return this.http.patch<any>(`${this.apiUrl}/${this.entityName}/${id}`, ticket)
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.entityName}/${id}`)
  }

  saveBill(bill: Bill): Observable<any> {
    delete bill._id;
    return this.http.post<any>(`${this.apiUrl}/bills`, bill)
  }

}
