const express=require('express')

const app=express()

let port=4000
app.listen(port,()=>console.log(`server is running at port ${port}`))


const mclient=require('mongodb').MongoClient

mclient.connect('mongodb://127.0.0.1:27017')
.then(dbref=>{
    const dbObj=dbref.db("test")
    const userCollection=dbObj.collection('data')

    app.set("userCollection",userCollection)
    console.log("connected to database sunccessfully")
})
.catch(err=>{
    console.log("error in connecting with database",err)
})

const userApp=require('./API/userAPI')


function InvalidPathMiddleware(req,res){
    res.send("check Your Url")
}

app.use('/user',userApp)




