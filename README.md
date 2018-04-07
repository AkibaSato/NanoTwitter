
# nanoTwitter

Team Japan and Kevin

## Services
**Main application**
* Github: https://github.com/AkibaSato/NanoTwitter
* Heroku: http://nanotwitter-tjak.herokuapp.com/
* Port: 3000

**User Service**
* Github: https://github.com/mgkbsh/ntUserService
* Heroku: http://ntusers-tjak.herokuapp.com/
* Port: 1234

**Tweet Service**
* Github: https://github.com/mgkbsh/ntTweetService
* Heroku: http://nttweets-tjak.herokuapp.com/
* Port: 4567

**Search Service**
* Github: https://github.com/mgkbsh/ntSearchService
* Heroku:
* Port: 6000

## Usage
### Requirements
These are required for your local development environment:

* [NPM](https://www.npmjs.com/)
* [NodeJS](https://nodejs.org/)
* [Postgres Server](https://www.postgresql.org/)
* [Redis](https://redis.io/)

### STEP 1: Clone the repository
```sh
$ git clone https://github.com/AkibaSato/NanoTwitter
```

### STEP 2: Install the necessary modules
Install `sequelize` to global directory to just use `sequelize` prefix instead of specifying path name to binary for commands:
```sh
$ npm install
$ npm install -g sequelize-cli
```

### STEP 3: Start the Postgres server
Postgres directory might be: /usr/local/var/postgres
```sh
$ pg_ctl -D <Postgres directory> start
```

### STEP 4: Create the database on your local machine
```sh
$ sequelize db:migrate
```

### STEP 5: Run the app locally
```sh
$ node index.js
```
Point your browser to http://localhost:3000 and voila!

## Notes for developers
```sh
  sequelize db: [create/migrate/drop] --env [development/test]
```

### Local Development
To connect to the Postgres shell:
```sh
$ psql ntdev
```

#### Create migrations
First create a boilerplate migration and model file with the basic columns. This example creates a new model:
```sh
$ sequelize model:create --name User --attributes fname:string,bio:text
```

Further modify the migration file and model file if necessary. Any changes to either file must be reflected in the other manually.

To migrate:
```sh
$ sequelize db:migrate
```
If you want to undo the migration:
```
$ sequelize db:migrate:undo:all
```

### Heroku Deployment
To migrate Postgres models on Heroku:
```sh
$ heroku sequelize db:migrate --env production
```
Check results of change in Postgres shell.
```sh
$ heroku pg:psql
```

### Testing
To run tests, run:
npm test

## Change History
### nanoTwitter 0.1: Foundation
- [x] Setup Github with `LICENSE.txt`, `README.md`, `version.rb`.
- [x] Design relational database schema.
- [x] Design and layout user interface of nT.
- [x] Design API interface.
- [x] Explored several options such as MongoDB, Node.js, GraphQL, etc.

### nanoTwitter 0.2: MVP - First Minimal Implementation
- [x] Create skeleton app using MongoDB and Express.
- [x] Create migration for database.
- [x] Implement authentication for login and logout using `bcrypt`.
- [x] Configured Heroku and deployed skeleton.

### nanoTwitter 0.3: Core functionality
- [ ] Write unit tests.
- [x] Implement test interface.
- [x] Setup automatic deployment.
- [x] Load seed data.
- [x] Migrated to Postgres and configured Heroku accordingly.

### nanoTwitter 0.4: Testing and Deployment
- [ ] Perform simultaneous manual testing.
- [x] Implement the complete test interface.
- [x] Use loader.io to generate some artificial loads.
- [ ] Add tests to test suite.

### nanoTwitter 0.5: Initial Load Testing
- [ ] Instrument app to collect performance data.
- [ ] Run load experiments.
- [ ] Switch web server from WebBrick; try others, measure.
- [x] Update schema to put indices and other enhancements.

## Mockups
![UI Design 1: Front Page](design/ui_design_1.png)
![UI Design 2: Your User Page](design/ui_design_2.png)
![UI Design 3: Other User Page](design/ui_design_3.png)
