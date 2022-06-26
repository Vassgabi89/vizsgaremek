import { Train } from 'src/app/model/train';
export class Ticket {
  [key: string]: any
  _id?: string = ''
  trainID: string = ''
  train?: Train = new Train()

  departure_location: string = ''
  arrival_location: string = ''

  departure_date: Date = new Date()
  departure_time: string = '12:00 AM'
  travel_time?: string = '00:00'
  arrival_date?: Date = new Date()
  arrival_time?: string = '12:00 PM'

  transfers: number = 0
  class: number = 1
  services?: string = 'seat reservation'

  price: number = 5000

  passengers?: number = 1
  reducedFare?: number = 0
  fullPrice?: number = 5000
  user: string | undefined =''
}
