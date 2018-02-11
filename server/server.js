const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const { validateField } = require('./../shared/validate');
const fields = require('./../shared/fields');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

let db;

app.use(express.static(path.resolve('client/dist')));

const mongodbConnectionString = 'mongodb://admin:admin@react-form-shard-00-00-ifhqk.mongodb.net:27017,react-form-shard-00-01-ifhqk.mongodb.net:27017,react-form-shard-00-02-ifhqk.mongodb.net:27017/test?ssl=true&replicaSet=react-form-shard-0&authSource=admin';
MongoClient.connect(mongodbConnectionString, (err, database) => {
  if (err) return console.log(err);
  db = database.db('app');

  app.listen(port, () => console.log(`Listening on port ${port}`));
  return true;
});

function handleError(res, error) {
  res.send({ error: 1, msg: `${error.name}: ${error.message}` });
}

function validate(data) {
  return data.map((field) => {
    const tempField = fields.filter(f => f.key === field.key)[0];
    tempField.value = field.value;
    return validateField(tempField);
  });
}

app
  .use(bodyParser.json())
  .get('/api/get', (req, res) => {
    db.collection('form').findOne({}).then((result) => {
      res.send({ data: result });
    }).catch(error => handleError(res, error));
  })
  .put('/api/update', (req, res) => {
    if (req.body.filter(item => item.required && !item.value.replace(/\s/g, '')).length) {
      res.send({ error: 1, msg: 'You must fill all required fields!' });
      return;
    }
    const fieldsWithError = validate(req.body).filter(item => item.error);
    if (fieldsWithError.length) {
      const fieldNames = fieldsWithError.map(item => `"${item.name}"`).join(', ');
      res.send({ error: 1, msg: `Fields ${fieldNames} contain${fieldsWithError.length === 1 ? 's' : ''} incorrect values!` });
      return;
    }

    db.collection('form').update(
      {}, {
        values: req.body.map(item => ({ key: item.key, value: item.value })),
      },
      { upsert: true },
    ).then((result) => {
      res.send({ msg: 'Data saved successfully', result });
    }).catch(error => handleError(res, error));
  });
