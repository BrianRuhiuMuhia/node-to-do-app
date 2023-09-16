const {db} = require("../database/db.js")
const {render}=require("ejs")
const {redirect}=require("ejs")
function homePage(req,res)
{
    return res.render("index.ejs")
}
function homeRoute(req,res)
{
    db.query("select * from Items",function(err,result)
    {
        if(!err)
        {
            return res.json(result.rows)
            
        }
            else{
                console.log(err)
            }
    })
   
}
function deleteRoute(req,res)
{
const {id} = req.params
db.query("delete from items where id = $1",[id])
return res.status(200).render("index.ejs")
}
function addRoute(req,res)
{
const {value} = req.body
db.query("insert into Items(text) values($1)",[value])
return res.redirect("/")
}
function updateTask(req,res)
{
const obj =req.body[0]
const {id,completed}=obj
    db.query(`update public.items set completed = $1 where id = $2`,[completed,id])
    return res.status(200).json(req.body)
}
module.exports={homePage,homeRoute,deleteRoute,addRoute,updateTask}