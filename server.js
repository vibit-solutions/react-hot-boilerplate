const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

app.use('/static', express.static('build/static'));
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'build/index.html')));

app.listen(port, () => {
  console.log(`Sample Application Listening on Port ${port}`);
});
