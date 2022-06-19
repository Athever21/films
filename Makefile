run:
	docker-compose pull
	docker-compose up -d --remove-orphans

rebuild:
	docker-compose build
	docker-compose up -d --remove-orphans