const express = require('express'); 
const bodyParser = require('body-parser')
const products = require('./routers/products'); 
const categories = require('./routers/categories');  
const writeLog=require('./middlewares/writetoLog');
const errorHandler=require('./middlewares/errorshandler');
const cors=require('cors');
const auth=require('./middlewares/auth');
const login=require('./routers/users');
const app = express(); 

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(login);
app.use(auth);
app.use(writeLog);
app.use(errorHandler);
app.use(products);
app.use(categories) ;


app.listen(3000, () => { 
    console.log("listening on http://localhost:3000"); 
});