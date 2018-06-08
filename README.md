# Teknack Reference Game
This repository is for reference while making your game
### To run the game:
```sh
$ git clone https://gitlab.com/vineeth22/teknack-reference-game.git
$ cd teknack-reference-game
$ npm install
$ node app.js
```
Then go to http://localhost:3000

Make sure you follow the following points while coding the backend of your game

This reference game follows the points given here

### Use npm 
Initialize your node project
```sh
$ npm init
```
Install modules using the following command

It will install the module and add it as a dependency of your project to the project's package.json as an entry in dependencies
```sh
$ npm install express --save
```

Install modules present in the package.json file
```sh
$ npm install
```
### Create a .gitignore file
Create a .gitignore file so that node_modules folder is not pushed to your git repository

You can use the .gitignore file present in this repository

### Sessions
##### (Very important)
Your game should take the username from the session cookies.

Refer app.js file

Copy the session code present in app.js file

The code takes the username if the session is not set and sets the session

After that, username should be accessed using req.sess.username variable or using socket.request.sess.username inside sockets

Do not change the value of req.sess.username anywhere in your code

The code is required to integrate the game on the teknack servers

Use http://localhost:3000/unsetSession to unset session and reset username

The code requires express, client-sessions and body-parser module, so install it using npm
