const fs = require('fs')
    async function readProducts () {
        let products=await fs.promises.readFile("././data/products.json");
        products = await JSON.parse(products);
        // await console.log(products);
        //   const sortedArray=await productsArray.toSorted((a, b) => {
        //     return a.name.localeCompare(b.name);
        //    });
          return products;
      };
      async function writeProducts(products){
       return fs.promises.writeFile( "././data/products.json",JSON.stringify(products))

      }
module.exports={
      get: async function(req, res){
        const { search, category, minPrice, maxPrice } = req.query;
        try {
            productsArray= await readProducts();
            const result = await productsArray.filter(
              (p) =>
                (!search || p.name.includes(search)) &&
                (!category || p.category === category) &&
                (!minPrice || p.price >= +minPrice) &&
                (!maxPrice || p.price <= +maxPrice)
            );
            res.send(result);
        } catch (error) {
          res.status(500);
          res.send();
        }
      },
      
      getById:async function(req, res){
        try {
            productsArray= await readProducts();
            const product = productsArray.find((item) => item.id === +req.params.id);
            if(!product)
                res.status(404).send("not valid product");
            res.send(product);
        } catch (error) {
          res.status(500);
          res.send();
        }
      },
      
      post:async function(req, res){
        try {
          const { name, category, condition, price, ownerName,ownerTelephon } = req.body;
          if (!name || !category || !condition || !price || !ownerName || !ownerTelephon) {
            res.status(500);
            res.send("Invalid model");
            return;
          }
          productsArray= await readProducts();
          console.log("after read");

          const id = await Math.max(...productsArray.map((p) => p.id)) + 1;
          console.log(id);
          const newProduct = { id, name, category, condition, price, ownerName,ownerTelephon };
          console.log(newProduct);
          writeProducts([...productsArray, newProduct])
          .then(() =>{ res.send( 'add successful');}); 

        } catch (error) {
          res.status(500);
          res.send();
        }
      },
      
      put:async function(req, res){
        try {
          const{ name, category, condition, price, ownerName,ownerTelephon } = req.body;
          const { id } = req.params;
      
          let productsArray=await readProducts();
          const product =await productsArray.find((p) => p.id === +id);
            if (!product) {
              res.status(404);
              res.send("Product not exists");
              return;
            }
      
            product.name = name || product.name;
            product.category = category || product.category;
            product.condition = condition || product.condition;
            product.price = price || product.price;
            product.ownerName = ownerName || product.ownerName;
            product.ownerTelephon=ownerTelephon || product.ownerTelephon;
            const updatedProductsArray = productsArray.map((p) =>
              p.id === +id ? product : p
            );
      
            writeProducts(updatedProductsArray)
            .then(() =>{ res.send( 'update successful');}); 

        } catch (error) {
          res.status(500);
          res.send();
        }
      },
      
      delete:async function(req, res){
        try {
            productsArray=await readProducts();
            const products =await productsArray.filter(
              (item) => item.id !== +req.params.id
            );
            writeProducts(products)
            .then(() =>{ res.send( 'delete successful');}); 

        } catch (error) {
          res.status(500);
          res.send();
        }
      },
}