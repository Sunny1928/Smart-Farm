# smart-farm-server

### Using docker compose:

#### first install: 
    docker pull sunny1928/smart_farm
    download docker-compose

#### start container:
    docker compose up
    (it might cause a problem, so stop it and run again)
    
#### stop container:
    docker compose down


### Without docker:

#### first install:
    git clone https://github.com/Sunny1928/smart-farm-server.git
    npm install

#### run command: 
    npm run start

## Test
    go to http://localhost:8088/#/manage add a new farm, the register with farm_id: 1
