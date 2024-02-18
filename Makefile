# Définir le shell par défaut
SHELL := /bin/bash

# Définir les cibles phony qui ne correspondent pas à des fichiers
.PHONY: up down

# Cible pour démarrer les conteneurs
up:
	@echo "Démarrage des conteneurs..."
	docker compose up --build

# Cible pour arrêter les conteneurs
down:
	@echo "Arrêt des conteneurs..."
	docker compose down

# Cible pour afficher les logs des conteneurs
logs:
	@echo "Affichage des logs..."
	docker compose logs -f


fclean:
	docker stop $(docker ps -aq); docker rm $(docker ps -aq); docker volume rm $(docker volume ls); docker system prune;docker volume prune;
