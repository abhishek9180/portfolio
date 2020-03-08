const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs')

const app = express();
const port = process.env.PORT || 5000;

app.set('port', port);
const server = http.createServer(app);

app.use(express.json());

// Add headers
app.use('/api/*', function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Content-Type', 'application/json');
    // Pass to next layer of middleware
    next();
});


// static routes
app.get(['/', '/index.html'], function (req, res) {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

// download cv
app.get('/getCV', function (req, res) {
    // send file
    // const stream = fs.createReadStream('./downloads/abhishek_cv.pdf');
    // const stat = fs.statSync('./downloads/abhishek_cv.pdf');
    // res.setHeader('Content-Type', 'application/pdf')
    // res.setHeader('Content-Disposition', 'attachment; filename=abhishek_jha.pdf')
    // stream.pipe(res);
    res.download('./downloads/abhishek_cv.pdf');
});

// place after html routes to restrice access of html files directly
app.use(express.static(path.join(__dirname, 'dist')));

// Handle invalid routes
app.use('*', (req, res) => {
    res.status(404).send('Not found');
})


server.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`open url http://localhost:${port}`);
})

