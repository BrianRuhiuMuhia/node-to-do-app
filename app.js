const express=require("express")
const app=express()
const {route}=require("./routes/mainRoutes.js")
const session=require("express-session")
const passport=require("passport")
const dotenv=require("dotenv")
require("./strategies/local-strategy.js")
dotenv.config()
app.use(session({secret:"random",saveUninitialized:false,resave:false,cookie:{
    maxAge:10000*60*60
}}))
app.use(passport.initialize())
app.use(passport.session())
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/",route)
app.all("*",function(req,res)
{
return res.status(404).render("404-page.ejs")
})
app.post("./login",passport.authenticate("local"),(req,res)=>{

})
app.listen(5000,()=>{
    console.log(`Server Running on port ${process.env.PORT}`)
})