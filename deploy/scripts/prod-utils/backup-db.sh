cd ~/foosball-rating
docker-compose exec -T PostgreSQL pg_dump -U zero -Fc foosball-rating > ~/foosball-rating-backups/backup_`date +%d-%m-%Y"_"%H_%M_%S`.dump
