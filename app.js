const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

var app = express();


// SET UP Mongoose //
mongoose.connect("mongodb://localhost/restfull__blog__app");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// Schema 
var blogSchema = new mongoose.Schema({
	title : String,
	image : String,
	body : String,
	created : {type : Date , default : Date.now}
});

var Blog = mongoose.model("Blog" , blogSchema);

 // Rest Full RouteRoute
app.get("/" , function(req , res) {
	 res.redirect("/blogs");

})

app.get("/blogs" , function(req , res) {
		Blog.find({} , function(err , blogs){
		if(err){
			console.log("Something Went Wrong")
		} else {
			res.render("index" , {blogs : blogs});
		}
	})
	

});

		// NEW ROUTE

app.get("/blogs/new" , function(req,res) {
	res.render("new")
} )


		// CREATE ROUTE

app.post("/blogs" , function(req , res){
	//create blog
	
	Blog.create(req.body.blog , function(err , newBlog){
		if(err){
			res.render("new")
		} else {
				// the redirec

			res.redirect("/blogs");
		}
	})

})

// Shoe Route
	app.get("/blogs/:id" , function(req , res){
		Blog.findById(req.params.id , function(err , foundBlog){
			if(err){
				res.redirect("/blogs")
			} else {
				res.render("show" , {blog : foundBlog})
			}
		})
});



app.listen(8080 , function(){
	console.log("Server is listning on Port 8080")
})