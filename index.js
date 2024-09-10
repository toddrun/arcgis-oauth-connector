const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());

app.get('/oauth/arcgis/callback', (req, res) => {
  res.sendFile(path.join(__dirname, './oauth-callback.html'));
});

app.get('/', express.static(path.join(__dirname, 'client/build')));

app.listen(8080, () => {
  console.log('server listening on port 8080')
});
