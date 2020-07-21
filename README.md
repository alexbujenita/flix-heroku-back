# MyFlix Backend
A backend for retrieving films, saving them with personal content and with the possibility of having users.

## Installation
Clone the repo and:
```bash
$ npm install
```
Also you'll need sequelize-cli installed globally:
```bash
$ npm install -g sequelize-cli
```
The first thing is to run the migration with Sequelize:
```bash
$ sequelize-cli db:migrate
```
Then create a file used for the secret keys:
```bash
$ touch secrets.js
```
and populate like this:
```javascript
exports.API_KEY = "YOUR_TMDB_API_KEY";
exports.PRIVATE_KEY = "A RANDOM KEY TO SIGN THE JWT";
```
Finally you can run the server by:
```bash
$ npm start
```

## Routes breakdown
### Auth
#### Signing up
The route accepts a POST request with the body containing the first name, last name (the only optional field), a unique email address and a password, that will be hashed when saving it to the DB. It either responds with 201 if successful or a 500 status code if errors were encountered.
#### Signing in
The route accepts a POST request with the body containing the unique email address and the password. It finds the user by email and compares the hashed password with the received one, if successful it creates a JWT to be sent back to the client, if something doesn't match it send a 401 and if anything else goes wring a 404 status code.
### Actor movies
Accepts a GET request with the actor's ID in the params, it then goes through all the existing pages and builds a list with all of the actor's films. In case of error return 501.
### Movie
Accepts a GET request with the film's ID in the params, retrieves it and before sending it back to the client it caches it in a Map for future use. In case of error return 404.
### Movie credits
Accepts a GET request with the film's ID in the params, retrieves its credits and before sending it back to the client it caches it in a Map for future use. In case of error return 404.
### Movies
Accepts a GET request with an optional query &page=INT, and retrieves the films from TMDB sorted by popularity.
### Movie trailer
Accepts a GET request with the film's ID in the params, retrieves its trailer/s and before sending it back to the client it caches it in a Map for future use. In case of error return 404.
### Ping
A health check route. Responds to GET request to which, if alive, returns a 200 status code.
### Random
To be written...