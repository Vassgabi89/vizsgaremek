const {
    mockRequest,
    mockResponse
} = require('jest-mock-req-res')
const createError = require('http-errors')
const controller = require('./controller');
const service = require('./service')

jest.mock('./service.js')

describe('Train controller', () => {
    const mockData = [
        {
            "id": 1,
            "name": "Trans-Siberian Express",
            "country": "Russia",
            "year": 1891,
            "description": "The Trans-Siberian Express built between 1891 to 1916 by order of the Russian Tsars Alexander III and his son Nicholas II, this largest railroad network in the world instantly became one of the most famous travel routes in the world. Connecting the main railway station in Moscow to the 9289km away city of Vladivostok, this impressive rail network became one of the easiest ways to travel across the vast expanses of Russia. Today, the trip from Moscow to Vladivostok on board the Trans-Siberian Express train “Rossiya” and “Golden Eagle” lasts 6 days and 4 hours, and the forked rail network at Ussuriysk enables the trains to travel further 3 days toward south, across the border of North Korea and straight to their capital of Pyongyang.",
            "pic": "../../../assets/img/trains/1.jpg"
          },
          {
            "id": 2,
            "name": "Orient Express",
            "country": "France",
            "year": 1883,
            "description": "Orient Express is without the doubt one of the most famous trains of all time. The real reason for its popularity lies in its level of service and the popular stories that were centered around it (most famously by a detective novel “Murder on the Orient Express” written by Agatha Christie). The train was built and maintained as one of the most premium railway trains in the world at that time, offering high-end service and comfort for wealthy and business passengers that traveled between cities of Paris and Istanbul (then known as Constantinople). The original route was maintained between 1883 and 1977, switching to the shorter trips between Paris and Vienna. Eventually, after its schedule covered shorter and shorter routes, the name Orient Express disappeared from the European train schedules on 14 December 2009.",
            "pic": "../../../assets/img/trains/2.jpg"
          },
          {
            "id": 3,
            "name": "Flying Scotsman",
            "country": "United Kingdom",
            "year": 1862,
            "description": "Flying Scotsman is the most famous train in Great Britain which connected the capitals of England and Scotland on a daily basis ever since 1862. During early decades, the travel time between London and Edinburgh was 10 and a half hours, but that time was eventually cut down by two hours. During the century and a half of service, this train line received many upgrades, with the latest modernization enabling it to finish its journey of 392 miles in just a 4 hours."
          },
    ];

    let response
    const nextFunction = jest.fn()

    beforeEach(() => {
        service.__setMockData(mockData)
        response = mockResponse()
    })

    test('find a train with valid id:', () => {
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