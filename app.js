const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO users (name, email, message) VALUES (?, ?, ?)';

  db.query(sql, [name, email, message], (err, result) => {
    if (err) throw err;
    res.send('User input successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
