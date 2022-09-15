const jwt=require("jsonwebtoken");
const dbconfig=require("../db");
const auth= async(req,res,next)=>{
    try{
        const token=await req
        .header("Authorization")
        .toString()
        .replace("Bearer","");
        const decode= await jwt.verify(token,"apiKeyOwner");

        await dbconfig.query(
            "SELECT token FROM employee_list WHERE email='"+
            dbconfig.email+"' AND token= '"+dbconfig.token+"';",
            (err,result)=>{
                if(!result.length){
                    return res.send("Error: Not Authorized");
                }
                next();
            }
        );
        req.decode=decode;
    }
    catch(e){
        res.send("1 ERROR: please Authorize")
    }
};
module.exports=auth;