const {fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes,nextISSTimesForMyLocation} = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  return ip;
});


fetchCoordsByIP("99.244.108.205", (error,long,lat) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log(`It worked! latitude: ${lat} longitude: ${long}`);
});

const lat = 43.87316131591797;
const long = -79.2615966796875;

fetchISSFlyOverTimes(lat,long,(error,flyBy) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log(`It worked! Here are the times the ISS will pass: ${JSON.stringify(flyBy)}`);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});