const express = require('express');

const app = express();
const PORT = 3000;

app.use('/', express.static('../index.html'));

app.listen(PORT, () => { console.log(`app listening on port ${PORT}`) });
module.exports = app;
