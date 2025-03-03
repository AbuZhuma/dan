const generateRandomID = require("../../helpers/genIdH")
const User = require("../../models/user")
const jwt = require("jsonwebtoken");

const register = async(req, res) => {
      try {
            const body = req.body
            const SECRET_KEY = process.env.SECRET_KEY;
            const id = await generateRandomID(10)
            const options ={
                  userid: id,
                  username: body.username, 
                  password: body.password,
                  email: body.email,
                  createdat: new Date()
            }
            const newUser = new User(options)
            await newUser.save()
            const token = jwt.sign({ username: body.usersname,userid:id }, SECRET_KEY, { expiresIn: '20h' });
            const answ = {
              message: "User is registered!",
              token: token,
              userid: id,
              username: body.username
            };  

            if(newUser){
               return res.status(200).json(answ)  
            }
            res.status(400).json({message: "Please try again later!"})
      } catch (error) {
            console.log(error);
            res.status(501).send(error)
      }
}
module.exports = register

