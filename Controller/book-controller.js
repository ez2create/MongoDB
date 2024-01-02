
const {UserModel, BookModel} = require("../Models/index")
const IssuedBook = require("../dtos/book-dto")

exports.getAllBooks= async (req,res)=>{
    const books = await BookModel.find()
    if(books.length===0){
        return res.status(404).json({
            success:false,
            message: "No books found.."
        })
    }
    res.status(200).json({
            success:true,
            data: books
        })
    }
exports.getBookById= async (req,res)=>{
    const {id}= req.params
    const book = await BookModel.findById(id)
    if(!book){
        return res.status(401).json({
            success: false,
            message:"book is not available with given id"
        })
    } return res.status(200).json({
        status:true,
        data: book
    })

}

exports.getAllIssuedBooks= (req,res)=>{
    const users= UserModel.find({
        issuedBook:{$exists: true}
    }).populate("issuedBook")

    const issuedBooks = users.map((each)=> new IssuedBook (each))
    if(issuedBooks.length === 0){
        return res.status(401).json({
            success: false,
            message:" book is not issued yet"
        })
    } return res.status(200).json({
        success:true,
        data: issuedBooks
    })
}
exports.creatNewBook= async (req,res)=>{
    const {data} = req.body;
    if(!data){
        return res.status(404).json({
            success:false,
            message: "data not provided"
        })
    } 
    await BookModel.create(data);
    const allBooks = await BookModel.find();

    return res.status(200).json({
        success:true,
        data: allBooks
    })
}

exports.updateBookById= (req,res)=>{
    const{id}= req.params;
    const {data}= req.body;

    const updateBook = BookModel.findOneAndUpdate({
        _id:id
    },data,{
        new:true
    })
    return res.status(200).json({
        success: true,
        data: updateBook
    })

}
exports.deleteBookById= (req,res)=>{
     const{id}= req.body;
     const book = BookModel.deleteOne({_id:id});
     if(!book){
        return res.status(401).json({
            success: false,
            message: "this book is Not exsits"
     })
    } 
    return res.status(200).json({
        success:true,
        message:"book successfully deleted!"
    })
}