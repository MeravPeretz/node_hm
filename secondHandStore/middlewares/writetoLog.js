const express = require('express');
let app = express.Router();

const Time=(req, res, next) => {
    console.log('Time:', new Date())
    next()};
const Url=(req,res,next)=>{
    console.log("Url:",req.url)
    next();
}
async function routers(){
 app.use(Time);
 app.use(Url);
}
routers();
module.exports = app;