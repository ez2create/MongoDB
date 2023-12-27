const express= require("express")
const {users}= require("../Data/users.json");

const router = express.Router()

router.use(express.json())

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data: users
    })
}) 
router.get("/:id",(req,res)=>{
    const {id}= req.params
    const user = users.find((each)=> each.id ===id)
    if(!user){
        return  res.status(404).json({
                success:false,
                Message: "No user found.."
        })
    } return res.status(200).json({
             success:true,
             data: user

        })
})

router.post("/", (req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}= req.body;
    const user = users.find((each)=> each.id ===id)
    if(user){
        return  res.status(404).json({
                success:false,
                Message: "User already exist with available id"
        })
    } users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    })
    return res.status(200).json({
        success:true,
        data: users,

    })
})

router.put("/:id", (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    const updatedUser = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data
            };
        }
        return each
    })
    return res.status(200).json({
        success: true,
        data: updatedUser
    })
})
router.delete("/:id", (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    } const index = users.indexOf(user);
    users.splice(index,1)
    return res.status(200).json({
        success:true,
        data:users
    })
})
router.get("/subscription-details/:id", (req,res)=>{
    const {id} = req.params;
    const user= users.find((each)=> each.id===id)
    if(!user){
        return res.status(401).json({
            success:false,
            message: "User Not Found"
        })
    } const getdateindays= (data="")=>{
        let date;
        if(data===""){
            data= new Date;
        }else{
            data= new Date(data)
        }
        let days= Math.floor(data/(1000*60*60*24))
        return days;
    }
    const subscriptionType = (date)=>{
        if(user.subscriptionType==="Basic"){
            date= date+ 90;
        } else if(user.subscriptionType==="Standered"){
            date= date+ 180;
        }else if (user.subscriptionType==="Primium"){
            date= date+ 360;
        } return date;

      }
      let returnDate= getdateindays(user.returnDate);
      let currentDate = getdateindays()
      let subscriptionDate = getdateindays(user.subscriptionDate)
      let subscriptionExpireDate = getdateindays(subscriptionDate)

      const data= {
        ...user,
        SubscriptionExpireDate: subscriptionExpireDate< currentDate,
        DaysleftForExpire: subscriptionExpireDate<= currentDate ?0 : subscriptionExpireDate- currentDate,
        Fine:returnDate <currentDate? subscriptionExpireDate<currentDate?200 :100 :0,
    }
    return res.status(200).json({
        success:true,
        data,
    })
})

module.exports = router;