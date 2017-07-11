const Ts = require('./ts');

// RegEx
const natural = /(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\%20[0-9]{1,2},\%20\d{4}/gi;
const unix = /\d{10}/g;
  
// Define variables
let stamp, uniDate, natDate, key;

// Create main timestamp object

let ts = new Ts();
let parsedDate = new Ts();

const months = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December'
};


function parseNat(str) {
  
  // Format the string
  str = str.slice(1).split('%20');
  
  let temp = str[0]
  if (temp.charCodeAt(0) >= 97 && temp.charCodeAt(0) <= 122) {
    let char = temp.charCodeAt(0) - 32;
    char = String.fromCharCode(char);
    temp = str[0].split('');
    temp[0] = char;
    temp = temp.join('');  
    str[0] = temp;
  }
  
  // Make sure the case is correct
  for (key in months) {
    if (key == str[0]) { str[0] = months[key] }
  }
  // Insert spaces & convert finished date back to string
  str[0] += ' ';
  str[1] += ' ';
  str = str.join(''); 
  	
  // use string to get unix date
  uniDate = Math.round(Date.parse(str)/1000.0).toString(); 
  
  
  // update properties and return object
  parsedDate['natural'] = str;
  parsedDate['unix'] = uniDate;
  
  return parsedDate;
}

function parseUnix(str) {
  let dateArr = ['', '', ''];
  parsedDate['unix'] = str.slice(1);
  
  let natDate = new Date(parseInt(parsedDate.unix) * 1000).toUTCString();
  natDate = natDate.split(' ');
  console.log(natDate);
  dateArr[0] = natDate[2];
  dateArr[1] = natDate[1];
  dateArr[2] = natDate[3];
  
  // Make sure the case is correct
  for (key in months) {
    if (key == dateArr[0]) { dateArr[0] = months[key] }
  }
  // Insert spaces & convert finished date back to string
  dateArr[0] += ' ';
  dateArr[1] += ', ';
  
  natDate = dateArr.join('');
  
  parsedDate['natural'] = natDate;
  
  return parsedDate;
}


exports.processReq = (req, res) => {
  
  // Check if natural language date
  if (natural.test(req.url)) {
       
    let stamp = parseNat(req.url)     
    res.send(JSON.stringify(stamp));
  }
  
  if (unix.test(req.url)) {
    
    stamp = parseUnix(req.url);
    res.send(JSON.stringify(stamp));
  }
  
  // Request does not match natural or unix format send back ts with null values
  
  res.send(JSON.stringify(ts));
}