const express = require('express');
let app = express.Router();
async function routers(){
    let productsApiFunctions =await require("../controllers/products");
    app.get('/products/:id',productsApiFunctions.getById);
    app.get('/products',productsApiFunctions.get );
    app.post('/products',productsApiFunctions.post);
    app.put('/products/:id',productsApiFunctions.put);
    app.delete('/products/:id',productsApiFunctions.delete);
}
routers();
module.exports = app;