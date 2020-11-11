const express       = require('express');
const db            = require('./db/connection');
const app           = express();
const bodyParser    = require('body-parser')

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log(`Express *Rodando na Porta ${PORT}*`);
});

//body parser
app.use(bodyParser.urlencoded({extended: false}));

// DB
db
.authenticate()
.then(() => {
    console.log('Connection DB Success');
})
.catch(err => {
    console.log("Error DB conection: " + err);
})


// Routes
app.get('/', (req, res) => {
    res.send("Project Ok");
});

// Route Article
app.use('/article', require('./routes/articles'));

// Route Event
app.use('/event', require('./routes/events'));

// Router Contract
app.use('/contract', require('./routes/contracts'));