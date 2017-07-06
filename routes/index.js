var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('index'); //We don't need to pass any objects
});

router.get('/:time', function(req, res){
    
   //Send plain text to the browser
   //res.send(req.params.time); //params: access the variable in the route url
    
   //Render it to a view
   //res.render('index', {time: req.params.time});
    
   //Render it to JSON
   //var data = {time: req.params.time};
   //res.json(data);
   
   //////////////////////////////////////////////////    
    
   function unixToNatural(unix){
       var date = new Date(unix * 1000); //have to use milliseconds
       var months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
       
       var month = months[date.getMonth()];
       var day = date.getDate();
       var year = date.getFullYear();
       
       return month + ' ' + day + ', ' + year;
   }
    
   //Check if it's a number
   if (!isNaN(req.params.time)){
       var result = unixToNatural(req.params.time);
       var data = {unix: req.params.time, natural: result};
       res.json(data);
   } else {
       var natural = new Date(req.params.time); //If the argument is a valid date string, then the Date object is gonna be converted to milliseconds. If it's not, then it's gonna be undefined or null
       if(!isNaN(natural)){
           var unix = natural / 1000;
           var data = {unix: unix, natural: req.params.time};
           res.json(data);
       } else {
           res.json({unix: null, natural: null});
       }
   }

   
});

module.exports = router;
