import { LoginService } from './../../service/login.service';
import { UserService } from './../../service/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/model/ticket';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  signedIn = this.loginService.signedIn()
  userList$ = this.userService.getAll()

  sortKey: string = ''
  sortDirection: string = 'A...Z'
  clickCounter: number = 0

  searchKey: string = 'arrival_location'
  keyword: any = ''
  keywordMin: string = ''
  keywordMax: string = ''

  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
  }

  sorting(key: string, key2?: string): void {
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
    if (ticket._id !== undefined) this.userService.delete(ticket._id).subscribe(
      datas => location.reload()
    )
  }
}
