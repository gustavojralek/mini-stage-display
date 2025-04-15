#!/bin/bash

echo "🛠️  Stage Display Setup"

read -p "❓ Do you want to (i)nstall or (u)pdate config only? [i/u]: " ACTION

if [[ "$ACTION" == "u" ]]; then
  echo "🔧 Update ProPresenter API Config"

  read -p "📍 New IP (default: localhost): " IP
  IP=${IP:-localhost}

  read -p "🔌 New Port (default: 58663): " PORT
  PORT=${PORT:-58663}

  if [ ! -f config.json ]; then
    echo "❌ config.json not found. Are you in the project directory?"
    exit 1
  fi

  cat > config.json <<EOF
{
  "endpoint": "http://$IP",
  "port": $PORT
}
EOF

  echo "✅ Configuration updated!"
  exit 0
fi

# -------------------- FULL INSTALL FLOW --------------------

read -p "📍 Enter ProPresenter API IP (default: localhost): " IP
IP=${IP:-localhost}

read -p "🔌 Enter ProPresenter API Port (default: 58663): " PORT
PORT=${PORT:-58663}

if ! command -v git &> /dev/null; then
  echo "📥 Git not found, installing..."
  sudo apt update
  sudo apt install -y git
fi

echo "📦 Cloning repo..."
git clone https://github.com/gustavojralek/mini-stage-display.git
cd mini-stage-display || exit 1

echo "⚙️  Writing config.json..."
cat > config.json <<EOF
{
  "endpoint": "http://$IP",
  "port": $PORT
}
EOF

if ! command -v node &> /dev/null; then
  echo "⚙️ Node.js not found, installing..."
  sudo apt update
  sudo apt install -y nodejs npm
fi

echo "📦 Installing dependencies..."
npm install

echo "⚙️ Setting up PM2 to manage the server..."

if ! command -v pm2 &> /dev/null; then
  echo "📦 Installing PM2..."
  npm install -g pm2
fi

pm2 start server.js --name stage-display
pm2 save
eval $(pm2 startup | tail -1)

echo "✅ PM2 setup complete! The server will auto-start on boot."

sleep 2

echo "🌐 Launching browser in fullscreen..."
if command -v chromium-browser &> /dev/null; then
  chromium-browser --start-fullscreen http://localhost:3000 &
elif command -v firefox &> /dev/null; then
  firefox --kiosk http://localhost:3000 &
else
  echo "⚠️  No supported browser found (chromium-browser or firefox)"
fi