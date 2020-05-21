const express = require('express');
//const config = require('./config');
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
const fs = require('fs');

const app = express();

const publicDirPath = path.join(__dirname, 'public');
fs.existsSync(publicDirPath) || fs.mkdirSync(publicDirPath);

const adsImagesDirPath = path.join(__dirname, 'public', 'ads_images');
fs.existsSync(adsImagesDirPath) || fs.mkdirSync(adsImagesDirPath);

makeDirectories();

const connectionOptions = {
  useNewUrlParser : true, 
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGOCONN, connectionOptions , (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('MongoDB successfully connected to app.');
  }
});


app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(authentificateUser);

const upload = MulterUploader.upload('file');
app.use('*', MulterUploader.parseFormData(upload));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use('/ads', adsRouter);
app.use('/types', typesRouter);
app.use('/auth', authRouter);
app.use('/subscriptions', subscriptionsRouter);

app.use(express.static(path.join(__dirname, '../', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
});

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

app.listen(3001, () => {
  console.log(`Server listening...`);
});