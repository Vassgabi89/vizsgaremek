import { LoginService } from './../../service/login.service';
import { TicketService } from './../../service/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/model/bill';
import { Ticket } from 'src/app/model/ticket';
import { MyticketsService } from 'src/app/service/mytickets.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  signedIn = this.loginService.signedIn()
  myTicketList$ = this.myTicketService.getAll()
  myTicketList!: Ticket[]
  showBill: boolean = false
  myBill!: Bill

  constructor(
    private myTicketService: MyticketsService,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.myTicketList$.subscribe(tickets => {
      const user = sessionStorage.getItem('loginData')?.split('"').find(data => data.includes("@"))
      this.myTicketList = tickets.filter(ticket => ticket.user === user)
    })
  }

  onShowBill(id: string | undefined): void {
    this.myTicketService.getAllBill().subscribe(
      bills => {
        bills.forEach(bill => {
          if (bill.myTicketID === id) {
            this.myBill = bill
            return
          }
        });

        this.myTicketService.getAll().subscribe(tickets => {
          tickets.forEach(ticket => {
            if (ticket._id === this.myBill.myTicketID) {
              this.myBill.myTicket = ticket
              return
            }
          });

          this.userService.getAll().subscribe(users => {
            users.forEach(user => {
              if (this.myBill.userID === user._id) {
                this.myBill.user = user
                return
              }
            });
          })

          this.showBill = true
        }
        )
      }
    )
  }

}
