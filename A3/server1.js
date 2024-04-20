let exp=require("express")

let app=exp()

app.listen(7500,()=>{console.log("3500 is running")});


const user=[];

const prod=[]

console.log(user)


app.get('/get-users',(request,response)=>{
    response.download('./UserAPI.http')
    if(user.length===0)
    {
        response.send({message:'Array is empty' ,payload:user})
    }
    else{
        response.send({message:"List is",payload:user})
    }
})

app.get('/get-user/:id',(request,response)=>{
    Id=(+request.params.id)
    let index=user.findIndex((element)=>element.id===Id)
    if(index===-1)
    {
        response.send({massage:"User does not exist"})
    }
    else
    {
        response.status(200).send({message:"user exists",payload:user[index]})
    }
})

app.use(exp.json())

app.post('/post-user',(request,response)=>{
    let obj=request.body;
    user.push(obj)
    response.send({message:"Added to list",payload:obj})
})

app.put('/update-users',(request,response)=>{
    let Upobj=request.body;
    console.log(Upobj.name)
    let ind=user.findIndex((element) => {Upobj.id===element.id})
    user.splice(ind,1,Upobj)
    response.send({message:"replaced",payload:user})
})

app.delete('/delete-user/:id',(request,response)=>{
    let Id=(+request.params.id)
    console.log(Id)
    let Inde=user.findIndex((element)=>element.id===Id)
    console.log(Inde)
    if (Inde===-1)
    {
        response.send({message:'Id does not exist'})
    }
    else
    {
    user.splice(Inde,1)
    response.send({message:'deleted'})
    }
})


//product


app.get('/get-products',(request,response)=>{
    if(prod.length===0)
    {
        response.send({message:'Array is empty' ,payload:prod})
    }
    else{
        response.send({message:"List is",payload:prod})
    }
})

app.get('/get-product/:id',(request,response)=>{
    Id=(+request.params.id)
    let index=prod.findIndex((element)=>element.id===Id)
    if(index===-1)
    {
        response.send({massage:"User does not exist"})
    }
    else
    {
        response.status(200).send({message:"user exists",payload:prod[index]})
    }
})

app.use(exp.json())

app.post('/create-products',(request,response)=>{
    let obj=request.body;
    prod.push(obj)
    response.send({message:"Added to list"})
})

app.put('/update-products',(request,response)=>{
    let Upobj=request.body;
    console.log(Upobj.name)
    let ind=prod.findIndex((element) => {Upobj.id===element.id})
    user.splice(ind,1,Upobj)
    response.send({message:"replaced",payload:prod})
})

app.delete('/delete-products/:id',(request,response)=>{
    let Id=(+request.params.id)
    console.log(Id)
    let Inde=prod.findndex((element)=>element.id===Id)
    console.log(Inde)
    if (Inde===-1)
    {
        response.send({message:'Id does not exist'})
    }
    else
    {
    prod.splice(Inde,1)
    response.send({message:'deleted'})
    }
})

