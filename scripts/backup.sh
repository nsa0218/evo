#!/bin/bash
set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

mkdir -p $BACKUP_DIR

echo "📦 Backup başlıyor... $TIMESTAMP"

# PostgreSQL
echo "🗄️  PostgreSQL dump..."
docker exec platform-postgres pg_dump -U ${POSTGRES_USER:-platform_user} ${POSTGRES_DB:-konaklama_db} | gzip > "$BACKUP_DIR/db_$TIMESTAMP.sql.gz"

# MinIO data
echo "📁 MinIO backup..."
docker exec platform-minio mc alias set local http://localhost:9000 ${MINIO_ROOT_USER:-minioadmin} ${MINIO_ROOT_PASSWORD:-change_me} 2>/dev/null
docker exec platform-minio mc mirror local/platform-media /tmp/minio_backup 2>/dev/null
docker cp platform-minio:/tmp/minio_backup "$BACKUP_DIR/minio_$TIMESTAMP" 2>/dev/null || echo "  MinIO backup atlandı"

# Eski backup'ları sil (30 günden eski)
find $BACKUP_DIR -mtime +30 -delete 2>/dev/null

echo "✅ Backup tamamlandı: $BACKUP_DIR"
ls -lh "$BACKUP_DIR/db_$TIMESTAMP.sql.gz"
