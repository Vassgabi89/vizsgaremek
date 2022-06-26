const {
    mockRequest,
    mockResponse
} = require('jest-mock-req-res')
const createError = require('http-errors')
const controller = require('./controller');
const service = require('./service')

jest.mock('./service.js')

describe('Ticket controller', () => {
    const mockData = [
        {
            "id": 1,
            "departure_location": "Buliu",
            "arrival_location": "Puan",
            "departure_date": "06/01/2022",
            "departure_time": "6:49 AM",
            "travel_time": "13:54",
            "arrival_date": "02/12/2022",
            "arrival_time": "1:47 PM",
            "transfers": 3,
            "class": 1,
            "price": 5234
          },
          {
            "id": 2,
            "departure_location": "Matou",
            "arrival_location": "Kumane",
            "departure_date": "04/23/2022",
            "departure_time": "12:40 PM",
            "travel_time": "5:58",
            "arrival_date": "10/14/2021",
            "arrival_time": "3:07 AM",
            "transfers": 2,
            "class": 1,
            "price": 13447
          },
          {
            "id": 3,
            "departure_location": "Khuean Ubonrat",
            "arrival_location": "San Lucas Sacatepéquez",
            "departure_date": "11/06/2022",
            "departure_time": "3:32 AM",
            "travel_time": "10:55",
            "arrival_date": "07/04/2021",
            "arrival_time": "5:24 AM",
            "transfers": 3,
            "class": 2,
            "price": 49115
          },
    ];

    let response
    const nextFunction = jest.fn()

    beforeEach(() => {
        service.__setMockData(mockData)
        response = mockResponse()
    })

    test('find a ticket with valid id:', () => {
        const ENTITY_ID = 1
        const request = mockRequest({
            params: {
                id: ENTITY_ID
            }
        })

        return controller.findOne(request, response, nextFunction)
            .then(() => {
                expect(service.findOne).toBeCalledWith(ENTITY_ID)
                expect(response.json).toBeCalledWith(
                    mockData.find(user => user.id === ENTITY_ID))
            })

    })
})