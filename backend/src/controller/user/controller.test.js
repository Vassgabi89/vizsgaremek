const {
    mockRequest,
    mockResponse
} = require('jest-mock-req-res')
const createError = require('http-errors')
const controller = require('./controller');
const service = require('./service')

jest.mock('./service.js')

describe('User controller', () => {
    const mockData = [
       {
        "id": 1,
       "first_name": "Charlie",
      "last_name": "Firpo",
      "email": "seyden0@merriam-webster.com",
      "password": "$2a$10$G6MvO41/2aIVLmu5yGeNZevONGRgrk71kVCvw5ttCkI/1rBXn0DTa",
      "role": "3"
       },
       {
        "id": 2,
       "first_name": "Nickey",
      "last_name": "Trit",
      "email": "ntyt2@psu.edu",
      "password": "$2a$10$PZ6nt1dmesINUHBr8QS54ucQp118Yp4M2OHEEby8NwLVUM5CiQs46",
      "role": "1"
       },
       {
        "id": 3,
       "first_name": "Berti",
      "last_name": "Farthing",
      "email": "bfarthing4@nymag.com",
      "password": "$2a$10$XbQqtON.YsCAXZqbQFyVWuSKxF88tTpMOqM9mSlmNLUlWCoL6.jbG",
      "role": "2"
       },
    ];

    let response
    const nextFunction = jest.fn()

    beforeEach(() => {
        service.__setMockData(mockData)
        response = mockResponse()
    })

    test('find a user with valid id:', () => {
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