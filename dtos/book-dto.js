
class IssuedBook{
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;


 constructor(user){
    this._id= user.id;
    this.name= user.name;
    this.genre= user.genre;
    this.price= user.price;
    this.publisher= user.publisher;
    this.issuedBy = user.issuedBy;
    this.issuedDate= user.issuedDate;
    this.returnDate = user.returnDate;
 }
}

module.exports = IssuedBook;