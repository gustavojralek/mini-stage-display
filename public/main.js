async function fetchData() {
    try {
        const res = await fetch('/data');
        const data = await res.json();
        document.getElementById('current').innerText = data.current;
        document.getElementById('next').innerHTML = `
      <div class="next-box">
        <div class="next-label">Next</div>
        <div class="next-text">${data.next}</div>
      </div>
    `;
        document.getElementById('msg').innerText = data.message;
    } catch (err) {
        document.getElementById('current').innerText = '[Error loading data]';
    }
}

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').innerText = `${h}:${m}`;
}

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.getElementById('qrcode').appendChild(canvas);

    new QRious({
        element: canvas,
        value: window.location.href,
        size: 100,
        background: 'white',
        foreground: 'black'
    });

    fetchData();
    updateClock();
    setInterval(fetchData, 1000);
    setInterval(updateClock, 1000);
});