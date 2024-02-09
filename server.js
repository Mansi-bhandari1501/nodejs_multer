const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
// const bodyParser = require('body-parser');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },

    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
// app.set("view engine ","ejs");
// app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    res.send("welcome");
});
app.get("/upload",(req,res)=>{
    res.render("upload");
});
app.post("/stats",upload.array('image',12),(req,res)=>{
    res.send("image uploaded");
});


app.listen(8000,()=>{
    console.log("server is running");
});
