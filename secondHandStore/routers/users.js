const express = require('express');
let app = express.Router();
async function routers(){
    let usersApiFunctions =await require("../controllers/users");
    app.post("/sign-up",usersApiFunctions.signUp);
    app.post("/login",usersApiFunctions.login);
}
routers();
module.exports = app;