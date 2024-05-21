const express =require ("express")
require ('./db/config')
const User=require("./db/user")

const app =express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const Product=require("./db/Product")


app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    // yaha find nahi,save hora hai so select nhilga skte hai apan for removing password
     result =result.toObject();
     delete result.password
 
    resp.send(result)
})
// isse data mongodb me save ho jayega , jo bhi humm postman se req bhejenge in the body

app.post("/login", async(req,res)=>{
    
    console.log(req.body)
if(req.body.email &&req.body.password)
{
    let user= await User.findOne(req.body).select("-password");
    // selct method to remove password 
    if(user){
        res.send(user);
    }
    else {
        res.send({result:'no user found'})
    }
}
    else {
        res.send({result:'no user found'})
    }

})



// products humari db ka naam hai,product is singular model or uspr ek hi add ho skti hai ek baar me 
app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products", async (req, resp) => {
    const products = await Product.find();
    // will find all the products in db 
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
}),


app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }
})

app.put("/product/:id", async (req, resp) => {
let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
)
resp.send(result)
});

app.put("/product/:id", async (req, resp) => {
let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
)
resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
let result = await Product.find({
    "$or": [
        {
            name: { $regex: req.params.key }  
        },
        {
            company: { $regex: req.params.key }
        },
        {
            category: { $regex: req.params.key }
        }
    ]
});
resp.send(result);
})

app.listen(5000)