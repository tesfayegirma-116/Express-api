const express = require('express');
const path = require('path')
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();



//handlebars middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //for form data

//home page route
app.get('/', (req, res) => res.render('index',{
    title: 'Member app',
    members
}));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/members', require('./routes/api/members'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));