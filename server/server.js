
const express = require('express');
const { decrypt, encrypt } = require('./encryption');
const path = require('path');

const app = express(); // Create an express app object
const port = 3000;

app.use(express.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '..', 'client')));
// app.use(express.static(__dirname + '/static'));

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
    // Send the 'index.html' file as the response
    res.sendFile(path.join(__dirname,'..', 'client', 'index.html'));
    // res.sendFile(path.join(__dirname, 'client', 'style.css'));
});

app.post('/encrypt', (req, res) => {
    // Your encryption logic here
    console.log(req.body);
    const data = encrypt(req.body.text, req.body.encryptionKey);
    console.log(data);
    // return data;
    res.json({
        encryptedText: data
    })
});

app.post('/decrypt', (req, res) => {
    // Your decryption logic here
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});