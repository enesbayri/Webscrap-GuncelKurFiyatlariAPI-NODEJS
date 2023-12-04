const router=require("express").Router();
const homeController=require("../controllers/homeController");


router.get("/",homeController.homePage);








module.exports=router;