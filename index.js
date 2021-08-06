const express = require('express');
const axios = require('axios');

const app = express();
const port = 8081;



var state = "al";

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
    const result = [ "state: "+state , response1.data.results, response2.data.results ];
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




// google civic data
app.get('/civic', (req, res) => {
  // The API 1 call you want to make
  axios.get('https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDsvkIYqCGnYKZb8ZkSsnWZG-70lVHff-c&address=al', {
     
  })
  .then(response1 => {
      // Merge response1 and response2 for example
      const result =  response1.data.offices;
      // Write response head 
      res.setHeader('Content-Type', 'application/json');
      // Write the json content and end the connection
      res.end(JSON.stringify(result));
    })
  
  .catch(error => {
      console.log(error);
  });
});


app.listen(port, () => {
    console.log(`[Info] vt-proxy listening at http://localhost:${port}`);
}); 