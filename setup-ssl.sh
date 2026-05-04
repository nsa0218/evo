#!/bin/bash

# SSL Setup Script - Let's Encrypt ile Otomatik Yenileme
# Kullanım: ./setup-ssl.sh example.com

if [ -z "$1" ]; then
    echo "❌ Hata: Domain adı gereklidir"
    echo "Kullanım: ./setup-ssl.sh example.com"
    exit 1
fi

DOMAIN=$1
SSL_DIR="./nginx/ssl"
EMAIL="${2:-admin@${DOMAIN}}"

echo "🔐 Let's Encrypt SSL Kurulumu Başlıyor..."
echo "📧 Email: $EMAIL"
echo "🌍 Domain: $DOMAIN"

# Certbot yüklü mü kontrol et
if ! command -v certbot &> /dev/null; then
    echo "📦 Certbot yükleniyor..."
    apt-get update && apt-get install -y certbot python3-certbot-nginx
fi

# Mevcut nginx container'ını durdur (certbot için port 80 gerekli)
echo "🛑 Nginx container durdurulüyor..."
docker compose down

# Sertifika oluştur
echo "⏳ Let's Encrypt sertifikası talep ediliyor (bu 1-2 dakika sürebilir)..."
certbot certonly --standalone \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" \
    --email "$EMAIL" \
    --agree-tos \
    --non-interactive \
    --preferred-challenges http

if [ $? -eq 0 ]; then
    echo "✅ Sertifika başarıyla oluşturuldu!"
    
    # Sertifikaları nginx klasörüne kopyala
    mkdir -p "$SSL_DIR"
    cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem "$SSL_DIR/certificate.crt"
    cp /etc/letsencrypt/live/$DOMAIN/privkey.pem "$SSL_DIR/private.key"
    
    # Nginx config'ini domain ile güncelle
    sed -i "s/server_name localhost;/server_name $DOMAIN www.$DOMAIN;/g" ./nginx/conf.d/default.conf
    
    echo "✅ SSL Ayarları Güncellendi!"
    echo ""
    echo "🚀 Services başlatılıyor..."
    docker compose up -d
    
    echo ""
    echo "✨ Setup Tamamlandı!"
    echo "🔗 https://$DOMAIN adresinden erişebilirsiniz"
    echo ""
    echo "📅 Sertifika Yenileme:"
    echo "   Otomatik yenileme: certbot renew --quiet --no-eff-email"
    echo "   Cron job (günde bir kez): 0 3 * * * /usr/bin/certbot renew --quiet"
    
else
    echo "❌ Sertifika oluşturulamadı. Kontrol edin:"
    echo "   1. Domain adı doğru mu?"
    echo "   2. Domain'in DNS'i bu sunucuya yönlendirilmiş mi?"
    echo "   3. Port 80 açık mı?"
    exit 1
fi
