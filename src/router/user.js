const express=require('express');
const router=express.Router();
const dbconfig=require('../db');

router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    if(email && password){
    dbconfig.query(
        "SELECT * FROM employee_list WHERE email = ? AND password = ?", [email,password],(err,result)=>{
            if (err) {                
                return res.status(400).send(err);
              }
            else if(result.length<=0){                
                console.log('wrong user');
                return res.send("incorrect crediential");
            }
            else{
            res.send(result);
            console.log(result);
            console.log('User logged in sucessfull');
            }
        }
    )
    }
});
router.get("/user",(req,res)=>{
    dbconfig.query(
        "SELECT * FROM employee_list",(err,result)=>{
            if(err){
                return res.status(400).send(err);
            }
            res.send(result);
            console.log("list of users");
        }
    )
})
module.exports = router;