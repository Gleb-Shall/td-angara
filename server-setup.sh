#!/bin/bash
# Скрипт настройки сервера для ТД Ангара
# Ubuntu 22.04 / Debian 12
# Запускать от root: bash server-setup.sh

set -e

echo "=== Обновление системы ==="
apt-get update && apt-get upgrade -y

echo "=== Установка базовых утилит ==="
apt-get install -y curl wget git unzip ufw

echo "=== Установка Node.js 20 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node -v && npm -v

echo "=== Установка PM2 (менеджер процессов) ==="
npm install -g pm2

echo "=== Установка PostgreSQL ==="
apt-get install -y postgresql postgresql-contrib

echo "=== Запуск PostgreSQL ==="
systemctl enable postgresql
systemctl start postgresql

echo "=== Создание базы данных ==="
sudo -u postgres psql <<SQL
CREATE USER tdangara WITH PASSWORD 'tdangara_pass';
CREATE DATABASE tdangara OWNER tdangara;
GRANT ALL PRIVILEGES ON DATABASE tdangara TO tdangara;
SQL

echo "=== Установка Nginx ==="
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx

echo "=== Настройка firewall ==="
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "=== Настройка Nginx как reverse proxy ==="
cat > /etc/nginx/sites-available/td-angara <<'NGINX'
server {
    listen 80;
    server_name _;

    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/td-angara /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo ""
echo "=== Сервер готов ==="
echo "Node.js: $(node -v)"
echo "npm:     $(npm -v)"
echo "PostgreSQL: запущен"
echo "Nginx: запущен"
echo ""
echo "DATABASE_URL для .env:"
echo "postgresql://tdangara:tdangara_pass@localhost:5432/tdangara"
