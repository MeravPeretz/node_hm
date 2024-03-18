module.exports = () => {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);
    const mongoDB = "mongodb+srv://merav00037:jXBIJJ2dbi0EFP7T@cluster0.ezx7b4c.mongodb.net/SecondHandStore?retryWrites=true&w=majority&appName=Cluster0";
    main().catch((err) => console.log(err));
    async function main() {
        await mongoose.connect(mongoDB);
    }
}

const Category = require('./secondHandStore/models/category');

Category.find({}, (err, categories) => {
    if (err) {
        console.error(err);
    } else {
        console.log(categories);
    }
});

//const mongoose = require('mongoose');

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@youtube-articles-api-vkfyt.mongodb.net/test?retryWrites=true&w=majority`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connection.on('connected', () => {
//     console.log('MongoDB Connected!');
// });