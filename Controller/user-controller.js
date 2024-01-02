const {UserModel, BookModel} = require("../Models/index")
const userModel = require("../Models/user-model")
const IssuedBook = require("../dtos/book-dto")


exports.getAllUsers= async (req,res)=>{
    const users = await UserModel.find()
    if(users.length===0){
        return res.status(404).json({
            success:false,
            message: "No user found.."
        })
    }
    res.status(200).json({
            success:true,
            data: users
        })
    }

exports.getUserById= async (req,res)=>{
        const {id}= req.params
        const user = await UserModel.findById(id)
        if(!user){
            return res.status(401).json({
                success: false,
                message:"book is not available with given id"
            })
        } return res.status(200).json({
            status:true,
            data: user
        })
    
    }
exports.creatNewUser= async (req,res)=>{
        const {data} = req.params;
        if(!data){
            return res(404).json({
                success:false,
                message: "data not provided"
            })
        } 
        await UserModel.create(data);
        const allUsers = await UserModel.find();
    
        return res.status(200).json({
            success:true,
            data: allUsers
        })
}
exports.updateUserById= (req,res)=>{
    const{id}= req.params;
    const {data}= req.body;

    const updateUser = UserModel.findOneAndUpdate({
        _id:id,
    },data,{
        new:true,
    })
    return res.status(200).json({
        success: true,
        data: updateUser
    })

}
exports.deleteUserById= (req,res)=>{
    const {id}= req.params;
    const user = UserModel.deleteOne({_id:id})
    if(!user){
        res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    return res.status(200).json({
        success:true,
        message: "user successfully deleted"
    }) 
}