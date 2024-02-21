const express = require('express');
let app = express.Router();
async function routers(){
    let categoriesApiFunctions =await require("../controllers/categories");
    app.get('/categories/:id',categoriesApiFunctions.getById);
    app.get('/categories',categoriesApiFunctions.get );
    app.post('/categories',categoriesApiFunctions.post);
    app.put('/categories/:id',categoriesApiFunctions.put);
    app.delete('/categories/:id',categoriesApiFunctions.delete);
}
routers();
module.exports = app;