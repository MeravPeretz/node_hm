const { Router } = require('express');
const app = Router();
const fs = require('fs').promises;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
let users;
const save =async (user) =>{
    const fs = require('fs').promises;
    users.push(user);
    fs.writeFile("./data/users.json", JSON.stringify(users));
}

const loadData =async  (email) => {
    users = await fs.readFile('./data/users.json');
    users = await JSON.parse(users);
}
module.exports={
    signUp: async function(req, res){
        try {
            // Get user input
            const { first_name, last_name, email, password, user_id } = req.body
            if (!(email && password && first_name && last_name && user_id)) {
                res.status(400).send("All input is required");
            }
            await loadData();
            const oldUser = users.find(u=>u.email===email);
            if (oldUser) {
                return res.status(409).send("User Already Exist. Please ")
            }
            encryptedPassword = await bcryptjs.hash(password, 10);
            const token = jwt.sign({ user_id:user_id, email },
                "" + process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );

            const user={first_name:first_name,last_name:last_name,email:email,password:encryptedPassword,user_id:user_id,token:token}
            save(user);
            res.status(201).json(user);
        } catch (err) {
            console.log(err);
        }
        // Our register logic ends here
    },
    login:async function(req, res){
        try {
            const { first_name,email, password } = req.body;
            if (!(email && password && first_name)) {
                res.status(400).send("All input is required");
            }
            await loadData();
            const user = users.find(u=>u.email===email);
            console.log(user);
            console.log(await bcryptjs.compare(password, user.password));
            if (user && (await bcryptjs.compare(password, user.password))) {
                const token = jwt.sign({ user_id: user._id, first_name },
                   " " + process.env.TOKEN_KEY, {
                        expiresIn: "2h",
                    }
                );
                user.token = token;
                // user
                res.status(200).json(user);
            }
            else
                res.status(400).send("Invalid Credentials");
        } catch (err) {
           
            console.log(err);
        }
    }
}