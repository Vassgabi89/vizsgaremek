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
    //ticket.subscribe(d => console.log(d))
    return ticket
  }

  getAll(): Observable<Ticket[]> {
    const tickets = this.http.get<Ticket[]>(`${this.apiUrl}/${this.entityName}`)
    //tickets.subscribe(d => console.log(d))
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
  /*
    override getAll(): Observable<Order[]> {
      const allCustomer$ = this.customerService.getAll();
      const allProduct$ = this.productService.getAll();

      const allFullOrder$ = forkJoin([allOrder$, allProduct$, allCustomer$]).pipe(
        map(([orderList, productList, customerList]) => {
          orderList.map((order) => {
            const product =
              productList.find((product) => product.id === order.productID * 1) ||
              new Product();
            const customer =
              customerList.find(
                (customer) => customer.id === order.customerID * 1
              ) || new Customer();
            order.product = new Product(product);
            order.customer = new Customer(customer);
            //order.customerID = order.customerID * 1;
            //order.productID = order.productID * 1;
            //console.log(order);
          });
          return orderList;
        })
      );

      return allFullOrder$;
    }*/


  create(ticket: Ticket): Observable<any> {
    delete ticket._id;
    return this.http.post<any>(`${this.apiUrl}/${this.entityName}`, ticket)
  }

  update(ticket: Ticket): Observable<any> { //törölnünk kell az id-t, mert azt nem kell elküldeni
    const id = ticket._id; //id törlés előtt kimentem
    delete ticket._id; //egyszerű törlés objektumból (a modellben az _id-t opcionálissá kell tenni)
    //console.log(ticket);
    return this.http.patch<any>(`${this.apiUrl}/${this.entityName}/${id}`, ticket)
  }

  delete(id: string | number): Observable<any> {
    //console.log('törlök');
    //console.log(id);
    return this.http.delete<any>(`${this.apiUrl}/${this.entityName}/${id}`)
  }

  saveBill(bill: Bill): Observable<any> {
    delete bill._id;
    return this.http.post<any>(`${this.apiUrl}/bills`, bill)
  }

}
