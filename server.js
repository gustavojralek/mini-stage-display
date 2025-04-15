const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PRO_API = fs.readFileSync(path.join(__dirname, 'config'), 'utf-8').trim();
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', async (req, res) => {
    try {
        const slideStatus = await axios.get(`${PRO_API}/status/slide?chunked=false`);
        const current = slideStatus.data.current?.text || '[VACÍO]';
        const next = slideStatus.data.next?.text || '[—]';

        const msgResp = await axios.get(`${PRO_API}/stage/message`);
        const message = msgResp.data?.message || '';
        console.log('Mensaje de Stage:', message);

        res.json({ current, next, message });
    } catch (e) {
        console.error('ERROR:', e.message);
        res.json({ current: '[Error]', next: '[Error]', message: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Mini Stage Display corriendo en http://localhost:${PORT}`);
});