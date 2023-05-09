const express = require('express')
const app = express()

const {PORT = 3030} = process.env;

app.get('/', function (req, res) {
    res.send('Hello World')
})

// app.listen(3030)
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});