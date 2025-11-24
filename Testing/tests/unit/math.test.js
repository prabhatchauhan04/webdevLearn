const chai = require("chai");
const { it } = require("mocha");
const { product, divide } = require("../../maths/operations");

const { expect } = chai;

// this first argument is just a description of the test suite
// you can name it anything that helps you identify the suite
// the second argument is a callback function that contains the actual test cases
// each test case is defined using the 'it' function
// the first argument of 'it' is a description of the test case
// the second argument is a callback function that contains the test logic
// inside the test logic, we call the function we want to test and store the result
// then we use 'expect' to assert that the result matches our expectation
describe("Checking Basic Math operations", () => {
    it('Multiply 2 and 3', () => {
        let ans = product(2, 3);
        expect(ans).to.equal(6);
    })

    it('Divide 15 and 3', () => {
        let ans = divide(15, 3);
        expect(ans).to.equal(5);
    })
})
