import { Ticket } from 'src/app/model/ticket';
import { User } from "src/app/model/user"

export class Bill {
  [key: string]: any
  _id?: string = ''
  passengers?: number = 1
  reducedFare?: number = 0
  fullPrice?: number = 5000
  userID: string | undefined =''
  myTicketID: string | undefined =''
  user?: User
  myTicket?: Ticket
}
