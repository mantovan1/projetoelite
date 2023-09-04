const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const review = require('./routes/review');
const client = require('./routes/client');
const comments = require('./routes/comments');
const company = require('./routes/company');
const companies = require('./routes/companies');
const favorites = require('./routes/favorites');

require('dotenv').config({ path: require('find-config')('.env') });

const app = express();
app.use(bodyParser.json());

// Lista de origens permitidas
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

// Função para verificar se a origem é permitida
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não permitido por CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.static('uploads'));
app.get('/', function (req, res) {
	res.send('Elite API');
});

app.use('/client', client);
app.use('/company', company);
app.use('/companies', companies);
app.use('/review', review);
app.use('/comments', comments);
app.use('/favorites', favorites);

app.listen(8080, function () {
	console.log(`servidor rodando no endereço http://192.168.15.152:${process.env.NODE_PORT}`);
});
