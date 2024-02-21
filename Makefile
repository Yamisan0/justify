SHELL := /bin/bash


.PHONY: up down

up:
	@echo "Running containers..."
	docker compose up --build


down:
	@echo "Stopping containers..."
	docker compose down


logs:
	@echo "Displaying logs..."
	docker compose logs -f


fclean:
	@echo "Removing all containers and volumes..."
	docker stop $(docker ps -aq); docker rm $(docker ps -aq); docker volume rm $(docker volume ls); docker system prune;docker volume prune;
