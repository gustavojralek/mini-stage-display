const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Reemplazá con la IP real de tu Mac y el puerto que te muestra ProPresenter
const PRO_API = 'http://localhost:58663/v1';

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