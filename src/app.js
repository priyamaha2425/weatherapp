const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

// Define Path for express config
const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials' );

// setup static directory to serve
app.use(express.static(publicDirPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialPath)

app.get('/home', function(req, res){
    res.render("home",{
        title: "HomePage",
        createdBy: "Priya"
    });
})

app.get('/about', function(req, res){
    res.render("about",{
        title: "About",
        createdBy: "Priya"
    });
})

app.get('/help', function(req, res){
    res.render("help", {
        title: "Help",
        createdBy: "Priya"
    });

})

app.get('', function(req, res){
    res.render("login");

})

app.get('/register', function(req, res){
    res.render("Register");

})

app.get('/weather', function(req, res){

    geocode("mumbai", function (err, geoResult) {
        if (err){
            console.log(err);
            return;
        }
        console.log(geoResult);
    
        forecast(geoResult, function (err, foreResult) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(foreResult);
            res.send(forecast);
        })
    
    })
})


app.get('/*',function(req,res){
    res.render("404");
})




app.listen(4000, function () {
    console.log("the server run at port  :  4000");
})