const { Router } = require('express');
const app = Router();
const fs = require('fs').promises;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../models/user');
const mongoose=require('mongoose');
module.exports={
    signUp: async function(req, res){
        try {
            // Get user input
            const { first_name, last_name, email, password } = req.body
            if (!(email && password && first_name && last_name )) {
                return res.status(400).send("All input is required");
            }
            const oldUser =await  User.findOne({"password":password,"first_name":first_name})
            if (oldUser) {
                return res.status(409).send("User Already Exist "+oldUser);
            }
            encryptedPassword = await bcryptjs.hash(password, 10);
            const token = jwt.sign({ first_name:first_name, password },
                "" + process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );
            const user=new User(
            { first_name,last_name,email,encryptedPassword,token})
            .save()
            .then( res.status(201).json(user))
           .catch(res.status(500).send("internal error!"));
        } catch (err) {
            res.status(500).send(err)        }
    },
    login: async function(req, res) {
        try {
            const { first_name, password } = req.body;
            if (!(password && first_name)) {
                return res.status(400).send("All input is required");
            }
    
            const user = await User.findOne({ "password": password});
            
            if (user) {
                if (password && user.password) {
                    const passwordMatch = await bcryptjs.compare(password, user.password);
                    if (passwordMatch) {
                        const token = jwt.sign({ first_name: first_name }, process.env.TOKEN_KEY, {
                            expiresIn: "2h",
                        });
                        user.token = token;
                        return res.status(200).json(user);
                    } else {
                        return res.status(400).send("Invalid Credentials");
                    }
                } else {
                    return res.status(400).send("Invalid password format");
                }
            } else {
                return res.status(404).send("User not found");
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send("Internal error!");
        }
    }
    
    
}