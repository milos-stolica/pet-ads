const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const adsRouter = require('./routes/ads');
const typesRouter = require('./routes/types');
const authRouter = require('./routes/auth');
const subscriptionsRouter = require('./routes/subscriptions');
const createError = require('http-errors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const { makeDirectories } = require('./utils');
const { authentificateUser } = require('./controllers/auth');
const MulterUploader = require('./services/MulterUploader');

const app = express();
//to do zasto ne moze da se skloni x-powered-by heder

const connectionOptions = {
  useNewUrlParser : true, 
  useUnifiedTopology: true
};

mongoose.connect(config.mongoDBConnection, connectionOptions , (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('MongoDB successfully connected to app.');
  }
});

makeDirectories();

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(authentificateUser);

const upload = MulterUploader.upload('file');
app.use('*', MulterUploader.parseFormData(upload));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.get('/', (req, res) => {
  return res.send(`<h1>Welcome to Pet Ads APIs center</h1>`);
})

app.use('/ads', adsRouter);
app.use('/types', typesRouter);
app.use('/auth', authRouter);
app.use('/subscriptions', subscriptionsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('Page not found.');
  return next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500; // If no status is provided, let's assume it's a 500
  return res.status(status).end(`Error status: ${status}`);
});

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});