const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');

let server;
mongoose
  .connect(
    'mongodb+srv://fahad:<password>@cluster0.taonqzd.mongodb.net/test'
  )
  .then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(config.port, '0.0.0.0', () => {
      console.log(`Listening to port ${config.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
