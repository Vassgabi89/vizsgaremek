import { UserService } from 'src/app/service/user.service';
import { Bill } from './../../model/bill';
import { MyticketsService } from './../../service/mytickets.service';
import { LoginService } from 'src/app/service/login.service';
import { TicketService } from './../../service/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/model/ticket';
import { TrainService } from 'src/app/service/train.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  signedIn = this.loginService.signedIn() //lehet rövidíteni, nem kell a típust megadni, tudja

  ticketList$ = this.ticketService.getAll()
  trainList$ = this.trainService.getAll()

  myTicket!: Ticket
  showTicketDetail: boolean = false
  myBill: Bill = new Bill()

  sortKey: string = ''
  sortDirection: string = 'A...Z'
  clickCounter: number = 0

  searchKey: string = 'arrival_location'
  keyword: any = ''
  keywordMin: string = ''
  keywordMax: string = ''

  constructor(
    private ticketService: TicketService,
    private trainService: TrainService,
    private router: Router,
    private loginService: LoginService,
    private myTicketService: MyticketsService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("myTrainID")) {
      this.searchKey = 'train'
      const id = localStorage.getItem("myTrainID")?.toString()
      if (id !== undefined) {
        this.trainService.get(id).subscribe(
          train => this.keyword = train.name
        )
        setTimeout(() => {
          localStorage.removeItem("myTrainID")
        }, 500);
      }
    }
  }

  sorting(key: string, key2?: string): void {
    //if (key2) key=key.concat(' ').concat(key2)
    key === this.sortKey ? this.clickCounter++ : (this.clickCounter = 0);
    this.sortDirection = this.clickCounter % 2 ? 'Z...A' : 'A...Z';
    this.sortKey = key;
  }

  clearKeyword(): void {
    this.keyword = ''
  }

  clearKeywordMinMax(): void {
    this.keywordMin = ''
    this.keywordMax = ''
  }

  onDelete(ticket: Ticket): void {
    if (!confirm('Are you sure')) return
    if (ticket._id !== undefined) this.ticketService.delete(ticket._id).subscribe(
      //datas => console.log(datas)
      datas => location.reload()
    )
    //location.reload()
  }

  onSelect(ticket: Ticket): void {
    this.myTicket = ticket
    this.showTicketDetail = true
    this.myTicket.passengers = 1
    this.myTicket.reducedFare = 10
    this.myTicket.fullPrice = Math.round(this.myTicket.price * this.myTicket.passengers * (1 - this.myTicket.reducedFare / 100))
    this.myTicket.user = sessionStorage.getItem('loginData')?.split('"').find(data => data.includes("@"))
  }

  calcFullPrice(): void {
    if (this.myTicket.passengers && this.myTicket.reducedFare)
      this.myTicket.fullPrice = Math.round(this.myTicket.price * this.myTicket.passengers * (1 - this.myTicket.reducedFare / 100))
  }

  buyTicket(): void {
    /*
    const ticketCookie = document.cookie.split('; ').find(cookie => cookie.startsWith(`myTickets=`))
    //if (!ticketCookie) document.cookie = `myTickets= ${ticket.departure_location}---${ticket.arrival_location}---${ticket.departure_date}---${ticket.departure_time}---${ticket.travel_time}---${ticket.arrival_date}---${ticket.arrival_time}---${ticket.transfers}---${ticket.class}---${ticket.services}---${ticket.train?.name}---${ticket.price}---${ticket.passengers}---${ticket.reducedFare}---${ticket.fullPrice}!!!; expires=Fri, 30 Dec 2022 20:00:00 UTC;`
    //else {
      const myTickets = ticketCookie?.concat(` ${ticket.departure_location}---${ticket.arrival_location}---${ticket.departure_date}---${ticket.departure_time}---${ticket.travel_time}---${ticket.arrival_date}---${ticket.arrival_time}---${ticket.transfers}---${ticket.class}---${ticket.services}---${ticket.train?.name}---${ticket.price}---${ticket.passengers}---${ticket.reducedFare}---${ticket.fullPrice}!!!;`)
      //document.cookie = `myTickets = ${myTickets}; expires = Fri, 30 Dec 2022 20:00:00 UTC`
      document.cookie = `myTickets = ${myTickets}; expires = Fri, 30 Dec 2022 20:00:00 UTC`
      //console.log(ticket.departure_date)
    //}
    this.router.navigateByUrl('mytickets')*/
    this.myBill.passengers = this.myTicket.passengers
    this.myBill.reducedFare = this.myTicket.reducedFare
    this.myBill.fullPrice = this.myTicket.fullPrice

    this.userService.getAll().subscribe(users => {
      users.forEach(user => {
        if (user.email === this.myTicket.user) {
          this.myBill.userID = user._id
          return
        }
      });
      /*
       this.myBill.userID = users.find(user=> {
        user.email === this.myTicket.user})._id
      */


      //console.log('myTicket');
      //console.log(this.myTicket);

      this.myTicketService.create(this.myTicket).subscribe(
        savedTicket => {
          this.myBill.myTicketID = savedTicket._id
          //console.log('myBill');
          //console.log(this.myBill);

          this.ticketService.saveBill(this.myBill).subscribe(
            datas => {
              this.router.navigateByUrl('mytickets')
            })
        })
    })
  }
}
