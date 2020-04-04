const mongoose = require('mongoose');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
var assert = require('assert');
const UserModel = require('../models/UserModel');
const DevisModel = require('../models/DevisModel');

//Variables declaration 
chai.use(chaiHttp);
const authenticatedUser = chai.request('../app');
const User_Test = mongoose.model('User');
const Devis_Test = mongoose.model('Devis');
const idUser = mongoose.Types.ObjectId;

var newUser = new User_Test({
    firstName: "Test",
    lastName: "TestTest",
    email:'test@test.fr'
});
newUser.setPassword("azerty123");

var newDevis = new Devis_Test({
    address : "37 quai de Grenelle",
    code_postal : 75015,
    id_user: idUser,
    routing_cost : 100,
    tank_cost: 100
})

const userCredentials = {
    email: 'iandraina.ravelomanana@edu.ece.fr',
    password : '12345azerty'
}

describe('Test Data Base', () => {
    before((done) => {
        mongoose.connect('mongodb+srv://EnAuto:Enauto1234@en-auto-gdyqg.gcp.mongodb.net/test?retryWrites=true&w=majority')
        .then(() => {
            console.log("Connected to the data base successfully!");
            done();
        })
    });

    after((done) => {
        mongoose.connection.close();
        console.log("Closed!")
        done();
    });

    //Test the users collection
    describe('User test', () => {
        it('should add a new user', (done) => {
            User_Test.insert(newUser).then((doc) => {
                expect(nullValue).to.exist;
                done();
            })
        });
    
        it('should get/retrieve a user', (done) => {
            User_Test.find({email:'test@test.fr'}).then((doc) => {
                expect(doc).to.exist;
                done();
            })
        });
    
        it('should remove a user',(done) => {
            User_Test.findByIdAndRemove({_id:newUser._id}).
            then(() => User_Test.findOne({email:'test@test.fr'}))
            .then((userTest) => {
                assert(userTest === null);
                done();
            });
        })
    });
    
    //Test the devisDB collection
    describe('Devis test', () => {
        it('should create new devis', (done) => {
            User_Test.insert(newDevis).then(() => {
                expect(nullValue).to.exist;
                done();
            })
        });

        it('should find devis by id', (done) => {
            Devis_Test.find({_id : newDevis._id}).then((doc) => {
                expect(doc).to.exist;
                done();
            })
        });
        
        it('should remove devis by id',(done) => {
            Devis_Test.findByIdAndRemove({_id:newDevis._id}).
            then(() => Devis_Test.findOne({_id:newDevis._id}))
            .then((devisTest) => {
                assert(devisTest === null);
                done();
            });
        })
    });   
    
    // //Test the user login 
    // before (function(done) {
    //     authenticatedUser
    //     .post('/login')
    //     .send(userCredentials)
    //     .end(function(err, response) {
    //         expect(response.statusCode).to.equal(200);
    //         expect('Location', '/home');
    //         done();
    //     });
    // });
    
    // //Authentication test
    // describe('GET /profile', function(done) {
    //     it('should return a 200 response if the user is logged in', function(done) {
    //         authenticatedUser.get('/profile')
    //         .expect(200, done);
    //     });
    
    //     it('should return a 302 response and redirect to /login', function(done){
    //        request(app).get('/profile')
    //        .expect('Location', '/login')
    //        .expect(302, done);
    //      });
    // });
});
module.exports = 'test_DB';