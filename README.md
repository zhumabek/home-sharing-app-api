<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## How to work with migrations
Migration files are located at src/migrations folder.

```bash
# if you are running migrations for the first time run following command.
# It'll generate ormconfig.json file at the project root folder. 
# ormconfig.json file necessary for working with TypeORM Migration CLI. Don't commit file to the repository!!!
$ npm run pretypeorm

# generate new migration file
$ npm run migration:new

# run migration
$ npm run migration:up

# revert migration
$ npm run migration:down
```

## How to deploy an app to remote server

1. Remote server configurations
   1. install NodeJS version >= 12
   2. install PostgreSQL server version 10
   3. create a database on PostgreSQL server if it's not created
   4. install pm2 version 4.5.1
   5. install nginx version 1.14.0
   6. configure nginx reverse proxy so that if request location path is "/api/" defaults to port 8000(nginx configuration is located at project root directory)

2. Deployment process
   1. before deploying make sure that all changes are committed and pushed to origin/master branch
   2. make sure pm2 version 4.5.1 is locally installed
   3. ```bash
            # (Optional) if you are deploying app for the first time run following command  
            # deploy setup command for production server      
            $ pm2 deploy ecosystem.config.js production setup
            
            # deploy setup command for staging server      
            $ pm2 deploy ecosystem.config.js staging setup
            
            # deployment command for production server
            $ pm2 deploy ecosystem.config.js production
            
            # deployment command for staging server
            $ pm2 deploy ecosystem.config.js staging
      ```
   4. (Optional) if it's first deployment or env variables were updated make sure providing env variables on the remote server too
      1. Connect to remote server by ssh connection
      2. go to project root directory and create .env file if it's not exist
      3. provide all required env variables(as reference look at .env.example file which is also located at project root directory)

## How to setup auto backup of database
1. Prepare backup.sh file by filling in required env variables like db_name, db_user etc.
   You can find backup.example.sh file at the project root folder
2. Add new cron job. For example:
   ```bash
           # adding new crontab
           $ crontab -e

           # than edit file to introduce tasks to be run by cron.
           # For instance: 0 3 * * * bash /var/postgres/backup.sh
   ```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).