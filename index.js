const express = require("express");
const app = express();
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, function (err,bytes){
            const fn = bytes.toString("hex") + path.extname(file.originalname); 
            cb(null, fn)
        })
    }
  })
  
const upload = multer({ storage: storage })

app.get("/",(req,res) => {
    res.send("Hi, I'm Jaimin");
});

app.get("/uploadfile",(req,res) => {
    res.render("test.ejs");
});

app.post("/upload", upload.single("image") ,(req,res)=>{
    console.log(req.file);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//multer add a body object and a file object to the request object.
//the body object contains the value of the text fields of the form => req.body
//the file object contains the files upload via the form => req.file

// path.extname(file.originalname) is used to know extension name of file (extension like .pdf,.jpg,.jpeg etc...)

// line-20 used to randome name for the file