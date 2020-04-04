"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('custom-env').env(process.env.APP_ENV);
var mongoose_1 = __importDefault(require("mongoose"));
var User = require('../En-Auto-Backend/models/UserModel');
var Devis = require('../En-Auto-Backend/models/DevisModel');
mongoose_1.default.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
//ici on drop 
mongoose_1.default.connection.collections['users'].drop();
mongoose_1.default.connection.collections['devis'].drop();

var user1 = new User({
    _id: 1,
    firstName: "Tomtom",
    lastName: "Tona",
    id_devis: 1,
    email: "tomtom@gmail.com",
    password: "@tom"
});
var devis1 = new Devis({
    id_devis: 1,
    cout_structure: 500,
    cout_acheminement: 400,
    prix_cuve: 150,
    conso: 100,
});
var user2 = new User({
    _id: 2,
    firstName: "Nana",
    lastName: "Tona",
    id_devis: 1,
    email: "nana@gmail.com",
    password: "@na"
});

User.create([user1, user2])
    .then(function (data) {
    console.log(data, "Populated (User)!");
}).catch(function (err) {
    console.log("Not Populated (User)...");
});
Devis.create([devis1])
    .then(function (data) {
    console.log(data, "Populated (Devis)!");
    mongoose_1.default.connection.close();
}).catch(function (err) {
    console.log("Not Populated (Devis) ...");
});
