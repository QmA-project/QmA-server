var express = require('express');
var app = express();

var authRouter = require('./routes/auth');
var questionRouter = require('./routes/question');
var groupRouter = require('./routes/group');
var likedRouter = require('./routes/liked');


app.use(express.json());

app.use('/auth', authRouter);
app.use('/questions', questionRouter);
app.use('/groups', groupRouter);
app.use('/liked', likedRouter);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broken!')
});

app.listen(3000, function() {
    console.log('success!!');
});