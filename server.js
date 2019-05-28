const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const MovieRoutes = require('./routes/movie/MovieRoutes');
app.use(bodyParser.json());
app.use('/Movie', MovieRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '500mb'}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  
app.listen(port, () => console.log(`Server running on port ${port}`));