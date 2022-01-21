const path = require("path");
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {  //file---what multer will give
      callback(null, path.join(__dirname,"../uploads"));  //../uploads -> path where we will store our files
    },
    filename: function (req, file, callback) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);  //date.now-> time in miliseconds from 1970
      callback(null, uniquePrefix + '-' + file.originalname);  //instead of error we asre passing null..We ar using prefix so that extension deos not gets affected
    },
  });

const fileFilter = (req, file, callback)=>{
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){  //we are allowing only files which are jpeg or png others we are rejecting
      callback(null, true);
  }
  else
  {
      callback(null, false);
  }
};

module.exports = multer({ 
    
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, //1024 bytes * 1024 * kb * 5mb
    }

 });