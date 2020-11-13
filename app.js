const express       = require('express')
const db            = require('./db/connection')
const app           = express()
const bodyParser    = require('body-parser')
const path          = require('path')
const exphbs        = require('express-handlebars')

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
    console.log(`Express *Rodando na Porta ${PORT}*`);
});

//body parser
app.use(bodyParser.urlencoded({extended: false}));

// handble bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'app'}));
app.set('view engine', 'handlebars');


// static folder
app.use(express.static(path.join(__dirname, 'public')));

// DB
db
.authenticate()
.then(() => {
    console.log('Connection DB Success');
})
.catch(err => {
    console.log("Error DB conection: " + err);
})


// Routes Welcome
app.get('/', (req, res) => {
    res.render("welcomeHome", {layout: 'welcome'});
});
app.get('/about', (req, res) => {
    res.render("welcomeAbout", {layout: 'welcome'});
});


// Route Aplicative
app.get('/aplicativo', (req, res) => {
    res.render('home')
})

// Route Article
app.use('/aplicativo/article', require('./routes/articles'));

// Route Event
app.use('/aplicativo/event', require('./routes/events'));

// Router Contract
app.use('/aplicativo/contract', require('./routes/contracts'));