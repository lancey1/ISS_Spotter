const request = require("request");

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error,response,body) =>  {
    if (error) {
      callback(error,null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    } else {
      let ip = JSON.parse(body).ip;
      callback(null,ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.ipbase.com/v2/info?apikey=P01hbz1gsGXDt33fRYXUYq7B1TtoRsik9BCgAagM&ip=${ip}`, (error,response,body) =>  {
    if (error) {
      callback(error,null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates: ${body}`), null);
      return;
    } else {
      let long = JSON.parse(body).data.location.longitude;
      let lat = JSON.parse(body).data.location.latitude;
      callback(null,long,lat);
    }
  });
};

const fetchISSFlyOverTimes = (lat, long, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`, (error,response,body) =>  {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when flyby times ${body}`), null);
      return;
    } else {
      const flyBy = JSON.parse(body).response;
      callback(null, flyBy);
    }
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};








module.exports = { fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes,nextISSTimesForMyLocation };