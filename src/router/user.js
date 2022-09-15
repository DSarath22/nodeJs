const express=require('express');
const router=express.Router();
const dbconfig=require('../db');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const auth=require ("../middleware/auth")

router.post("/login", async(req,res)=>{   
    const email = req.body.email;
    const password = req.body.password;
    if(email){
    dbconfig.query(
        "SELECT * FROM employee_list WHERE email = ?", [email], async(err,result)=>{
            if (err) throw (err);
            if(result.length<=0){
                console.log('User Do not exist');
                return res.send('User Do not exist');
            }
            else{
                const hasheddPassword=result[0].password;
                if(await bcrypt.compare(password, hasheddPassword)){
                    const token =jwt.sign({email:result[0].email},"apiKeyOwner");
                    const email= result[0].email;
                    dbconfig.query(
                        "UPDATE employee_list SET token="+token+" WHERE email='"+result[0].email+"';"
                    );
                    return res.status(200).send({
                        token,
                    });
                }
                else{
                    console.log("password incorrect");
                    res.send("password incorrect")
                }
            }
        }
    )
    }
});
router.get("/user",auth,async (req,res)=>{
    const email = req.body.email;
    dbconfig.query(       
        "SELECT name, employee_id,email FROM employee_list WHERE email=",[email],(err,result)=>{
            if(err){
                return res.status(400).send(err);
            }
            res.send(result);
            console.log("list of users");
        }
    )
})
router.post("/insertuser",async (req,res)=>{
    const hashedPassword= await bcrypt.hash(req.body.password,10);
    const name=(req.body.name);
    const employee_id=req.body.employee_id;
    const email=(req.body.email);
    const phone_number=req.body.phone_number;
    const designation=(req.body.designation);
    const supervisor=(req.body.supervisor);
    const date_of_joining=req.body.date_of_joining;
    console.log(hashedPassword)
    dbconfig.query(
        "INSERT INTO employee_list(name,employee_id,email,password,phone_number,designation,supervisor,date_of_joining) VALUES ('"+name+"',"+employee_id+",'"+email+"','"+hashedPassword+"',"+phone_number+",'"+designation+"','"+supervisor+"',"+date_of_joining+")",(err,result)=>{
            console.log("yes");
            if(err){
                return res.status(400).send(err);
            }
            res.send(result);
            console.log('data Inserted');
        }
    )
})
module.exports = router;