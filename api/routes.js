

module.exports = (app) => {
  
  let tsControl = require('./ts-controller');
  
  app.get('/', (req, res) => {
    res.render('../views/index.html', (err, html) => {
      if (err) throw err;
      res.send(html);
    });
  });

  app.get('/:timestamp', (req, res) => {
    let timestamp = req.params.timestamp;
    res.json(tsControl.processReq(timestamp));
  });
  
}