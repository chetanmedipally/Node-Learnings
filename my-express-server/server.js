const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();

app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res) {
    res.send("<h1>Hello World!</h1>");
});

app.post('/', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.file;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./public/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/contact", function(req,res) {
    res.send("Contact me at: mchtnkmr@gmail.com")
});

app.get("/about", function(req,res) {
    res.send("My Details : Details about me .")
});

app.get("/hobbies", function(req, res) {
    res.send("<ul><li>Cooking</li><li>Coding</li></ul>")
});

app.listen(3000,function() {
    console.log("Server started and listening on port 3000...");
});