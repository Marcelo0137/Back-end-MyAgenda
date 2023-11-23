const User = require("../../models/User")


const UserController = {

    async createUser(req,res) { 

        const body = req.body
        
        try{

            const newUser = await User.create(body)
            return res.status(201).json(newUser)

        } catch(err){

            return res.status(400).json(err)
            
        }

    },
    async getUsers (req,res){
        
        try{

            const users = await User.find()
            return res.status(201).json(users)

        } catch(err){

            return res.status(400).json(err)

        }

    },

    async getUserById(req,res) {

        const paramsData = req.params // const { user_id} = req.params

        try{

            const user = await User.findById(paramsData)
            return res.status(200).json(user)

        } catch(err){

            return res.status(400).json(err)

        }
    },

    async updatedUser(req,res){

        const body = req.body
        const {user_id} = req.params

        try{
            
            const updatedUser = await User.findByIdAndUpdate(user_id,body,{new:true})
            return res.status(200).json(updatedUser)

        } catch(err){

            return res.status(400).json(err)

        }
        
    }
}

module.exports = UserController
