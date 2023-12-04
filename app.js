const express = require("express");
const ejs=require("ejs");
const path=require("path");
const expressLayouts=require("express-ejs-layouts");
const session=require("express-session");
const dotenv=require("dotenv").config();

const app = express();
const homeRouter= require("./src/routers/homeRouter");


//ejs arayüz layout ayarları yapılandırılır
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./src/views"));


//session yapısının oluşmasını sağlar
app.use(session({
    secret:process.env.SECRET_SESSION,
    resave:false,
    saveUninitialized:true,
    cookie:{
        //maxAge:1000*15
    }
}));

//public klasörü arayüzde static hale getirilir
app.use(express.static("public"));

//json olarak istekte gelen yapının okunmasını sağlar
app.use(express.json());
app.use( express.urlencoded({extended: true}) );


//cevap.render yapısının oluşmasını sağlar
app.use(expressLayouts);
app.use("/",homeRouter);




//serveri oluşturur!!
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT+ " porttan server ayaklandı!");
})