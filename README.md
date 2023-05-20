# smart-farm-server

## Build docker compose locally:
    git clone https://github.com/Sunny1928/smart-farm-server.git
    docker compose up

## Use docker compose with arm:

#### first install: 
    docker pull sunny1928/smart_farm
    // download docker-compose manually

#### start container:
    docker compose up
    
#### stop container:
    docker compose stop


## Without docker:

#### first install:
    git clone https://github.com/Sunny1928/smart-farm-server.git
    npm install

#### run command: 
    npm run start

## Test
    go to http://localhost:8088/#/manage add a new farm, the register with farm_id: 1
