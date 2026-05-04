# SSL Kurulum Talimatları

## 🔐 Mevcut Durum
- ✅ HTTPS aktif (self-signed sertifika)
- ✅ HTTP → HTTPS yönlendirmesi
- ✅ HSTS güvenlik header'ı
- ❓ Let's Encrypt sertifikası

## 🚀 Let's Encrypt Kurulumu

Domain adınız varsa ve DNS ayarları tamamlandıysa, şu komutu çalıştırın:

```bash
cd /root/evom/project-a
./setup-ssl.sh example.com admin@example.com
```

Örnek:
```bash
./setup-ssl.sh konaklama.com admin@konaklama.com
./setup-ssl.sh api.myapp.tr support@myapp.tr
```

## 📋 Ön Koşullar

Let's Encrypt için sertifika almadan önce:

1. **Domain DNS'i ayarlanmış olmalı**
   ```bash
   # Domain'i bu sunucunun IP'sine yönlendir
   A record: example.com → YOUR_SERVER_IP
   ```

2. **Port 80 ve 443 açık olmalı**
   ```bash
   # Kontrolü
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

3. **Email adresi gerekli**
   - Let's Encrypt bildirimleri için
   - Sertifika yenileme hatası durumunda

## 🔄 Otomatik Yenileme

Sertifika her 90 günde bir otomatik yenilenmelidir:

```bash
# Cron job ekle
sudo crontab -e

# Satırı ekle:
0 3 * * * /usr/bin/certbot renew --quiet --no-eff-email
```

Veya Docker'da bir renewal service ekle:

```yaml
certbot:
  image: certbot/certbot:latest
  volumes:
    - ./nginx/ssl:/etc/letsencrypt
  entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew --quiet; sleep 12h & wait $${!}; done'"
  networks:
    - frontend
```

## 🔒 SSL Test

Kurulduktan sonra kontrol et:

```bash
# HTTPS test
curl -I https://example.com

# Sertifika bilgileri
openssl s_client -connect example.com:443

# SSL Rating (ssllabs.com benzeri)
# https://www.ssllabs.com/ssltest/analyze.html?d=example.com
```

## 📁 Dosya Konumları

```
nginx/ssl/
├── certificate.crt    (Public sertifika)
└── private.key        (Private anahtar)
```

## ⚠️ Notlar

- Let's Encrypt sertifikaları **90 gün** geçerli
- Otomatik yenileme 30 gün öncesinden başlayabilir
- Self-signed sertifika test için tamam ama production'a uygun değil
- HTTPS zorunlu önemli işlemler için (login, ödeme vb.)

## 🆘 Sorun Giderme

```bash
# Certbot logları
sudo cat /var/log/letsencrypt/letsencrypt.log

# Sertifika detayları
sudo certbot certificates

# Manuel yenileme
sudo certbot renew --dry-run

# Sertifika silme (yeni domain için)
sudo certbot delete --cert-name example.com
```
