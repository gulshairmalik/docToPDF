const express = require('express');
const path = require('path');
const multer  = require('multer');
const converter = require('office-converter')();
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
});

const upload = multer({ storage: storage });

//Setting View Engine
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))


app.get('/',(req,res) => {
    res.render('index');
});

app.get('/convert',(req,res) => {
    res.redirect('/');
});

app.post('/convert',upload.single('file'),(req,res) => {
    
    converter.generatePdf('public/uploads/'+req.file.originalname, function(err, result) {
        if (result.status === 0) {
          let outputFile = result.outputFile.replace('public/','');
          res.render('index',{file:outputFile});
        }
    });

});

app.listen(process.env.PORT || 3000);