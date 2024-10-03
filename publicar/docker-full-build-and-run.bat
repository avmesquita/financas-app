@ECHO OFF
@ECHO Checking configuration environment...
set config_file="%CD%\.env"
set sample="%CD%\.env.exemplo"
if not exist %config_file% (
    @ECHO Generating config file...
    copy %sample% %config_file%
    @ECHO .
) else (
    @ECHO Config file already exists.
    @ECHO .
)
@ECHO Docker-Compose BUILDing...
docker-compose build --no-cache --pull
@ECHO .
@ECHO Docker-Compose is going to UP
docker-compose up -d --force-recreate
