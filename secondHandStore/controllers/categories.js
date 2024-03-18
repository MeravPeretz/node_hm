const { default: mongoose } = require("mongoose");
const Categories =require( "../models/category");
const category = require("../models/category");
const Product = require("../models/product");

module.exports = {
  get: async function (req, res) {
    Categories.find()
    .then((categories) => {
      res.status(200).send( categories )
  }).catch(() => {
      res.status(500).send("sorry...there are no categories!")
  });
  },

  getById: async function (req, res) {
    Categories.findById(req.params.id)
    .then((category) => {
      if(category)
        res.status(200).send(category);
      else
      res.status(404).send("category not found!");
  }).catch(() => {
      res.status(500).send("category not found!")
  });
  },

  post: async function (req, res) {
      const { name } = req.body;
      if (!name) {
        res.status(404);
        res.send("יש לשלוח נתונים תואמים");
        return;
      }
      const newcategory=new Categories({
        _id:new mongoose.Types.ObjectId(),
        name
      }).save()
        .then(() => { res.status(200).send('add successful'); })
        .catch(()=>{res.status(500).send("internal server error!")});
  },

  put: async function (req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const category = await Categories.findOneAndUpdate( { "_id" :id },
      { $set: { "name" : name } })
      .then(() => { res.send('update successful'); })
      .catch( ()=>{      
        res.status(404);
        res.send("category not exists");
      })
    } catch (error) {
      res.status(500);
      res.send();
    }
  },

  delete: async function (req, res) {
    const{id}=req.params;
    await Product.deleteMany({"category_id":id}).catch();
      Categories.deleteOne({"_id":id})
        .then(() => { res.send('delete successful'); })
        .catch(()=>res.status(404).send("not found!"));
  },
}