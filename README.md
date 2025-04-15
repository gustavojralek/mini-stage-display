
# 📺 Mini Stage Display

A minimal, full-screen stage display system for ProPresenter 7.  
Perfect for churches, conferences or musicians needing a **clean, fast, Raspberry-ready** way to monitor slides, lyrics, and stage messages.

---

## ⚡ Quick Install (one-liner)

```bash
curl -sL https://raw.githubusercontent.com/gustavojralek/mini-stage-display/main/setup-stage-display.sh | bash
```

You’ll be asked to:
- Choose between full install or just updating ProPresenter API config (IP/port)
- Input your API IP and port (defaults: `localhost` + `58663`)

---

## 🚀 Features

- Works with **ProPresenter 7’s API**
- No need for external apps — just a browser!
- Auto-start on boot using **PM2**
- Responsive fullscreen UI
- Works great on **Raspberry Pi**
- Includes **QR code** for quick mobile access

---

## 🧰 Manual Setup

### 1. Clone the repo

```bash
git clone https://github.com/gustavojralek/mini-stage-display.git
cd mini-stage-display
```

### 2. Make the setup script executable

```bash
chmod +x setup-stage-display.sh
```

### 3. Run the setup

```bash
./setup-stage-display.sh
```

You’ll be asked for your ProPresenter API IP and port.

---

## 🔁 Auto-start on boot (included in setup)

This project uses [PM2](https://pm2.keymetrics.io/) to:

- Launch the Node server
- Save it for auto-restart
- Set it up as a startup service

If PM2 isn’t installed, it will be added automatically.

---

## 🧪 Update IP and Port only

If you move ProPresenter to another machine or change its IP:

```bash
./setup-stage-display.sh
```

Then choose the **`update`** option when prompted.  
It will rewrite the `config.json` without touching the app.

---

## 📍 Accessing the Display

Once installed, just open a browser on your network and go to:

```
http://<raspberry-ip>:3000
```

Or scan the **QR code** shown in the corner of the stage display screen.

---

## 📦 Dependencies

- Node.js & npm
- git
- chromium-browser or firefox (optional, for fullscreen launch)

---

## ❤️ Credits

Built with 💡 by [@gustavojralek](https://github.com/gustavojralek)  
For churches, worship teams, and anyone who needs a no-nonsense stage monitor.
