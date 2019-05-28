const restAPI = require('../../service/restAPI');
const testBase = 'http://dummy.restapiexample.com/api/v1';
const testPath = 'employees';

const testRestAPI = new restAPI();

describe('restAPI Test', () => {
    test('RestAPI class exporting', () => {
        expect(restAPI).toBeDefined()
        expect(testRestAPI).toBeDefined()
    })

    test('RestAPI class exporting', () => {
        testRestAPI.buildURI(testBase, testPath)
        .then(res => expect(res).toBe('http://dummy.restapiexample.com/api/v1/employees'))
    })
    
    test('RestAPI class exporting', () => {
        testRestAPI.get(testBase, testPath)
        .then(res => {
            expect(res).toBeDefined()
            expect(res[0]).toBeDefined()
            expect(res[0].id).toBeDefined()
            expect(res[0].employee_name).toBeDefined()
        })
    })    
})
