const express=require("express");
const router=express.Router();
// hope page
router.get("/",(req,res,next)=>{
    try {
        res.render("index",{title:"Mongoose Movies"});
    } catch (error) {
        console.log(error.message)
    }
})

module.exports=router;