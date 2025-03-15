# NodeJS Docker Starter Project

## Using Docker Compose

To build and run a local Docker container. The following will watch for,
and immediately rebuild/restart the container on any changed files.

```sh
make dev
```

The following will run a production configuration:

```sh
make prod
```

## Using Docker

### Building a Docker Image

```sh
docker build -t node-starter:latest .
```

### Running a Docker Image

```sh
docker run -p 80:80 node-starter:latest
```

### With Docker-Compose

```sh
docker-compose up --build --watch
```

## Misc. Docker Stuff

```sh
docker rm -f $(docker ps -a -q)
```

Tagging local image

```sh
docker tag node-starter:latest cmumford/node-starter:latest
```

Pushing to a registry (dockerhub)

```sh
docker push cmumford/node-starter:latest
```