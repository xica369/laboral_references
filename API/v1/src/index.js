const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

app.use(cors())

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./routes/index'));
app.use('/api/v1/candidates', require('./routes/candidates'));
app.use('/api/v1/laboral_references', require('./routes/laboral_references'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});