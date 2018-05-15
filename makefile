.DEFAULT_GOAL := start

.PHONY: api start client stop-server stop-client stop server restart reinstall

api:
	php ~/dev/isd/kfetmanager-api/artisan serve &

server:
	make api

client:
	BROWSER=none npm run start &

start:
	make api
	make client

stop-server:
	fuser -k 8000/tcp

stop-client:
	fuser -k 3000/tcp

stop:
	make stop-client
	make stop-server

restart:
	make stop
	make start

reinstall:
	npm install
	make restart