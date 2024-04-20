const exp=require('express');

const app=exp();
let arr=[]
app.listen(7500,()=>console.log("port is running"));

app.get('/get-user',(req,res)=>
{
    res.send({message:"this is data",payload:arr})
})
{

}
app.get('/get-user/:id',(req,res)=>
    {
        let Id=(+req.params.id);
        for(i=0;i<arr.length;i++)
        {
            if(arr[i].id==Id)
            {
                res.send("present")
            }
        }
        res.send("absent")
    }
    
)

app.use(exp.json())
app.post('/post-user',(request,response)=>
{
    console.log("it")
    let it=request.body;
    console.log(it)
    arr.push(it);
    response.send({message:"recieved data is",payload:it});
})

app.put('/put-user',(req,res)=>
{
    const itt=req.body
    console.log(itt.id)
    let i=itt.id;
    if(arr.length==0)
    {
        arr.push(itt)
        flag=1;
    }
    arr.map(idx=>{
        // let ob=arr[idx]
        // console.log(...arr[0])
        let flag=0
        if(arr[idx].id==i)
        {
            let obj={...arr[idx],name:itt.name}
            flag=1;
            
            return
            
        }
        
    }
    )
    if(flag==0)
    {
        arr.push(itt)
    }
    
    res.send({message:"message kept",payload:arr})
})