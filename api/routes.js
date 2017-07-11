

module.exports = (app) => {
  
  let tsControl = require('./ts-controller');
  
  app.get('/', (req, res) => {
    res.render('../views/index.html', (err, html) => {
      if (err) throw err;
      res.send(html);
    });
  });

  app.get('/:name', (req, res) => {
    tsControl.processReq(req, res);
  });
  
}