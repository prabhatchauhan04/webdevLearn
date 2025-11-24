const chai = require("chai");
const { it } = require("mocha");
const chaiHttp = require('chai-http');
const app = require("../../app");
const { default: mongoose } = require("mongoose");
const User = require("../../models/User");

/*
# 🟥 **Mocha (Test Runner)**
Mocha is used to **run tests** and **organize** them.
* Provides: `describe()`, `it()`, `before()`, `after()`
* Handles async code
* Runs and reports test results
👉 **Mocha = runs your tests**
# 🟦 **Chai (Assertion Library)**
Chai is used to **check if the output is correct**.
* Provides: `expect()`, `assert()`, `should()`
* Compares values, objects, types, properties
* With plugins (like chai-http) it tests API responses
👉 **Chai = checks your test results**
# 🎯 Ultra short:
**Mocha = test runner
Chai = test checker (assertions)**
*/
/*
Before using chai-http:
❌ You cannot call API routes
❌ You cannot make HTTP requests
❌ You cannot check response status/body
After using chai-http:
✅ chai.request(app) becomes available
*/
const { expect } = chai;
chai.use(chaiHttp);

describe("Checking Backend APIs", () => {
    it('GET request at /hello', async () => {
        let response = await chai.request(app).get("/hello");
        expect(response.text).to.be.a('string')
        expect(response.text).to.equal('hello');
    })

    it('GET request at /world', async () => {
        let response = await chai.request(app).get("/world");
        expect(response.text).to.be.a('string')
        expect(response.text).to.equal('world');
    })

    it('GET request at /user', async () => {
        let res = await chai.request(app).get("/user");
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property("email");
        expect(res.body).to.have.property("password");
        expect(res.body).to.have.property("name");
    })
})


describe("Checking Database and API", () => {

    // Runs ONCE before ALL tests inside this describe block
    // Used to connect to a test MongoDB database
    before(async function () {
        const uri = "mongodb://localhost:27017/test";   // test DB URL
        await mongoose.connect(uri);                    // connect to DB
    });

    // Runs BEFORE EACH test (currently commented)
    // Useful when multiple tests need a clean User collection every time
    // beforeEach(async function () {
    //     await User.deleteMany({});                    // removes all users
    // });

    // Runs AFTER EACH test (currently commented)
    // Used for cleanup if needed (e.g., clearing other collections)
    // afterEach(async function () {
    //     // can reset other collections if needed
    // });

    // Runs ONCE after ALL tests finish
    // Deletes the test database to keep environment clean
    // Then closes the MongoDB connection
    after(async function () {
        await mongoose.connection.dropDatabase();       // remove test DB
        await mongoose.connection.close();              // close connection
    });

    // This is the actual test case
    it("Checking Entry in DB", async () => {

        // Insert a user directly into the database
        // This simulates data that would exist before making the API call
        let user = await User.create({
            name: 'prabhat',
            email: 'prabhat@codingblocks.com',
            password: 'password'
        })

        // Make a GET request to your API using chai-http
        // This simulates a real client hitting the /checkuser route
        let res = await chai.request(app).get(`/checkuser?email=${user.email}`);

        // Basic response checks
        expect(res).to.have.status(200);                // API must return 200 OK
        expect(res.body).to.be.an("object");            // response must be an object

        // Checking if API returns correct fields
        expect(res.body).to.have.property("email", user.email);  // email must match DB
        expect(res.body).to.have.property("password");           // password must exist
        expect(res.body).to.have.property("name");               // name must exist

    })
});

