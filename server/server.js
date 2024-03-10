const express = require('express');
const { decrypt, encrypt } = require('./encryption');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.post('/encrypt', (req, res) => {
    try {
        const data = encrypt(req.body.text, req.body.encryptionKey);
        res.json({ encryptedText: data });
    } catch (error) {
        console.error('Encryption failed:', error.message);
        res.status(500).json({ error: 'Encryption failed' });
    }
});

app.post('/decrypt', (req, res) => {
    try {
        const decryptedText = decrypt(req.body.encryptedText, req.body.encryptionKey);
        res.json({ decryptedText });
    } catch (error) {
        console.error('Decryption failed:', error.message);
        res.status(500).json({ error: 'Decryption failed' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});