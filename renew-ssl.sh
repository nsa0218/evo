#!/bin/bash

# SSL Renewal Script - Certbot ile otomatik yenileme
# Cron job: 0 3 * * * /root/evom/project-a/renew-ssl.sh

set -e

echo "🔄 SSL Sertifikası Yenileme Başlandı..."
echo "Zaman: $(date)"

# Nginx durdur
cd /root/evom/project-a
echo "🛑 Nginx durdurulüyor..."
docker compose stop nginx || true
sleep 2

# Sertifikayı yenile
echo "⏳ Let's Encrypt sertifikası yenileniyor..."
certbot renew --non-interactive --quiet

# Yenilenen sertifikaları kopyala
echo "📋 Sertifikaları Nginx'e kopyalanıyor..."
if [ -f /etc/letsencrypt/live/www.evomstay.com/fullchain.pem ]; then
    cp /etc/letsencrypt/live/www.evomstay.com/fullchain.pem /root/evom/project-a/nginx/ssl/certificate.crt
    cp /etc/letsencrypt/live/www.evomstay.com/privkey.pem /root/evom/project-a/nginx/ssl/private.key
fi

# Nginx başlat
echo "✅ Nginx başlatılıyor..."
docker compose start nginx

echo "✨ SSL Yenileme Tamamlandı!"
echo "Sertifika Bilgileri:"
openssl x509 -in /root/evom/project-a/nginx/ssl/certificate.crt -noout -dates -subject
