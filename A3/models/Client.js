const mongoose=require("mongoose")
const Schema = mongoose.Schema;

const ClientSchema=new Schema(
    {
        username: String,
        password: String,
        location: String ,
        age: Number
    }

)
const NewClient=mongoose.model("NewClient",ClientSchema)
module.exports=NewClient;