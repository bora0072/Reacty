
# Reacty

Done as part of CSCI 5117, Fall 2017
[assignment description](https://docs.google.com/document/d/13q79EywC9TzWts9K-10b_tKA-ZVyv9_avWGJpgprA6A)

## App Info:

* Team Name: WonderDevils
* App Name: Reacty
* App Link: <https://ancient-garden-89428.herokuapp.com/>

### Students

* Rahul Bora, bora0072@umn.edu
* Kiran Ravindra ,ravin047@umn.edu
* Nidhi Patel, patel643@umn.edu
* Yinqiao Zheng, zheng928@umn.edu


## Key Features

* Keyword extraction
* Search auto-completition
* Drag and drop
* Authentication


## Screenshots of Site

Show archive notes.
![](https://github.com/umn-5117-f17/module-3-group-assignment-wonderdevils/blob/master/web/public/archive.png)

Present current notes.
![](https://github.com/umn-5117-f17/module-3-group-assignment-wonderdevils/blob/master/web/public/current.png)

Present current notes.
![](https://github.com/umn-5117-f17/module-3-group-assignment-wonderdevils/blob/master/web/public/search.png)


## External Dependencies

* react-dnd: create drag and drop effect
* immutability-helper: update this.state
* react-autobind: autobind variables
* lodash: change styles

...
=======
# React Project Template

Features:

* based on <https://github.com/umn-5117-f17/express-project-template>
* based on <https://github.com/facebookincubator/create-react-app>
* includes bulma css
* includes <https://github.com/ReactTraining/react-router>
* mongodb

## setup and run in development

* install [heroku command line app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
* create account at [mlab](https://mlab.com/)
* create account at [auth0](https://auth0.com)
    * create a client
    * In the APIs section of the Auth0 dashboard, click Create API
      (pick any name, any identifier)
* edit file `web/.env` to configure react+auth0, and commit the changes
* create file `.env` in root of project to configure express, something like this:

```
DEBUG=app:*

PORT=3000
EXPRESS_PORT=3001

# these must match the values from web/.env
AUTH0_DOMAIN=TODO.auth0.com
AUTH0_API_ID=TODO

DB_URI=mongodb://5117:5117iscool@ec2-54-175-174-41.compute-1.amazonaws.com:80/5117-f17-individual-hw
```

* run:

```
    npm install
    npm run dev
```

## deploy to heroku

* run these commands (one-time setup, or whenever these values need to change):

```
    # add all of the config variables from .env, except DEBUG, PORT, and EXPRESS_PORT
    heroku config:set AUTH0_DOMAIN=(foo).auth0.com AUTH0_API_ID=(bar)
```

* add the callback to "allowed callback URLs" list in auth0 client settings: `https://(heroku-dns).herokuapp.com/callback`

* check the code in and `git push heroku master`
>>>>>>> cab1fdae3fc5103bc0e9e9b1cccd75c0b94cfb53
