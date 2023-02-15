const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const passport = require('passport');
const { jwtStrategy } = require('./config/passport');
const { errorConverter, errorHandler } = require('./middlewares/error');

app.use(express.json());
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/v1', routes);
app.use(errorConverter);
app.use(errorHandler);


module.exports = app;