const  mongoose = require('mongoose');
const Product=require('../models/product');
const Category=require('../models/category');
module.exports={
      get: async function (req, res) {
        Product.find()
        .then((product) => {
          res.status(200).send( product )
      }).catch(() => {
          res.status(500).send("error!")
      });
      },
      getById: async function (req, res) {
        Product.findById(req.params.id)
        .then((product) => {
          if(product)
            res.status(200).send(product);
          else
          res.status(404).send("product not found!");
      }).catch(() => {
          res.status(500).send("product not found!")
      });
      },
    
      post: async function (req, res) {
        const { name, category, condition, price, ownerName,ownerTelephon } = req.body;
        if (!name || !category || !condition || !price || !ownerName || !ownerTelephon) {
          res.status(500);
          res.send("Invalid model");
          return;
        }
        const categoryObj=await Category.findOne({"name":category});
        if(!categoryObj){
          res.status(500).send("there is not "+category+" category!");
          return;
        }
        const prod=new Product({
          _id:new mongoose.Types.ObjectId(),
          name,
          category_id:categoryObj._id,
          condition,
          price,
          ownerName,
          ownerTelephon
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
          Categories.deleteOne({"_id":req.params.id})
            .then(() => { res.send('delete successful'); })
            .catch(()=>res.status(404).send("not found!"));
      },
     
      
      put:async function(req, res){
        try {
          let{ name, category, condition, price, ownerName,ownerTelephon } = req.body;
          const { id } = req.params;
          const product=Product.findById(id).catch(()=>res.status(404).send("not found!"));
          let category_id=0;  
          if(category){
              const categoryObj=await Category.findOne({"name":category});
              if(!categoryObj){
                res.status(500).send("there is not "+category+" category!");
                return;
              }
              category_id=categoryObj._id;
          }
          name = name || product.name;
            category = category_id || product.category;
            condition = condition || product.condition;
            price = price || product.price;
            ownerName = ownerName || product.ownerName;
            ownerTelephon=ownerTelephon || product.ownerTelephon;
            Product.updateOne({"_id":id},{ $set: { "name" : name ,"category":category_id,
              "condition":condition,"price":price,"ownerName":ownerName,"ownerTelephon":ownerTelephon}})
            .then(() =>{ res.send( 'update successful');})
            .catch( ()=>{      
              res.status(404);
              res.send("product not exists");
            })
        } catch (error) {
          res.status(500);
          res.send();
        }
      },     
      delete: async function (req, res) {
        Product.deleteOne({"_id":req.params.id})
          .then(() => { res.send('delete successful'); })
          .catch(()=>res.status(404).send("not found!"));
    },
}