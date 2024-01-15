const passport=require("passport")
const Strategy=require("passport-local")
const {db}=require("../database/db.js")
passport.serializeUser((user,done)=>{
done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    try{
        db.query("select * from users where id=$1",[user.id],(err,result)=>{
if(err) throw err
if(result.rows)
{
    let user=result.rows
    done(null,user)
}
        })
    }
    catch(err){
        done(err,null)
    }
})
module.exports=passport.use(new Strategy({usernameField:"email"},(email, password, done)=>{
    try{
db.query("select * from users where email=$1",[email],(err,result)=>{
    if(err) throw err
const user=result.rows
if(user.email!==email) throw new Error("emails don't match")
if(user.password!==password) throw new Error("passwords don't match")
done(null,user)
})
    }
    catch(err){
done(err,null)
    }
}))