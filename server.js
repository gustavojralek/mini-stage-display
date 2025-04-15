const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const API_BASE = `${config.endpoint}:${config.port}/v1`;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', async (req, res) => {
    try {
        const slideRes = await axios.get(`${API_BASE}/status/slide?chunked=false`);
        const current = slideRes.data.current?.text || '[EMPTY]';
        const next = slideRes.data.next?.text || '[—]';

        const messageRes = await axios.get(`${API_BASE}/stage/message`);
        const message = messageRes.data?.message || '';

        res.json({ current, next, message });
    } catch (err) {
        console.error('ERROR:', err.message);
        res.json({ current: '[Error]', next: '[Error]', message: err.message });
    }
});

app.listen(3000, () => {
    console.log('Mini Stage Display running at http://localhost:3000');
});