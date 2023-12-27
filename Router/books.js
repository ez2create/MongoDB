const express= require("express")
const {books}= require("../Data/books.json");
const {users}= require("../Data/users.json");

const router = express.Router()

router.use(express.json())

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data: books
    })
})

router.get("/:id",(req,res)=>{
    const {id}= req.params
    const book = books.find((each)=>each.id === id)
    if(!book){
        return res.status(401).json({
            success: false,
            message:"book is not available with given id"
        })
    } return res.status(200).json({
        status:true,
        data: book
    })

})

router.get("/issued/books", (req,res)=>{
    const allIssuedBookusers= users.filter((each)=>{
        if(each.issuedBook) return each;
    })
     const allIssuedBooks= []
     allIssuedBookusers.forEach((each)=>{
        const book= books.find((book)=>{
            if(book.id === each.issuedBook) {
                book.issuedby = each.name
                book.issuedDate = each.issuedDate
                book.returnDate = each.returnDate

                allIssuedBooks.push(book)
            }
        })
     })
      if (allIssuedBooks.length[0]){
        res.status(401).json({
            success: false,
            message: "No issued books available now"
        })
     } return res.status(200).json({
        success: true,
        data: allIssuedBooks
     })

})

router.post("/",(req,res)=>{
    const {id,name,author,genre,price,publisher}= req.body;
    const book = books.find((each)=> each.id=== id)
    if(book){
        res.status(200).json({
            success: false,
            message: "this book is already exsits"
        })
    } books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    })     
    return res.status(200).json({
        success:true,
        data: books,

    })

})

router.put("/:id",(req,res)=>{
    const{id}= req.params;
    const {data}= req.body;
    const book = books.find((each)=> each.id=== id)
    if(!book){
        res.status(401).json({
            success: false,
            message: "this book is Not exsits"
        })
    } const updatedata= books.map((each)=>{
        if(each.id===id){
            return {...each,...data}
        } return each;
    }); return res.status(200).json({
        success: true,
        data: updatedata
    })

})

router.delete("/",(req,res)=>{
    const{id}= req.body;
    const book = books.find((each)=> each.id=== id)
    if(!book){
        res.status(401).json({
            success: false,
            message: "this book is Not exsits"
        
        })
    } const deleteBook= books.indexOf(book);
     books.splice(deleteBook,1)
     return res.status(200).json({
        success:true,
        data: books
     })
})
module.exports = router;