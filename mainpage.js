const express = require("express");
const app = express();
const {v4:uuidv4} = require("uuid");
const methodOverride = require("method-override");

let port = 8080;

let path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

 
let database = [
    {   id: uuidv4(),
        username: "faishal.siddiqui.58",
        post: "something in era",
    },
    {   id: uuidv4(),
        username: "someone.75690",
        post: "nothing in caption",
    }
];

app.get("/tweeter", (req, res)=>{
    res.render("mainpage.ejs", {database});
});

app.get("/tweeter/addPost", (req, res)=>{
    res.render("addPost.ejs");
});

app.post("/tweeter",(req, res)=>{

    let {username, post} = req.body;
    let id = uuidv4();
    if(username || post){
    database.push({ id,username, post});
    }
    res.redirect("/tweeter");
});

app.get("/tweeter/:id", (req, res)=>{
  let {id} = req.params;
  let data = database.find((p)=> id === p.id);
   res.render("showTweet.ejs", {data});
  
});

app.get("/tweeter/edit/:id", (req, res)=>{
    let {id} = req.params;
    let data = database.find((p)=> id === p.id);
    res.render("edit.ejs", {data});
});

app.patch("/tweeter/:id", (req, res)=>{
    let {id} = req.params;
    let newPost = req.body.post;
    let data = database.find((p)=> id === p.id);
    data.post = newPost;
    res.redirect("/tweeter");
});


app.listen(port, ()=>{
    console.log("app is listening");
});

app.delete("/tweeter/:id", (req, res)=>{
    let {id} = req.params;
    database = database.filter((p)=> id !== p.id);
    res.redirect("/tweeter");
});