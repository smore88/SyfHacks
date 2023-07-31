[SUMMARY]
* Building a CRUD application: backend server = Node.js + Express for REST APIs
* front-end = ReactJS with React router, Axios & Bootstrap
* db = mySQL

[STRUCTURE]
* mysql             backend db
* nodejs server     backend server
* ReactJS           front end

* relook at this: https://www.bezkoder.com/react-node-express-mysql/  

[DOCKER]
* I am trying to use docker to host mysql as a container
* the data_vol folder is being used to store the records and db holds the DOCKERFILE and the configurations

[STEPS]
* cd into db
* docker build -t svmnew-mysql8 .
* Then you can see the docker image (docker images)
* Run the ./run.sh which contains the information to start the docker contains for the svm-mysql8
* Sometimes there are things already running in that case
*   - sudo lsof -i :3306
*   - sudo kill <PID>
* Now you should see in the docker container under status says "Running"

* run into any docker container errors use this
* docker logs <container_id>

* when we want to run the server side in the local host do "node server.js"

* from the client folder do "npx create-react-app ."

* install bootstrap in the client folder 