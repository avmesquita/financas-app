@ECHO OFF
@ECHO Docker-Compose BUILDing...
docker-compose build --no-cache --pull
@ECHO Docker-Compose is going to UP
docker-compose up -d --force-recreate
