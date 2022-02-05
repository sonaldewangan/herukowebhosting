const express = require("express");
const path = require("path");
const hbs = require("hbs")
require("./db/conn")
const Shoe = require("./models/registers");
const async = require("hbs/lib/async");
const bcrypt = require("bcryptjs")

const app = express();

const hostname = "127.0.0.1";
const port = 8000;

const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");

app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialPath)
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.get("/", (req,res)=>{
    res.status(201).render("index")
})

app.get("/about", (req,res)=>{
    res.status(201).render("about")
})

app.get("/register", (req,res)=>{
    res.status(201).render("register")
})

app.get("/login", (req,res)=>{
    res.status(201).render("login")
})

app.post("/register", async (req,res)=>{

    try{

        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if(confirmpassword === password){

            const createRegistration = new Shoe({
                fullname: req.body.fullname,
                gender: req.body.gender,
                email: req.body.email,
                phone: req.body.phone,
                brand: req.body.brand,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
            })

             const registerSave = await createRegistration.save();
            res.status(201).render("index")
        }
        else{
            res.status(400).send("Password is not matching")
        }

    }catch(err){
        res.status(400).send(`Something missing please try again : ${err}`)
    }

})

app.post("/login", async (req,res)=>{

    try{

        const enteremail = req.body.email;
        const enterpassword = req.body.password;


        const useremail = await Shoe.findOne({email:enteremail})

        const isMatch = await bcrypt.compare(enterpassword,useremail.password)

        if(isMatch){
            res.status(201).render("index")
        }
        else{
            res.status(400).send("Invalid login details")
        }

    }catch(err){
        res.status(400).send(`Invalid Login.....${err}`)
    }

})

app.listen(port,hostname,()=>{
    console.log(`Port in running at port number http://${hostname}:${port}`)
})