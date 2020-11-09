const express = require('express');
const app = express();

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`Express *Rodando na Porta ${PORT}*`);
});

app.get('/', (req, res) => {
    res.send("Project Ok");
});