const express = require('express');
const cors = require('cors')
const app = express();

const {PORT = 3030} = process.env;

app.use(cors());
app.use(express.json())

const data = {
    users: [
        {
            id: 1,
            email: 'useremail@email.com',
            password: 'password1',
            token: 'test123'
        }
    ]
}

app.use('/user/signin', (req, res) => {
    if (req.body.email === data.users[0].email && req.body.password === data.users[0].password) {
        res.send({
            token: data.users[0].token
        });
    } else {
        res.status(400)
    }

});

//need to use mongo db and implement proper post/get requests
// app.get('/', function (req, res) {
//     res.send('Hello World')
// })


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

