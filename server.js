// Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Athletes = require("./models/athletes");
require("dotenv").config();
const methodOverride = require("method-override");
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

db.on("error", (err)=> console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("Style"));


// Home

app.get("/" , function (req, res){
    res.send(`NBA Ballers! Visit to see who makes the most $$$ => <a href="/Athletes"> /Athletes. </a>`)
  })

// INDEX
app.get("/athletes", (req, res)=>{
    Athletes.find({}, (error, allAthletes)=>{
        res.render("index.ejs", {
            Athletes: allAthletes,
        });
    });
});

// NEW
app.get("/athletes/new", (req, res) =>{
    res.render("new.ejs");
});

// DELETE
app.delete("/athletes/:id", (req, res) =>{
    Athletes.findByIdAndDelete(req.params.id, (err, data)=>{
        res.redirect("/athletes");
    });
});

//UPDATE
app.put("/athlets/:id", (req, res) => {  
	Athletes.findByIdAndUpdate(
	  req.params.id,
	  req.body,
	  {
		new: true,
	  },
	  (error, updatedAthletes) => {
		res.redirect(`/athletes/${req.params.id}`);
	  }
	);
  });

// CREATE
app.post("/athletes", (req, res) =>{
    Athletes.create(req.body, (error, createdAthletes)=>{
        res.redirect("/athletes");
    });
});



// EDIT
app.get("/athletes/:id/edit", (req, res)=>{
    Athletes.findById(req.params.id, (err, foundAthletes)=>{
        res.render("edit.ejs", {
            Athletes: foundAthletes,
        });
    });
});

// SHOW
app.get("/athletes/:id", (req, res)=>{
Athletes.findById(req.params.id, (err, foundAthletes) =>{
    res.render("show.ejs",{
        Athletes: foundAthletes,
        });
    });
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));




