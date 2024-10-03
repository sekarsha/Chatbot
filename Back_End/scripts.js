const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/sekarTodo")
    .then(() => {
        console.log("Dada base has been connected");
    })
    .catch((err) => {
        console.log(err);

    })

const Todoschema = new mongoose.Schema({
    title: String,
})

const Todomodal = mongoose.model("Todo", Todoschema)


app.post("/todo", async (req, res) => {
    const { title } = req.body

    try {
        const post_tittle = new Todomodal({ title })
        await post_tittle.save()
        res.status(201).json(post_tittle)
    }
    catch (err) {

        console.log("Error in post method" + err);

    }


})

app.get("/todo", async (req, res) => {

    try {
        const get_title = await Todomodal.find()
        res.status(200).json(get_title)
    }
    catch (err) {
        console.log("Get request la error" + err)
        res.status(500).json(err)

    }



})

app.put("/todo/:id",async(req,res)=>{
      
    try{
        const {title}=req.body;
        const id=req.params.id;
        const updatetitle=await Todomodal.findByIdAndUpdate(
            id,
            {title},
            {new:true}
        )
        res.json(updatetitle)
    }
    catch(err){
        console.log("Put method error "+err);
        res.status(500).json(err)
        
    }

 


})

app.delete("/todo/:id",async(req,res)=>{
      
    try {
        const id=req.params.id;
        await Todomodal.findByIdAndDelete(id);
        res.status(204).end()
    } catch (error) {
        console.log("Delete method la error"+err);
        res.status(500).json(error) 
    }

   

})


app.listen(3000, () => { console.log("Port is Running"); })