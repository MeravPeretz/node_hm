const fs = require('fs')
    async function readCategories () {
        let Categories=await fs.promises.readFile("././data/Categories.json");
        Categories = await JSON.parse(Categories);
        // await console.log(Categories);
        //   const sortedArray=await CategoriesArray.toSorted((a, b) => {
        //     return a.name.localeCompare(b.name);
        //    });
          return Categories;
      };
      async function writeCategories(categories){
       return fs.promises.writeFile( "././data/categories.json",JSON.stringify(categories));
        
      }
module.exports={
      get: async function(req, res){
        try {
            CategoriesArray= await readCategories();

            res.send(CategoriesArray);
        } catch (error) {
          res.status(500);
          res.send();
        }
      },
      
      getById:async function(req, res){
        try {
            CategoriesArray= await readCategories();
            const category = CategoriesArray.find((item) => item.id === +req.params.id);
            if(!category)
                res.status(404).send("not valid category");
            res.send(category);
        } catch (error) {
          res.status(500);
          res.send();
        }
      },
      
      post:async function(req, res){
        try {
          const { name } = req.body;
          if (!name ) {
            res.status(404);
            res.send("יש לשלוח נתונים תואמים");
            return;
          }
          CategoriesArray=await readCategories();
          const id = await Math.max(...CategoriesArray.map((p) => p.id)) + 1;
          const newcategory = { id, name};
          console.log(newcategory);
          writeCategories([...CategoriesArray, newcategory])
          .then(() =>{ res.send( 'add successful');}); 

        } catch (error) {
          res.status(500);
          res.send();
        }
      },
      
      put:async function(req, res){
        try {
          const{ name} = req.body;
          const { id } = req.params;
      
          CategoriesArray=await readCategories();
          const category =await CategoriesArray.find((p) => p.id === +id);
            if (!category) {
              res.status(404);
              res.send("category not exists");
              return;
            }
      
            category.name = name || category.name;
            const updatedCategoriesArray = CategoriesArray.map((p) =>
              p.id === +id ? category : p
            );
      
            writeCategories(updatedCategoriesArray)
            .then(() =>{ res.send( 'update successful');}); 

        } catch (error) {
          res.status(500);
          res.send();
        }
      },
      
      delete:async function(req, res){
        try {
            CategoriesArray=await readCategories();
            const Categories =await CategoriesArray.filter(
              (item) => item.id !== +req.params.id
            );
            writeCategories(Categories)
            .then(() =>{ res.send( 'delete successful');}); 

        } catch (error) {
          res.status(500);
          res.send();
        }
      },
}