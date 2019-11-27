const express = require('express');
const path = require('path');
const multer  = require('multer');
const spawn = require("child_process").spawn;
//const converter = require('office-converter')();
//const libre = require('libreoffice-convert');
const fs = require('fs');
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

// Conversion using Python script

  let sourceFile = './public/uploads/'+req.file.originalname ;
  const pythonProcess = spawn('python',["./script.py", sourceFile]);
  
  pythonProcess.stdout.on('data', (data) => {
    let outputFile = `uploads/${req.file.originalname.split('.')[0]}.pdf`;
    res.render('index',{file:outputFile});
  });


  // Conversion using package 'office-convertor'
    
    // converter.generatePdf('public/uploads/'+req.file.originalname, function(err, result) {
    //     if (result.status === 0) {
    //       let outputFile = result.outputFile.replace('public/','');
    //       res.render('index',{file:outputFile});
    //     }
    // });

    
  // Conversion Using package 'libreoffice-convert'

    // const outputPath = path.join(__dirname, `public/uploads/${req.file.originalname.split('.')[0]}.pdf`);
    // // Read file
    // const file = fs.readFileSync('public/uploads/'+req.file.originalname);
    // // Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
    // libre.convert(file, 'pdf', undefined, (err, done) => {
    //     if (err) {
    //       console.log(`Error converting file: ${err}`);
    //     }
    //     // Here in done you have pdf file which you can save or transfer in another stream
    //     fs.writeFileSync(outputPath, done);
    //     let outputFile = `uploads/${req.file.originalname.split('.')[0]}.pdf`;
    //     res.render('index',{file:outputFile});
    // });   

});

app.listen(process.env.PORT || 3000);