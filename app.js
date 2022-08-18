//jshint esversion:6
const express = require("express");
const bodyparser = require("body-parser");
const date=require(__dirname+"/date.js");
const app = express();
app.use(express.static("public"));
const items = ["Wake up !", "Eat !", "Sleep !"];
const workitems=[];
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  const day=date.getdate();
  res.render("list", {listtitle: day,newlistitems: items});
});
app.post("/", function(req, res) {
    const item = req.body.Newitem;
  if(req.body.list==="Work"){
    workitems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work",function(req,res){
  res.render("list",{listtitle:"Work List",newlistitems: workitems})  ;
});
app.post("/work",function(req,res){
  const workitem=req.body.Newitem;
  workitem.push(workitem);
  res.redirect("/work");
});
app.get("/about",function(req,res){
  res.render("about");
})
app.listen(process.env.PORT || 3000 , function() {
  console.log("the server is running on 3000");
});
