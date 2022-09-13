const express=require('express');
const app=express();
var bodyParser = require('body-parser');
const userRouter = require("./router/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(userRouter);
const port=5000;
// app.get('/',(req,res)=>{
//     res.send("app is running");
// });
app.listen(port,()=>{
    console.log(`app is running sucessfully in:${port}`)
});