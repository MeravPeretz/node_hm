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
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://merav00037:jXBIJJ2dbi0EFP7T@cluster0.ezx7b4c.mongodb.net/SecondHandStore?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected!');
});
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