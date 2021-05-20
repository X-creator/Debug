const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const bodyParser = require('body-parser');


db.sync();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'));
app.use('/api/game', game);
app.listen(process.env.PORT,function() {
    console.log("App is listening on 4000");
});