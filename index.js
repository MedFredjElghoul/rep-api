const express = require('express');
const axios = require('axios');
const app = express();
const port = 8081;
const jwt = require('jsonwebtoken');
require('dotenv').config();
var lReps = [];

var RepAdress = '1109 N Highland St, Arlington, VA 22201';

// representative per state
app.get('/members', (req, res) => {
   // The API 1 call you want to make
   axios.get(`https://api.propublica.org/congress/v1/members/house/`+state+`/current.json`, {
    headers: {
      'X-API-Key': '3p6Hx2LaptUR5jdZJXHwfZEM8d1gEz3yADThIjLc',
    }
})
.then(response1 => {
  axios.get(`https://api.propublica.org/congress/v1/members/senate/`+state+`/current.json`, {
    headers: {
      'X-API-Key': '3p6Hx2LaptUR5jdZJXHwfZEM8d1gEz3yADThIjLc',
    }
}).then( response2 => {
    // Merge response1 and response2 for example
    const result = [ {"state": state} , response1.data.results, response2.data.results ];
    // Write response head
    res.setHeader('Content-Type', 'application/json');
    // Write the json content and end the connection
    res.end(JSON.stringify(result));
  })
})
.catch(error => {
    console.log(error);
});
});



// All the representatives 
app.get('/all', (req, res) => {
  // The API 1 call you want to make
  axios.get('https://api.propublica.org/congress/v1/117/house/members.json/', {
      headers: {
        'X-API-Key': '3p6Hx2LaptUR5jdZJXHwfZEM8d1gEz3yADThIjLc',
      }
  })
  .then(response1 => {
    axios.get('https://api.propublica.org/congress/v1/117/senate/members.json/', {
      headers: {
        'X-API-Key': '3p6Hx2LaptUR5jdZJXHwfZEM8d1gEz3yADThIjLc',
      }
  }).then( response2 => {
      // Merge response1 and response2 for example
      const result = [ response1.data.results, response2.data.results ];
      // Write response head
      res.setHeader('Content-Type', 'application/json');
      // Write the json content and end the connection
      res.end(JSON.stringify(result));
      var mem = result;
     
    })
  })
  .catch(error => {
      console.log(error);
  });
  
});


// created state representative 
app.get('/state', (req, res) => {
  // The API 1 call you want to make
  axios.get('http://localhost:8081/members', {
      headers: {
        Cookie: '',
      }
  })
  .then(response1 => {
      // Merge response1 and response2 for example
      const result =  response1.data;
      // Write response head
      res.setHeader('Content-Type', 'application/json');
      // Write the json content and end the connection
      res.end(JSON.stringify(result));
    })
  
  .catch(error => {
      console.log(error);
  });
});



// representative per state
app.get('/state/:state', (req, res) => {
  var stateRep = req.params.state
  // The API 1 call you want to make
  axios.get(`https://api.propublica.org/congress/v1/members/house/`+stateRep+`/current.json`, {
   headers: {
     'X-API-Key': '3p6Hx2LaptUR5jdZJXHwfZEM8d1gEz3yADThIjLc',
   }
})
.then(response1 => {
 axios.get(`https://api.propublica.org/congress/v1/members/senate/`+stateRep+`/current.json`, {
   headers: {
     'X-API-Key': '3p6Hx2LaptUR5jdZJXHwfZEM8d1gEz3yADThIjLc',
   }
}).then( response2 => {
   // Merge response1 and response2 for example
   const result = [ {"state": stateRep} , response1.data.results, response2.data.results ];
   // Write response head
   res.setHeader('Content-Type', 'application/json');
   // Write the json content and end the connection
   res.end(JSON.stringify(result));
 })
})
.catch(error => {
   console.log(error);
});
});






// geocod data

app.get('/gecod', (req, res) => {
  // The API 1 call you want to make
  //  Baywood%2C%20%C3%89tat%20de%20New%20York%2011706
  axios.get('https://api.geocod.io/v1.6/geocode?api_key=fed67e56db17df09e096f19e970be9f9bf176ef&fields=cd&q=1109+N+Highland+St%2c+Arlington+VA', {
 
  })
  .then(response1 => {
      // Merge response1 and response2 for example
      const result =  response1.data;
      var repList = JSON.stringify(result, null, 2)
      lReps = repList;
     console.log(lReps);
      
      // Write response head 
      res.setHeader('Content-Type', 'application/json');
      // Write the json content and end the connection
      res.end(JSON.stringify(result));

      
    })
  
  
  .catch(error => {
      console.log(error);
  });
});



// ALL representative per adress
app.get('/data', verifyToken, (req, res) => {
 var spacer ={"data from": "civic"}
 var G_API = process.env.GEOCOD_API_KEY; 
 var C_API = process.env.CVIC_API_KEY; 
 jwt.verify(req.token, 'secretkey', (err, authData) =>{
  if (err) {
    res.sendStatus(403);
  }else{
     // The API 1 call you want to make
  axios.get(`https://api.geocod.io/v1.6/geocode?api_key=`+G_API+`&fields=cd&q=`+RepAdress, {
    
  })
  .then(response1 => {
    axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=`+C_API+`&levels=country&roles=legislatorUpperBody&roles=legislatorLowerBody&address=`+RepAdress, {    
  }).then( response2 => {
     // Merge response1 and response2 for example
     const result = [ response1.data, spacer, response2.data ];
     var repList = JSON.stringify(result, null, 2)
     lReps = repList;
     // Write response head
     res.setHeader('Content-Type', 'application/json');
     // Write the json content and end the connection
     res.end(JSON.stringify(result));
   })
  })
  .catch(error => {
     console.log(error);
  });
  }
});
 
});



// ALL representative per adress dynamic
app.get('/data/:adr', verifyToken, (req, res) => {
  var spacer ={"data from": "civic"}
  var G_API = process.env.GEOCOD_API_KEY; 
  var C_API = process.env.CVIC_API_KEY; 
  var RepAdress = ""+req.params.adr+"";
  
  jwt.verify(req.token, 'secretkey', (err, authData) =>{
   if (err) {
     res.sendStatus(403);
   }else{
      // The API 1 call you want to make
   axios.get(`https://api.geocod.io/v1.6/geocode?api_key=`+G_API+`&fields=cd&q=`+RepAdress, {
     
   })
   .then(response1 => {
     axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=`+C_API+`&levels=country&roles=legislatorUpperBody&roles=legislatorLowerBody&address=`+RepAdress, {    
   }).then( response2 => {
      // Merge response1 and response2 for example
      const result = [ response1.data, spacer, response2.data ];
      var repList = JSON.stringify(result, null, 2)
      lReps = repList;
      // Write response head
      res.setHeader('Content-Type', 'application/json');
      // Write the json content and end the connection
      res.end(JSON.stringify(result));
    })
   })
   .catch(error => {
      console.log(error);
   });
   }
 });
  
 });




// myRep
app.get('/myRep', SeeData );
function SeeData (request , response){
  console.log('****************************')
  
  var stateReps = JSON.parse(lReps)
    var adress = stateReps[0].input.formatted_address;
    var district = stateReps[0].results[0].fields.congressional_districts[0].name;
    var stateRepsList = stateReps[0].results[0].fields.congressional_districts[0].current_legislators;
    var stateRepsListCivic = stateReps[2].officials;
    
    // check twitter
    stateRepsList.forEach(legislator => {
      if( legislator.social.twitter != null) {
      } else{
         var url = legislator.contact.url+"/";
         
          stateRepsListCivic.forEach(cevicLegislator => {
            var url2 =  cevicLegislator.urls[0];
            var twitter2 =cevicLegislator.channels[1].id; 
            if( url == url2 ){
              legislator.social.twitter = twitter2
            }
          })
      }
     });
     
     // check facebook
     stateRepsList.forEach(legislator => {
      if( legislator.social.facebook != null) {
       console.log(legislator.social.facebook)
      } else{
         var url = legislator.contact.url+"/";
         
          stateRepsListCivic.forEach(cevicLegislator => {
            var url2 =  cevicLegislator.urls[0];
            var facebook2 =cevicLegislator.channels[0].id; 
            if( url == url2 ){
              legislator.social.facebook = facebook2
              console.log( legislator.social.facebook)
            }
          })
      }
     });


  const repState = [adress, district, stateRepsList];

  response.setHeader('Content-Type', 'application/json');
  // Write the json content and end the connection
  response.end(JSON.stringify(repState));
}

app.post('/login', (req,res) =>{
 // Mock user
 const user = {
   id: 1,
   username: 'medElghoul',
   email: 'melghoul@swtch.cc', 
 }

  jwt.sign({user}, 'secretkey', (err, token)=>{
    res.json({
      token
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']; 
  if(typeof bearerHeader !== 'undefined') {
     const bearer = bearerHeader.split(' ');
     const bearerToken = bearer[1];
     req.token = bearerToken;
     next();
  } else{
    res.sendStatus(403);
  }
}

app.listen(port, () => {
    console.log(`[Info] vt-proxy listening at http://localhost:${port}`);
}); 