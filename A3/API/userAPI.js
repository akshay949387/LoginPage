

const exp=require('express')
const app=exp.Router()

const nodemailer=require("nodemailer")

const mailgen=require("mailgen")

const myEmail="bellamkondaakshay16@gmail.com"
const mypassword="mlky iyxk bcam jocl"
const MAIN_URL="http://localhost:4000"
const name="firstApp"

let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: myEmail,
      pass: mypassword,
    },
  });

  const MailGenerator=new mailgen({
    theme: "default",
product: {
name: "Nodemailer",
link: MAIN_URL,
}
},
)

  
  const signup = (req, res) => {
    // const { userEmail, name } = req.body;
  
    // sign up the user .....
  
    // then send the email


    
    let response = {
      body: {
        name,
        intro: `Welcome to ${name}! We're very excited to have you on board.`,
      },
    };
    
    
    let mail = MailGenerator.generate(response);
  
    let message = {
      from: myEmail,
      to: "pompaiah.shetty@gmail.com",
      subject: "signup successful",
      html: mail,
    };
  
    transporter
      .sendMail(message)
      .then(() => {
        console.log("email sent")
        return res.status(200).json({ msg: "you should receive an email from us" });
      })
      .catch((error) => console.error(error));
  };

  app.get("/email",(req,res)=>{
    signup(req,res)
  })








const expressAsyncHandler=require("express-async-handler")
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')

app.get('/get',expressAsyncHandler(async (req,res)=>
{console.log("hello")

    const userCollection=req.app.get("userCollection")
    if(userCollection!=null){
    userCollection.find().toArray()
    .then(dbRef=>{
        console.log(dbRef)
        res.send({message:"Users",payload:dbRef})
    })
    .catch(err=>{console.log("fffffffffff")
    res.send(err)})
}
else{
    console.log("userCollection is empty")
}
}))
app.get('/get:id',expressAsyncHandler(async (req,res)=>
{
    const Id=req.params.id
    console.log(Id)
    const userCollection=req.app.get("userCollection")
    const Result= await userCollection.findOne({"username":"Pavan"});
    console.log(Result)
    res.send({mesSage:"sent",payload:Result})
    
}))
app.use(exp.json())
app.post('/post',expressAsyncHandler(async (req,res)=>{
    const userCollection=req.app.get("userCollection")
    const userInfo=req.body
    
    userCollection.insertOne(userInfo)
    .then(dbRef=>{
        res.status(200).send({message:"user created",payload:dbRef})
    })
    .catch(err=>{
        console.log("error in inserting the user document",err)
        res.send("error in inserting the user document")
    })
}))

app.put('/put',expressAsyncHandler(async (req,res)=>{
    const userCollection=req.app.get("userCollection")
    const userInfo=req.body


    let result=await userCollection.updateOne({"id":userInfo.id},{$set:{...userInfo}})
    console.log(result)
    userCollection.updateOne({"id":userInfo.id},{$set:{...userInfo}})
    .then(dbref=>{
        res.send({message:"updated",payload:result})
    })
    .catch(err=>console.log("error in updating the user Object : ",err))
}))

app.delete('/delete:id',expressAsyncHandler(async  (req,res)=>{
    // const userInfo=req.body
    const Id=req.params.id
    const userCollection=req.app.get("userCollection")
    userCollection.deleteOne({"username":Id})
    res.send(`${Id} deleted `)
}))


async function checkPassword(dbRef,verifyUser,req,res)
{
    console.log(dbRef,verifyUser)
    const isTrue=  await bcryptjs.compare(verifyUser.password,dbRef.password)
    console.log(isTrue)
    if(isTrue===true)
    {
        let Token=jwt.sign({username:verifyUser.name},'abcdef',{expiresIn:10})
    
        res.send({message:"login successful",token:Token,abcd:isTrue})
    }
    else
    {
        res.send({message:"invalid password"})
    }
}

app.post('/login',expressAsyncHandler(async (req,res)=>{
    const userCollection=req.app.get("userCollection")
    const verifyUser=req.body
    const result=await userCollection.findOne({"username":verifyUser.username})
    
    console.log(result,verifyUser.username)
    
        if (result==null)
        {
            res.send({"message":"You are not registered Please Register To continue"})
        }
        else
        {
            
            checkPassword(result,verifyUser,req,res)
            
        }
    
    
}))


app.post("/register-user",expressAsyncHandler(async(req,res)=>{
    let transporter = nodemailer.createTransport({
        service: "Yahoo",
        secure: true,
        auth: {
          user: myEmail,
          pass: mypassword,
        },
      });
      
      let MailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "AKAPP",
          link: MAIN_URL,
        },
      });






    const userCollection=req.app.get("userCollection")

    const UserDetails=req.body
    console.log(UserDetails)
    const Result=await userCollection.findOne({username:UserDetails.password})
    if(Result==null)
    {
        const HashedPassword=await bcryptjs.hash(UserDetails.password,10)
        console.log(HashedPassword)
        UserDetails.password=HashedPassword;
        userCollection.insertOne(UserDetails)
        res.send(`${UserDetails.username} is added Successfully`)
    }
    else
    {
        res.send(`${UserDetails.username} is already existed`)
    }
}))


module.exports=app;
