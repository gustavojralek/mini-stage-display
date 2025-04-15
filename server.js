const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Reemplazá con la IP real de tu Mac y el puerto que te muestra ProPresenter
const PRO_API = 'http://192.168.0.123:58663/v1';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', async (req, res) => {
    try {
        const pres = await axios.get(`${PRO_API}/presentation/active`);
        const msg = await axios.get(`${PRO_API}/stage/message`);

        const current = pres.data.presentation.currentSlide?.text || '[VACÍO]';
        const next = pres.data.presentation.nextSlide?.text || '[—]';
        const message = msg.data?.message || '';

        res.json({ current, next, message });
    } catch (e) {
        res.json({ current: '[Error]', next: '[Error]', message: e.message });
    }
});

app.listen(PORT, () => {
    console.log(`Mini Stage Display corriendo en http://localhost:${PORT}`);
});