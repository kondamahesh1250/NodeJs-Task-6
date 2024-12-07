var express = require("express");
var app = express();
var fs = require("fs");
var cors = require("cors");
var multer = require("multer");


app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


var storagedata = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+"/files");
    },

    filename: (req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
});

var upload = multer({storage:storagedata});

app.post("/data",upload.single("file"),(req,res)=>{

console.log(req.body);

    var obj = {
        ...req.body,
        fileinfo:req.file?.path
    }

    console.log(obj);

    res.send({
        status:200,
        message:"Successfully uploaded",
        fileinfo:obj
    });

});


var port = 3005;

app.listen(port,()=>{
    console.log("server strated");
});
