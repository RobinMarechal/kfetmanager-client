.DEFAULT_GOAL := start

.PHONY: api start client stop-server stop-client stop server

api:
	php ~/dev/isd/kfetmanager-api/artisan serve &

server:
	make api

client:
	npm run start &

start:
	make start-api
	make npm run start

stop-server:
	fuser -k 8000/tcp

stop-client:
	fuser -k 3000/tcp

stop:
	make stop-client
	make stop-server





