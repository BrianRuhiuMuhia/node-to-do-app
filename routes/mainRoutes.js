const express=require("express")
const route=express.Router()
const {homeRoute,deleteRoute,addRoute,updateTask, homePage}=require("../controllers/controller.js")
route.get("/",homePage)
route.get("/home",homeRoute)
route.post("/add",addRoute)
route.delete("/:id",deleteRoute)
route.put("/:id",updateTask)
module.exports={route}