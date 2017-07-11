// Create main timestamp object
const Ts = require('./ts');
let ts = new Ts();


function getNatural(date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  
}
exports.processReq = (timestamp) => {
  let date;
  
  // Check if natural language date
  if (!isNaN(parseInt(timestamp))) {
       
    date = new Date(parseInt(timestamp));    
    
  } else {
    date = new Date(timestamp);
  }
  
  if (!isNaN(date.getTime())) {
    
    ts.unix = date.getTime();
    ts.natural = getNatural(date);
  }
  
  // Request does not match natural or unix format send back ts with null values
  
  return ts;
}