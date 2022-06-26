import { LoginService } from 'src/app/service/login.service';
import { TicketService } from './../../service/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  signedIn = this.loginService.signedIn()
  ticketList$ = this.ticketService.getAll()
  user$ = this.loginService.user$;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }


}
