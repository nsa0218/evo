#!/bin/bash
set -e

echo "🚀 Konaklama Platform - Deploy"
echo "================================"

cd "$(dirname "$0")/.."

# .env kontrolü
if [ ! -f .env ]; then
    echo "⚠️  .env dosyası bulunamadı. .env.example kopyalanıyor..."
    cp .env.example .env
    echo "📝 .env dosyasını düzenleyin: nano .env"
    exit 1
fi

echo "📦 Docker imajları build ediliyor..."
docker compose build

echo "🔄 Servisler başlatılıyor..."
docker compose up -d

echo "⏳ Servislerin hazır olması bekleniyor..."
sleep 10

echo "🔍 Sağlık kontrolü..."
for i in {1..30}; do
    if curl -sf http://localhost/api/health > /dev/null 2>&1; then
        echo "✅ API hazır!"
        break
    fi
    echo "  Bekleniyor... ($i/30)"
    sleep 2
done

echo ""
echo "================================"
echo "✅ Deploy tamamlandı!"
echo ""
echo "🌐 Web:      http://localhost"
echo "📡 API:      http://localhost/api"
echo "📚 Swagger:  http://localhost/api/docs"
echo "🗄️  MinIO:    http://localhost:9001"
echo "================================"
