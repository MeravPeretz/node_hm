const express = require('express');
let app = express.Router();
async function routers(){
 app.use((req, res, next) => {
    if((req.method==="POST"||req.method==="PUT")&&Object.keys(req.body).length === 0){
        res.status(400).send("not correct request");
    }
    next();
});
}
routers();
module.exports = app;