import mongoose from 'mongoose';
//import { cpus } from 'os';

//Variables declaration 
const authenticatedUser = chai.request('../app');

var newUser = new User({
    first_name: "Iandraina",
    last_name = "Ravelomanana",
    password: '12345azerty',
    address: '12 Parvisde la Bièvre 92160 Antony',
    email:'iandraina.ravelomanana@edu.ece.fr'
});

const userCredentials = {
    email: 'iandraina.ravelomanana@edu.ece.fr',
    password : '12345azerty'
}

const db = mongoose.connection;

describe('Test connection', () => {
    Before((done) => {
        mongoose.connect('mongodb+srv://EnAuto:Enauto1234@en-auto-gdyqg.gcp.mongodb.net/test?retryWrites=true&w=majority')
        .then(() => {
            done();
        })
    });

    after((done) => {
        mongoose.connection.close();
        done();
    });

    //Test the users collection
    describe('New user test', () => {
        it('Add new user', (done) => {
            db.users.insert(newUser).then((doc) => {
                done();
            })
        });
    
        it('Get/Retrieve user', (done) => {
            db.users.findOne({first_name : 'Alexandre' , last_name : 'Loba'}).then((doc) => {
                chai.expect(doc).to.exist;
            })
        });
    
        it('Removes user',(done) => {
            db.users.remove({first_name: 'Iandraina', last_name:'Ravelomanana'}).then((doc) => {
                done();
            })
        })
    
        
    });
    

    //Test the devisDB collection
    describe('Devis test', () => {
        it('should find devis by id', (done) => {
            db.devisDB.findOne({id_devis : 3}).then((doc) => { //valeur mise au hasard [??]
                chai.expect(doc).to.exist;
            })
        }); 
    });   
    
    
    //Test the user login 
    before (function(done) {
        authenticatedUser
        .post('/login')
        .send(userCredentials)
        .end(function(err, response) {
            expect(response.statusCode).to.equal(200);
            expect('Location', '/home');
            done();
        });
    });
    
    //Authentication test
    describe('GET /profile', function(done) {
        it('should return a 200 response if the user is logged in', function(done) {
            authenticatedUser.get('/profile')
            .expect(200, done);
        });
    
        it('should return a 302 response and redirect to /login', function(done){
           request(app).get('/profile')
           .expect('Location', '/login')
           .expect(302, done);
         });
        
        
    });
    
});

module.exports = 'test_DB';