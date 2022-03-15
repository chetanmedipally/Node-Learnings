const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');



const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/", function(req, res) {
    res.sendFile(__dirname+"/signUp.html");
});

app.post("/", function(req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    console.log("json Data : "+jsonData);
    res.send("Data received")
    const url = "https://us20.api.mailchimp.com/3.0/lists/cb02bc6c9c"

    const options = {
        method: "POST",
        auth: "mchtnkmr@yahoo.com:ae05e96e984031dacc02f9624789d6a5-us20"
    }

    const request = https.request(url, options, function(response) {
        //console.log("Status code : "+response.statusCode)
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else 
        {
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data", function(data) {
            //console.log("Data : "+data);
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {

    res.redirect("/");
});




app.listen(process.env.PORT || 3000, function() {
    console.log("Server up and running on port 3000..");
});

//ae05e96e984031dacc02f9624789d6a5-us20

//cb02bc6c9c