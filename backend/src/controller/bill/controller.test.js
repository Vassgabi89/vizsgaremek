const {
    mockRequest,
    mockResponse
} = require('jest-mock-req-res')
const createError = require('http-errors')
const controller = require('./controller');
const service = require('./service')

jest.mock('./service.js')

describe('Bill controller', () => {
    const mockData = [{
            "id": 1,
            "userID": "",
            "myTicketID": "",
            "passengers": 2,
            "reducedFare": 10,
            "fullPrice": 5000
        },
        {
            "id": 2,
            "userID": "",
            "myTicketID": "",
            "passengers": 1,
            "reducedFare": 10,
            "fullPrice": 3000
        },
        {
            "id": 3,
            "userID": "",
            "myTicketID": "",
            "passengers": 4,
            "reducedFare": 35,
            "fullPrice": 20000
        }
    ];

    let response
    const nextFunction = jest.fn()

    beforeEach(() => {
        service.__setMockData(mockData)
        response = mockResponse()
    })

    test('find a bill with valid id:', () => {
        const BILL_ID = 1
        const request = mockRequest({
            params: {
                id: BILL_ID
            }
        })

        return controller.findOne(request, response, nextFunction)
            .then(() => {
                expect(service.findOne).toBeCalledWith(BILL_ID)
                expect(response.json).toBeCalledWith(
                    mockData.find(user => user.id === BILL_ID))
            })

    })
})