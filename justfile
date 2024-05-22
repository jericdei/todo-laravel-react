start:
    docker compose up -d
stop:
    docker compose down
restart: stop && start
rebuild:
    docker compose up -d --build --force-recreate --remove-orphans
php *command:
    docker compose exec -u 1000 app php {{command}}
composer *command:
    docker compose exec -u 1000 app composer {{command}}
artisan *command:
    docker compose exec -u 1000 app php artisan {{command}}
bun *command:
    docker compose exec -u 1000 app bun {{command}}
dev *command:
    docker compose exec -u 1000 app bun dev {{command}}