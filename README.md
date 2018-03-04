# nanoTwitter

Team Japan and Kevin

## Usage
### Requirements
These are required for your local development environment:

* [NPM](https://www.npmjs.com/)
* [NodeJS](https://nodejs.org/)
* [Mysql Server](https://www.mysql.com/)

### STEP 1: Clone the repository
```sh
$ git clone https://github.com/AkibaSato/NanoTwitter
```

### Step 2: Install the necessary modules
Install `sequelize` to global directory to just use `sequelize` prefix instead of specifying path name to binary for commands.
```sh
$ npm install
$ npm install -g sequelize-cli
```

### STEP 3: Start the Postgres server
```sh
// Postgres directory might be: /usr/local/var/postgres
$ pg_ctl -D <Postgres directory> start
```

### STEP 4: Create the database on your local machine
```sh
$ sequelize db:migrate
```

### STEP 5: Run the app locally
```sh
$ npm install
$ node index.js
```
Point your browser to http://localhost:3000 and voila!

## Notes for developers

### Local Development
To connect to the Postgres shell:
```sh
$ psql ntdev
```

To create migrations:
```sh
// Example of creating a new model. This creates a boilerplate
// migration and model file with the basic columns.
$ sequelize model:create --name Tweet \
  --attributes fname:string,bio:text
// Further modify the migration file and model file if necessary.
// Any changes to either file must be reflected in the other manually.
$ sequelize db:migrate
// If you want to undo the migration.
$ sequelize db:migrate:undo
```

### Heroku Deployment
To migrate Postgres models on Heroku:
```sh
$ heroku sequelize db:migrate --env production
// Check results of change in Postgres shell.
$ heroku pg:psql
```

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
- [ ] Implement test interface.
- [ ] Setup automatic deployment.
- [ ] Load seed data.
- [x] Migrated to Postgres and configured Heroku accordingly.

## Mockups
![UI Design 1: Front Page](design/ui_design_1.png)
![UI Design 2: Your User Page](design/ui_design_2.png)
![UI Design 3: Other User Page](design/ui_design_3.png)
