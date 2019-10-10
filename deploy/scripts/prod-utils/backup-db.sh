cd /home/player/foosball-rating
/usr/local/bin/docker-compose exec -T PostgreSQL pg_dump -U zero -Fc foosball-rating > /home/player/foosball-rating-backups/backup_`date +%d-%m-%Y"_"%H_%M_%S`.dump 2>/tmp/cron-backup-db.errors.log
