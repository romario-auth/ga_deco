const express        = require('express')
const exphbs         = require('express-handlebars')
const db             = require('./db/connection')
const bodyParser     = require('body-parser')
const path           = require('path')
const cookieParser   = require('cookie-parser')
const expressSession = require('express-session')
const RedisStore     = require('connect-redis')(expressSession)
const csrf           = require('csurf')

const {credentials} = require('./config')

const app           = express()

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
    console.log(`Express *Rodando na Porta ${PORT}*`);
});

// handblebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'app',
    helpers: {
        section: function(name, options) {
          if(!this._sections) this._sections = {}
          this._sections[name] = options.fn(this)
          return null
        },
      },
}))
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

  
// Cookie and Session store in Redis Lab
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
  store: new RedisStore({
      url: credentials.redis.url,
      logErrors: true
  })
}))

// csurf Token
app.use(csrf({ cookie: true }))
app.use((req, res, next) => {
    res.locals._csrfToken = req.csrfToken()
    next()
})

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

// Gadget Home
// Router Contract
app.use('/aplicativo/gadget', require('./routes/gadgets'));

// Gadget Calendar
// Router Calendar
app.get('/aplicativo/gadget/calendar', (req, res) => {
    res.render("calendar");
});