const express = require('express');
const app = express();
const port = 5000;
const MovieRoutes = require('./routes/movie/MovieRoutes');

app.use('/Movie', MovieRoutes);

app.listen(port, () => `Server running on port ${port}`);