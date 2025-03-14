# Building a Docker Image

```sh
docker build --no-cache -t node-starter:latest .
```


# Running a Docker Image

```sh
docker run -p 80:80 node-starter:latest
```

# With Docker-Compose

```sh
docker-compose up --build --watch
```

# Docker Stuff

```sh
docker rm -f $(docker ps -a -q)
```
